<template>
  <div class="index-page">
    <div class="top-bg">
      <div class="coin-center">
        <span class="coin-hint">我的数学币</span>
        <span class="coin-num">{{ netError ? '--' : mathCoin }}</span>
        <span class="step-hint">可兑换步数{{ netError ? '--' : todayCanChangeStep }}</span>
      </div>
      <div class="coin-charge-btn" @click="_coinChargeClick"  v-if="!netError">一键兑换数学币</div>
      <div class="check-day">连续签到{{netError ? '--' : signDayCount}}天</div>
      <div class="check-in-btn up-down-animation" @click="_sign"  v-if="!netError">
        <div class="icon"></div>
        <span class="text">签到</span>
      </div>
      <navigator class="rule" url="/pages/rule/main">活动规则></navigator>
      <div class="share-btn up-down-animation"  v-if="!netError">
        <div class="icon"></div>
        <span class="text">分享好友</span>
        <div class="btn-wrap">
          <run-btn openType="share"/>
        </div>
      </div>
    </div>
    <div class="werun" v-if="authWerun === false">
      <div class="title">
        <div class="alarm">!</div>
        打开微信运动，步数换数学币
      </div>
      <div class="run-btn-wrap scale-animation">
        <run-btn openType="openSetting" title="去打开"/>
      </div>
    </div>
    <div class="rank" v-if="!netError && rankList.length">
      <div class="rank-head">
        <navigator class="icon" url="/pages/download/main"></navigator>
        <div class="title" @click="_toStealCoinPage">偷步数赚数学币<div class="arrow"></div></div>
      </div>
      <scroll-view class="rank-scroll-view" scroll-x>
        <div class="scroll-view-item-wrap">
          <div class="scroll-view-item" v-for="(item,itemIndex) in rankList" :key="itemIndex">
            <div class="index">{{(itemIndex + 1) >= 10 ? (itemIndex + 1) : '0' + (itemIndex + 1)}}</div>
            <div class="avatar">
              <div :class="['crown', 'crown-'+itemIndex]" v-if="itemIndex<=2"></div>
              <div class="circle" :style="{backgroundImage: 'url(' + item.avatarUrl + ')'}"></div>
            </div>
            <div class="name">{{item.nickName}}</div>
            <div class="step-num">{{item.todayStep}}</div>
          </div>
        </div>
      </scroll-view>
    </div>
    <div class="exchange" v-if="!netError && giftList.length">
      <div class="title">礼品兑换</div>
      <run-gift v-for="gift in giftList" :key="gift.id" :gift="gift"/>
      <adv type="index"/>
    </div>
    <auth-pop :show.sync="authPopShow"/>
    <pic-pop :show.sync="signPopShow" :type="2" url="/static/img/sign.png" :coin="signCoin"/>
    <adv type="modal" :show.sync="modalShow"/>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import {mixinLoginWerun} from '@/mixin'
