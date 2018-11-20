<template>
  <div class="index-page">
    <div class="top-bg">
      <div class="coin-center">
        <span class="coin-hint">我的数学币</span>
        <span class="coin-num">{{ netError ? '--' : mathCoin }}</span>
        <span class="step-hint">可兑换步数{{ netError ? '--' : todayStep }}</span>
      </div>
      <div class="coin-charge-btn" @click="_coinChargeClick"  v-if="!netError">一键兑换数学币</div>
      <div class="check-day">连续签到{{signDayCount}}天</div>
      <div class="check-in-btn up-down-animation" @click="_sign"  v-if="!netError">
        <div class="icon"></div>
        <span class="text">签到</span>
      </div>
      <div class="rule">活动规则></div>
      <div class="share-btn up-down-animation"  v-if="!netError">
        <div class="icon"></div>
        <span class="text">分享即领数学币</span>
      </div>
    </div>
    <div class="werun" v-if="werun === false">
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
        <div class="icon"></div>
        <div class="title" @click="_toStealCoin">偷步数赚数学币<div class="arrow"></div></div>
      </div>
      <scroll-view class="rank-scroll-view" scroll-x>
        <div class="scroll-view-item-wrap">
          <div class="scroll-view-item" v-for="(item,itemIndex) in rankList" :key="itemIndex">
            <div class="index">{{(itemIndex + 1) >= 10 ? (itemIndex + 1) : '0' + (itemIndex + 1)}}</div>
            <div class="avatar">
              <div :class="['crown', 'crown-'+itemIndex]" v-if="itemIndex<=2"></div>
              <!--<image class="circle" :src="item.avatar"/>-->
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
      <div class="ad-wrap">
        <!--<div class="ad" :style="{backgroundImage: 'url(' + advs[0].picUrl +')'}" v-if="advs[0]"></div>-->
        <image class="ad-img" :src="advs[0].picUrl" v-if="advs[0]"/>
      </div>
    </div>
    <auth-pop :show.sync="authPopShow"/>
    <pic-pop/>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import runBtn from '@/components/run-btn'
import runGift from '@/components/run-gift'
import authPop from '@/components/auth-pop'
import picPop from '@/components/pic-pop'
import * as api from '@/http/api'
import * as utils from '@/utils'
export default {
  components: {
    runBtn,
    authPop,
    runGift,
    picPop
    // accreditPop
  },
  data () {
    return {
      authPopShow: false,
      show: false,
      netError: true,
      rankList: [],
      giftList: []
    }
  },
  computed: {
    ...mapState(['werun', 'isLogin', 'openId', 'todayStep', 'signDayCount', 'mathCoin', 'advs'])
  },
  watch: {
    werun (newV, oldV) {
      if (oldV === false && newV) { // 授权必须是被拒绝，然后现在同意了才能进入这儿
        console.log('微信运动授权之前被拒绝了，现在又同意了')
        this._loginStuff() // 因为用户可能在页面长时间停留后再同意授权，此时session可能失效，故调用_loginStuff()而非只调用_getStep()
      }
    }
  },
  methods: {
    ...mapActions(['SET_SYSTEM_INFO', 'LOGIN', 'AUTH_OF_WERUN', 'REPORT_OF_WERUN', 'FETCH_USER_INFO', 'FETCH_ADVS']),
    _load () {
      this.netError = true
      utils.showLoading()
      api.all([this._getRank(), this._getGifts(), this.FETCH_ADVS(), this._loginStuff()])
        .then(api.spread((ranks, gifts, advs) => {
          this.netError = false
          wx.hideLoading()
          wx.stopPullDownRefresh()
          console.log('ranks、gifts、advs', ranks, gifts, advs)
        }))
        .catch((e) => {
          console.log('错误原因', e)
          this.netError = true
          wx.hideLoading()
          wx.stopPullDownRefresh()
          utils.showError()
        })
    },
    _toStealCoin () {
      wx.switchTab({
        url: '/pages/step/main'
      })
    },
    async _sign () {
      try {
        const result = await api.sign({
          openId: this.openId,
          signTime: utils.formatTime(new Date())
        })
        console.log('签到结果天数+兑换得到的数学币', result)
        this.FETCH_USER_INFO()
      } catch (e) {
        utils.showError(e.message)
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
    async _loginStuff () { // 登录相关
      await this.LOGIN()
      // await this._getSteps()
    },
    async _getSteps () {
      await this.AUTH_OF_WERUN() // 申请授权
      await this.REPORT_OF_WERUN() // 上报微信运动数据给后台，返回是否成功的标志
      await this.FETCH_USER_INFO() // 获取用户信息
      console.log('getSteps成功')
    },
    _coinChargeClick () { // 一键兑换数学币
      if (!this.werun) {
        this.authPopShow = true
      }
      // todo
    }
  },
  async onLoad () {
    console.log('onLoad页面')
    this._load()
  },
  async onPullDownRefresh () { // 下拉刷新
    console.log('下拉刷新')
    this._load()
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
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
      height 454rpx
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
        bg-image('index_buttn_big')
        bg-size(250rpx,75rpx)
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
      .ad-wrap{
        padding-bottom 46rpx
        .ad{
          bg-size(684rpx, 257rpx)
        }
        .ad-img{
          width 684rpx
          height 260rpx
        }
      }
    }
  }
</style>
