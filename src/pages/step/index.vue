<template>
  <div class="step-page">
    <canvas
      class="run-canvas"
      canvas-id="first"
      disable-scroll=true
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      @tap="tap"
      @longpress="longpress"
    ></canvas>
    <!--<image class="bg-img"-->
           <!--mode="widthFix"-->
           <!--src="https://profile-1257124244.cos.ap-chengdu.myqcloud.com/micoapp/bg%403x.png"-->
           <!--@load="bgImgLoad" @error="bgImgError"/>-->
    <!--<div class="step-info">-->
      <!--<open-data type="userAvatarUrl" class="avatar"></open-data>-->
      <!--<div class="step-num">{{ todayStep }}</div>-->
    <!--</div>-->
    <!--<div class="news">-->
      <!--<div class="news-title">最新动态</div>-->
      <!--<div class="content">-->
        <!--<div class="day-info" v-for="(dayInfo,dayInfoIndex) in dayInfos" :key="dayInfoIndex">-->
          <!--<div class="day-info-title">{{ dayInfo.title }}</div>-->
          <!--<div class="day-info-item" v-for="(item, itemIndex) in dayInfo.items" :key="itemIndex">-->
            <!--<div class="item-title">{{ item.name }}</div>-->
            <!--<div class="item-step">{{ item.step }}步</div>-->
            <!--<div class="item-time">{{ item.time }}</div>-->
            <!--<div class="item-steal"></div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div :class="['bubble-wrap', 'bubble-wrap-' + bubbleIndex, {'active': bubble}]"-->
         <!--v-for="(bubble,bubbleIndex) in bubbles"-->
         <!--v-if="!bubble"-->
         <!--:key="bubbleIndex">-->
      <!--<run-btn openType="getUserInfo" @getuserinfo="getuserinfo($event, bubbleIndex)"/>-->
    <!--</div>-->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import runBtn from '@/components/run-btn'
import * as utils from '@/utils'
// import {updateUserInfo, randomSteal, stealMeList} from '@/http/api'
const WxDraw = require('../../../static/wxdraw.min.js').wxDraw
const Shape = require('../../../static/wxdraw.min.js').Shape
let wxCanvas = null
export default {
  components: {
    runBtn
  },
  data () {
    return {
      // WxDraw: WxDraw,
      // Shape: Shape,
      dayInfos: [
        {
          title: '今天',
          items: [
            {
              type: 0,
              name: '走在冷风中',
              step: 2531,
              time: '13:00'
            }
          ]
        }
      ],
      bubbles: [
        false,
        false,
        false,
        false,
        false,
        false
      ],
      values: [],
      hasUpdateUserInfo: false,
      hasReachBottom: false,
      hasLastReachBottom: false,
      toShowTop: undefined,
      toHideTop: undefined,
      nowScrollTop: 0,
      lastScrollTop: 0,
      nowFromTopToDown: undefined,
      lastFromTopToDown: undefined,
      tabBarLoading: false,
      hasTabBarShow: false,
      topDownCount: 0
    }
  },
  computed: {
    ...mapState(['todayStep', 'authWerun'])
  },
  watch: {
    async reachBottom (newV, oldV) {
      if (this.tabBarLoading) {
        console.log('tabBarLoading冲突')
        return
      }
      this.tabBarLoading = true
      console.log('tabBarLoading开始')
      if (newV && !oldV) {
        console.log('显示tabbar')
        await utils.pf('showTabBar')
      } else if (!newV && oldV) {
        console.log('隐藏tabbar')
        await utils.pf('hideTabBar')
      }
      this.tabBarLoading = false
      console.log('tabBarLoading结束')
    }
  },
  methods: {
    touchstart (e) {
      wxCanvas.touchstartDetect(e)
    },
    touchmove (e) {
      wxCanvas.touchmoveDetect(e)
    },
    touchend () {
      wxCanvas.touchendDetect()
    },
    tap (e) {
      wxCanvas.tapDetect(e)
    },
    longpress (e) {
      wxCanvas.longpressDetect(e)
    },
    bgImgLoad (e) {
      // console.log(e)
      wx.hideLoading()
    },
    bgImgError (e) {
      // console.log(e)
      wx.hideLoading()
    },
    drawStar () {
    }
    // async getuserinfo (detail, index) {
    //   console.log(detail)
    //   if (!detail.userInfo) {
    //     return
    //   }
    //   if (!this.hasUpdateUserInfo) { // 上报用户信息
    //     try {
    //       await updateUserInfo({
    //         nickName: detail.userInfo.nickName,
    //         avatarUrl: detail.userInfo.avatarUrl,
    //         gender: detail.userInfo.gender
    //       })
    //       console.log('detail' + index, detail.userInfo)
    //       this.hasUpdateUserInfo = true
    //     } catch (e) {
    //       this.hasUpdateUserInfo = true
    //     }
    //   }
    //   this.bubbles[index] = true
    // }
  },
  async onLoad () {
    // wx.hideTabBar()
    // showLoading()
    // canvas 动画
    const context = wx.createCanvasContext('first') // 还记得 在wxml里面canvas的id叫first吗
    wxCanvas = new WxDraw(context, 0, 0, 400, 500) // 初始化wxDraw对象 注意这里除了context的四个参数 就是canvas的位置以及长宽，😏还记得吗？
    console.log('wxCanvas', wxCanvas)
    const rect = new Shape('rect', { x: 60, y: 60, w: 40, h: 40, fillStyle: '#2FB8AC', rotate: Math.PI / 2 }, 'mix', true)
    wxCanvas.add(rect)
    rect.animate({'x': '+=100', 'y': '+=100'}, {duration: 1000}).animate('rotate', Math.PI * 5, {duration: 1000}).start(1)
    // 请求
    // this.hasUpdateUserInfo = false
    // try {
    //   const result = await randomSteal()
    //   this.values = result.data
    //   console.log(result)
    //   if (this.authWerun) {
    //     const stealMeResult = await stealMeList()
    //     console.log('stealMeResult', stealMeResult)
    //   }
    // } catch (e) {
    //   console.log(e)
    // }
  }
  // onReachBottom () {
  //   this.hasLastReachBottom = false
  //   this.hasReachBottom = true
  //   this.topDownCount += 1
  //   console.log(`onReachBottom：hasLastReachBottom=${this.hasLastReachBottom},hasReachBottom=${this.hasReachBottom}`)
  // },
  // async onPageScroll (e) {
  //   this.lastScrollTop = this.nowScrollTop
  //   this.nowScrollTop = e.scrollTop
  //   let gap = this.nowScrollTop - this.lastScrollTop
  //   this.lastFromTopToDown = this.nowFromTopToDown
  //   this.nowFromTopToDown = gap > 0 // 大于0表示自上而下 小于0表示自下而上
  //
  //   console.log('toShowTop', this.toShowTop)
  //   console.log('toHideTop', this.toHideTop)
  //   if (!this.hasLastReachBottom && this.hasReachBottom && !this.tabBarLoading && !this.hasTabBarShow) { // 自上而下越过阈值 hide->show
  //     // 显示tabbar
  //     console.log('显示tabBar')
  //     this.tabBarLoading = true
  //     await utils.pf('showTabBar')
  //     this.tabBarLoading = false
  //     this.hasTabBarShow = true
  //   }
  //   if (this.lastScrollTop > yz && this.nowScrollTop <= yz) { // 自下而上越过阈值 show->hide
  //     // 隐藏tabbar
  //   }
  //
  //   // if (!this.hasReachBottom) {
  //   //   this.reachBottom = false
  //   //   console.log('[false]还没有到底部', e.scrollTop)
  //   // } else {
  //   //   if (this.toTopWhenReachBottom === undefined) {
  //   //     this.toTopWhenReachBottom = e.scrollTop
  //   //     this.reachBottom = true
  //   //     console.log('[undefined]到底部了', this.toTopWhenReachBottom)
  //   //   } else {
  //   //     if (e.scrollTop >= this.toTopWhenReachBottom) {
  //   //       this.reachBottom = true
  //   //       console.log('到底部了', e.scrollTop)
  //   //     } else {
  //   //       this.reachBottom = false
  //   //       console.log('[true]还没有到底部', e.scrollTop)
  //   //     }
  //   //   }
  //   // }
  // }
}
</script>

