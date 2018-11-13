<template>
  <div class="index-page">
    <div class="top-bg">
      <div class="coin-center">
        <span class="coin-hint">我的数学币</span>
        <span class="coin-num">{{ coinNum }}</span>
        <span class="step-hint">可兑换步数{{ stepNum }}</span>
      </div>
      <div class="coin-charge-btn" @click="_coinChargeClick">一键兑换数学币</div>
      <div class="check-day">连续签到{{checkDays}}天</div>
      <div class="check-in-btn up-down-animation" @click="_sign">
        <div class="icon"></div>
        <span class="text">签到</span>
      </div>
      <div class="rule">活动规则></div>
      <div class="share-btn up-down-animation">
        <div class="icon"></div>
        <span class="text">分享即领数学币</span>
      </div>
    </div>
    <div class="werun" v-if="!werun">
      <div class="title">
        <div class="alarm">!</div>
        打开微信运动，步数换数学币
      </div>
      <div class="run-btn-wrap scale-animation">
        <run-btn openType="openSetting" title="去打开"/>
      </div>
    </div>
    <div class="rank">
      <div class="rank-head">
        <div class="icon"></div>
        <div class="title">偷步数赚数学币<div class="arrow"></div></div>
      </div>
      <scroll-view class="rank-scroll-view" scroll-x>
        <div class="scroll-view-item-wrap">
          <div class="scroll-view-item" v-for="(item,itemIndex) in rankList" :key="itemIndex">
            <div class="index">{{(itemIndex + 1) >= 10 ? (itemIndex + 1) : '0' + (itemIndex + 1)}}</div>
            <div class="avatar">
              <div :class="['crown', 'crown-'+itemIndex]" v-if="itemIndex<=2"></div>
              <!--<image class="circle" :src="item.avatar"/>-->
              <div class="circle" :style="{backgroundImage: 'url(' + item.avatar + ')'}"></div>
            </div>
            <div class="name">{{item.name}}</div>
            <div class="step-num">{{item.stepNum}}</div>
          </div>
        </div>
      </scroll-view>
    </div>
    <div class="exchange">
      <div class="title">礼品兑换</div>
      <div class="gift-item" v-for="(gift,giftIndex) in giftList" :key="giftIndex">
        <image class="left-img" :src="gift.img" />
        <div class="right">
          <div class="title">{{ gift.title }}</div>
          <div class="info">
            <div class="old-price">原价￥{{ gift.oldPrice }}</div>
            <div class="postage" v-if="gift.postage">包邮</div>
          </div>
          <div class="price">
            <span class="num">{{ gift.price }}</span>
            <span class="suffix">数学币</span>
          </div>
        </div>
      </div>
      <div class="ad-wrap">
        <div class="ad" :style="{backgroundImage: 'url(' + ad +')'}" v-if="ad.length">
        </div>
      </div>
    </div>
    <auth-pop :show.sync="authPopShow"/>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import auths from '@/utils/auths'
import { formatTime } from '@/utils'
import runBtn from '@/components/run-btn'
import authPop from '@/components/auth-pop'
import { sign } from '@/http/api'
export default {
  data () {
    return {
      authPopShow: false,
      userInfo: {},
      show: false,
      coinNum: 0,
      stepNum: 0,
      checkDays: 0,
      rankList: [],
      giftList: [],
      ad: 'https://profile-1257124244.cos.ap-chengdu.myqcloud.com/micoapp/index_banner%402x.png' // 广告地址
    }
  },
  computed: {
    ...mapState(['werun', 'isLogin', 'openId'])
  },
  components: {
    runBtn,
    authPop
    // accreditPop
  },
  created () {
    this.login()
    this.createFakeRankList()
    this.createFakeGiftList()
  },
  async onShow () {
    console.log('onShow页面')
    const isAuthOfWerun = await auths.werun()
    this.SET_WE_RUN(isAuthOfWerun)
    console.log('isLogin', this.isLogin)
    console.log('openId', this.openId)
  },
  async mounted () {
    console.log('mounted')
  },
  methods: {
    ...mapActions(['SET_SYSTEM_INFO', 'login']),
    ...mapMutations(['SET_WE_RUN']),
    _sign () { // 签到
      sign({
        openId: this.openId,
        signTime: formatTime(new Date())
      })
    },
    _coinChargeClick () { // 一键兑换数学币
      if (!this.werun) {
        this.authPopShow = true
      }
    },
    createFakeRankList () {
      let result = []
      for (let i = 1; i <= 10; i++) {
        result.push({
          avatar: `https://profile-1257124244.cos.ap-chengdu.myqcloud.com/micoapp/por_0${i % 3 + 1}%402x.png`,
          name: '跟着感觉走' + (i - 1) * 10,
          stepNum: parseInt(56000 / i)
        })
      }
      this.rankList = result
    },
    createFakeGiftList () {
      let result = []
      for (let i = 0; i < 4; i++) {
        result.push({
          img: `https://profile-1257124244.cos.ap-chengdu.myqcloud.com/micoapp/img_0${i % 4 + 1}%402x.png`,
          title: '极客数学帮专属定制笔记本， 超值优惠大放送',
          oldPrice: 5,
          postage: true,
          price: 99
        })
      }
      this.giftList = result
    },
    officialLoad (e) {
      console.log('e', e.mp.detail)
    },
    officialError (e) {
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    getuserinfo (e) {
      console.log(e.mp.detail)
    }
  },
  // created () {
  //   // wx.checkSession({ // 判断是否登录
  //   //   success () {
  //   //     console.log('已登录')
  //   //     // session_key 未过期，并且在本生命周期一直有效
  //   //   },
  //   //   fail () {
  //   //     console.log('未登录')
  //   //     // session_key 已经失效，需要重新执行登录流程
  //   //     wx.login() // 重新登录
  //   //   }
  //   // })
  // },
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
              font-size 24rpx
              color #666
              no-wrap()
            }
            .step-num{
              margin-top 5rpx
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
      margin 0 33rpx 0 33rpx
      .title{
        color #666
        font-size 26rpx
        margin-bottom 16rpx
      }
      .gift-item{
        height 257rpx
        margin-bottom 18rpx
        box-sizing border-box
        padding 24rpx
        display flex
        background #fff
        border-radius 5rpx
        .left-img{
          flex 0 0 auto
          width 207rpx
          height 207rpx
        }
        .right{
          flex 1 0 0
          margin-left 30rpx
          display flex
          flex-direction column
          justify-content space-between
          .title{

            font-size 30rpx
            color #333
            wrap(2)
          }
          .info{
            display flex
            align-items center
            .old-price{
              color #999
              font-size 26rpx
              text-decoration line-through
            }
            .postage{
              padding 5rpx 10rpx
              margin-left 22rpx
              background #ffedd4
              color #F69307
              font-size 24rpx
              border-radius 16rpx
            }
          }
          .price{
            .num{
              color #43D17F
              font-size 36rpx
            }
            .suffix{
              color #333
              font-size 26rpx
            }
          }
        }
      }
      .ad-wrap{
        padding-bottom 46rpx
        .ad{
          bg-size(684rpx, 257rpx)
        }
      }
    }
  }
</style>