import adv from '@/components/adv'
import runBtn from '@/components/run-btn'
import runGift from '@/components/run-gift'
import authPop from '@/components/auth-pop'
import picPop from '@/components/pic-pop'
import * as api from '@/http/api'
import * as utils from '@/utils'
export default {
  mixins: [mixinLoginWerun],
  components: {
    runBtn,
    authPop,
    runGift,
    picPop,
    // tabBar,
    adv
    // accreditPop
  },
  data () {
    return {
      authPopShow: false,
      signPopShow: false,
      signCoin: 0, // 签到成功后获得的奖励币数
      netError: true,
      rankList: [],
      giftList: [],
      modalShow: false
    }
  },
  computed: {
    ...mapState(['signDayCount', 'mathCoin', 'advs', 'openId'])
  },
  watch: {
    authWerun (newV, oldV) {
      if (oldV === false && newV) { // 授权必须是被拒绝，然后现在同意了才能进入这儿
        // console.log('前拒后同意')
        this._getSteps() // 因为用户可能在页面长时间停留后再同意授权，此时session可能失效，故调用_loginStuff()而非只调用_getStep()
      }
    }
  },
  methods: {
    ...mapActions(['FETCH_ADVS', 'SET_SYSTEM_INFO', 'FETCH_RULE']),
    _load () {
      this.FETCH_RULE()
      this.netError = true
      utils.showLoading()
      this.SET_SYSTEM_INFO()
      api.all([this._getRank(), this._getGifts(), this.FETCH_ADVS(), this._getSteps()])
        .then(api.spread((ranks, gifts, advs) => {
          this.netError = false
          wx.hideLoading()
          wx.stopPullDownRefresh()
          // console.log('ranks、gifts、advs', ranks, gifts, advs)
        }))
        .catch((e) => {
          // console.log('错误原因', e)
          this.netError = true
          wx.hideLoading()
          wx.stopPullDownRefresh()
          utils.showError()
        })
    },
    _toStealCoinPage () {
      wx.switchTab({
        url: '/pages/step/main'
      })
    },
    async _sign () {
      utils.showLoading()
      try {
        const result = await api.sign({
          signTime: this.$utils.harrisonDate.getDate(new Date()).fullFormatDate
        })
        wx.hideLoading()
        this.signCoin = result.data.getMathCoin
        this.signPopShow = true
        // console.log('签到结果天数+兑换得到的数学币', result)
        this.FETCH_USER_INFO()
      } catch (e) {
        wx.hideLoading()
        utils.showError(e.message, 1000)
      }
    },
    async _getRank () { // 获取排行榜
      const rankResult = await api.getRank()
      this.rankList = rankResult.data
      return this.rankList
    },
    async _getGifts () { // 获取首页礼物
      const result = await api.getIndexPresent()
      this.giftList = result.data
      return this.giftList
    },
    async _coinChargeClick () { // 一键兑换数学币
      if (!this.authWerun) {
        this.authPopShow = true
        return
      }
      utils.showLoading()
      try {
        await api.changeStep()
        await this.FETCH_USER_INFO()
        wx.hideLoading()
      } catch (e) {
        wx.hideLoading()
        this.utils.pf('showModal', {
          title: '提示',
          showCancel: false,
          content: e.message
        })
        // utils.showError(e.message, 1500)
      }
    }
  },
  async onLoad (option) {
    // console.log('onLoad页面', option)
    // wx.showShareMenu({
    //   // 是否使用带 shareTicket 的转发
    //   withShareTicket: true
    // })
    // 上报分享
    if (option.openId) {
      // console.log('分享', option.openId)
      api.share({
        id: option.openId
      })
    }
    this._load()
    // if (option.scene) {
    //   console.log('has scene')
    //   let scene = decodeURIComponent(option.scene)
    //   console.log('scene is ', scene)
    //   this.scene = scene
    //   // let arrPara = scene.split('&')
    //   // let arr = []
    //   // for (let i in arrPara) {
    //   //   arr = arrPara[i].split('=')
    //   //   wx.setStorageSync(arr[0], arr[1])
    //   //   console.log('setStorageSync:', arr[0], '=', arr[1])
    //   // }
    // } else {
    //   console.log('no scene')
    //   this.scene = 'no scene'
    // }
    // const result = wx.getLaunchOptionsSync()
    // console.log('xx', result)
  },
  mounted () {
    this.modalShow = true
  },
  async onPullDownRefresh () { // 下拉刷新
    // console.log('下拉刷新')
    this._load()
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: '极客数学帮',
      path: `pages/index/main?openId=${this.openId}`
    }
  }
}
</script>
<!--
广告位建议： 340px * 120px
-->
<style scoped lang="stylus">
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .index-page{
    .top-bg{
      position relative
      height 480rpx
      bg-image('index_bg_all')
      background-color #fff
      background-size 323rpx 290rpx
      background-repeat no-repeat
      background-position 93% 0%
      display flex
      flex-direction column
      justify-content center
      align-items center
      .coin-center{
        bg-size(308rpx,319rpx)
        bg-image('index_bg_img')
        display flex
        flex-direction column
        justify-content center
        align-items center
        .coin-hint{
          color  #0A8153
          font-size 34rpx
          font-weight bolder
          letter-spacing 1rpx
        }
        .coin-num{
          font-size 72rpx
          color #0A8153
          font-weight bold
          padding 12rpx 0
          transform scale(1,1.3)
        }
        .step-hint{
          color #0E8857
          font-size 26rpx
        }
      }
      .coin-charge-btn{
        bg-image('exchange-button')
        bg-size(251rpx,69rpx)
        center()
        margin-top 24rpx
        color #fff
        font-size 30rpx
        font-weight bold
      }
      .check-day{
        font-size 30rpx
        color #fff
        position absolute
        left 0
        top 53rpx
        background main-color
        padding 11rpx 26rpx 11rpx 11rpx
        border-top-right-radius 50rpx
        border-bottom-right-radius 50rpx
      }
      .check-in-btn{
        position absolute
        left 63rpx
        top 158rpx
        display flex
        flex-direction column
        align-items center
        .icon{
          bg-size(110rpx,90rpx)
          bg-image('sign_up')
        }
        .text{
          padding-top 11rpx
          color #333
          font-size 26rpx
        }
      }
      .share-btn{
        position absolute
        right 41rpx
        top 213rpx
        display flex
        flex-direction column
        align-items center
        .btn-wrap{
          position absolute
          top 0
          left 0
          width 100%
          height 100%
        }
        .icon{
          bg-size(73rpx,70rpx)
          bg-image('index_coin')
        }
        .text{
          padding-top 11rpx
          color #333
          font-size 26rpx
        }
      }
      .rule{
        position absolute
        top 56rpx
        right 31rpx
        font-size 26rpx
        color main-color
      }
    }
    .werun{
      display flex
      align-items center
      justify-content space-between
      padding 15rpx
      margin-bottom 50rpx
      background: #44A08D;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #093637, #44A08D);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #093637, #44A08D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      .title{
        display flex
        align-items center
        font-size 27rpx
        color #fff
        .alarm{
          width 35rpx
          height 35rpx
          margin-right 10rpx
          font-size 28rpx
          center()
          color #fff
          border-radius 50%
          background #FFB75E;
        }
      }
      .run-btn-wrap{
        color #fff
        background main-color
        width 150rpx
        height 70rpx
        border-radius 10rpx
        center()
        font-size 28rpx
        letter-spacing 1rpx
      }
    }
    .rank{
      margin 28rpx 0 28rpx 33rpx
      .rank-head{
        display flex
        justify-content space-between
        margin-bottom 12rpx
        .icon{
          bg-image('index_rank')
          bg-size(88rpx,28rpx)
        }
        .title{
          font-size 26rpx
          color #666
          display flex
          align-items center
          .arrow{
            bg-image('jiantou')
            bg-size(11rpx,21rpx)
            margin 0 36rpx 0 11rpx
          }
        }
      }
      .rank-scroll-view{
        width 100%
        .scroll-view-item-wrap{
          display flex
          .scroll-view-item{
            flex 0 0 auto
            width 179rpx
            height 193rpx
            background #fff
            margin-right 20rpx
            border-radius 8rpx
            display flex
            flex-direction column
            align-items center
            position relative
            .index{
              position absolute
              top 12rpx
              left 12rpx
              font-size 24rpx
              color #999
            }
            .avatar{
              margin-top 23rpx
              position relative
              .circle{
                bg-size(80rpx,80rpx)
                border-radius 50%
              }
              .crown{
                position absolute
                top -20rpx
                right -6rpx
                bg-size(36rpx,36rpx)
                &.crown-0{
                  bg-image('index_first')
                }
                &.crown-1{
                  bg-image('index_sec')
                }
                &.crown-2{
                  bg-image('index_th')
                }
              }
            }
            .name{
              margin-top 7rpx
              width 140rpx
              font-size 22rpx
              color #666
              text-align center
              no-wrap()
            }
            .step-num{
              margin-top 8rpx
              background #ECFFF4
              width 101rpx
              height 32rpx
              color main-color
              border 1rpx solid main-color
              border-radius 14rpx
              center()
              font-size 24rpx
            }
          }
        }
      }
    }
    .exchange{
      padding 0 33rpx
      .title{
        color #666
        font-size 26rpx
        margin-bottom 16rpx
      }
    }
  }
</style>