<style scoped lang="stylus">
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .step-page{
    position: relative
    height 100%
    .run-canvas{
      width 750rpx
      height 100%
    }
    .bg-img{
      // scale = 1931/1125
      width 750rpx
    }
    .step-info{
      position absolute
      top 60rpx
      left 30rpx
      background rgba(255,255,255,0.5)
      display flex
      align-items center
      width 237rpx
      height 93rpx
      border-radius 45rpx
      box-sizing border-box
      padding 0 5rpx
      .avatar{
        width 77rpx
        height 77rpx
        border-radius 50%
        overflow hidden
        margin-right 10rpx
      }
      .step-num{
        flex 1
        font-size 42rpx
        color main-color
        font-weight bold
        transform scale(1,1.2)
      }
    }
    .news{
      position absolute
      width 750rpx
      border-top-left-radius 30rpx
      border-top-right-radius 30rpx
      overflow hidden
      top 75%
      left 0
      .news-title{
        background #fff
        height 100rpx
        display flex
        align-items center
        color #000
        font-size 32rpx
        font-weight bold
        padding 0 30rpx
        letter-spacing 1.5rpx
      }
      .content{
        background #F5F5F5
        min-height 600rpx
        padding 30rpx
        .day-info{
          .day-info-title{
            color #999
            font-size 28rpx
            padding-bottom 15rpx
          }
          .day-info-item{
            position relative
            height 80rpx
            background #fff
            display flex
            justify-content space-between
            align-items center
            padding 0 45rpx 0 12rpx
            .item-title{
              color #000
              font-weight bold
              font-size 28rpx
            }
            .item-step{
              color main-color
              font-size 30rpx
            }
            .item-time{
              color #999999
              font-size 26rpx
            }
            .item-steal{
              bg-image('hand-up-copy')
              bg-size(45rpx, 45rpx)
              position absolute
              top 0
              right 0
            }
          }
        }
      }
    }
    .bubble-wrap{
      position absolute
      border-radius 50%
      overflow hidden
      bg-size(100rpx, 100rpx)
      bg-image('bul')
      animation up-down-animation .5s ease-in 0s infinite alternate
      &.active{
      }
      &.bubble-wrap-0{
        top 200rpx
        left 50rpx
        animation-delay 0s
      }
      &.bubble-wrap-1{
        top 200rpx
        left 537rpx
        animation-delay .5s
      }
      &.bubble-wrap-2{
        top 300rpx
        left 378rpx
        animation-delay .7s
      }
      &.bubble-wrap-3{
        top 50rpx
        left 400rpx
        animation-delay .8s
      }
      &.bubble-wrap-4{
        top 400rpx
        left 500rpx
        animation-delay .6s
      }
      &.bubble-wrap-5{
        top 500rpx
        left 350rpx
        animation-delay .9s
      }
    }
  }
</style>
