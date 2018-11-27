<template>
  <div class="step-page">
    <div class="bg">
      <div class="step-info">
        <open-data type="userAvatarUrl" class="avatar"></open-data>
        <div class="step-num">{{ todayStep }}</div>
      </div>
    </div>
    <div :class="['news',{'more': more}]" @touchmove="_touchmove" @touchstart="_touchstart" @touchend="_touchend">
      <div class="news-title">
        <span>最新动态</span>
        <div class="news-more" @click="more=!more"><div :class="['iconfont','icon-sanjiao', {'sanjiao-more': more}]"/>{{ more ? '折叠' : '展开' }}</div>
      </div>
      <div class="content">
        <div class="day-info" v-for="(dayInfo,dayInfoIndex) in dayInfos" :key="dayInfoIndex">
          <div class="day-info-title">{{ dayInfo.title }}</div>
          <div class="day-info-item" v-for="(item, itemIndex) in dayInfo.items" :key="itemIndex">
            <div class="item-title">{{ item.name }}</div>
            <div class="item-step">{{ item.step }}步</div>
            <div class="item-time">{{ item.time }}</div>
            <div class="item-steal"></div>
          </div>
        </div>
      </div>
      <tab-bar :activeIndex="2" :fix="false"/>
    </div>
    <!--<image class="bg-img"-->
           <!--mode="widthFix"-->
           <!--src="https://profile-1257124244.cos.ap-chengdu.myqcloud.com/micoapp/bg%403x.png"-->
           <!--@load="bgImgLoad" @error="bgImgError"/>-->

<!--    <div class="news">
      <div class="news-title">最新动态</div>
      <div class="content">
        <div class="day-info" v-for="(dayInfo,dayInfoIndex) in dayInfos" :key="dayInfoIndex">
          <div class="day-info-title">{{ dayInfo.title }}</div>
          <div class="day-info-item" v-for="(item, itemIndex) in dayInfo.items" :key="itemIndex">
            <div class="item-title">{{ item.name }}</div>
            <div class="item-step">{{ item.step }}步</div>
            <div class="item-time">{{ item.time }}</div>
            <div class="item-steal"></div>
          </div>
        </div>
      </div>
    </div>-->
    <div :class="['bubble-wrap', 'bubble-wrap-' + bubbleIndex, {'active': bubble}]"
         v-for="(bubble,bubbleIndex) in bubbles"
         v-if="!bubble"
         :key="bubbleIndex">
      <button class="bubble-btn" open-type="getUserInfo" @getuserinfo="getuserinfo($event, bubbleIndex)"></button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import runBtn from '@/components/run-btn'
import tabBar from '@/components/tab-bar'
import * as utils from '@/utils'
export default {
  components: {
    runBtn,
    tabBar
  },
  data () {
    return {
      dayInfos: [
        {
          title: '今天',
          items: [
            {
              type: 0,
              name: '走在冷风中',
              step: 2531,
              time: '13:00'
            },
            {
              type: 0,
              name: '走在冷风中',
              step: 2531,
              time: '13:00'
            },
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
      more: false,
      startY: 0,
      startTime: 0,
      nowY: 0,
      nowTime: 0,
      lastY: 0
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
    _touchstart (e) {
      this.startY = e.mp.touches[0].pageY
      this.startTime = Date.now()
    },
    _touchmove (e) {
      this.lastY = this.nowY
      this.nowY = e.mp.touches[0].pageY
      this.nowTime = Date.now()
    },
    _touchend () {
      let distance = this.nowY - this.startY
      let time = (this.nowTime - this.startTime) / 1000
      let speed = distance / time
      if (speed < -100 && !this.more) {
        this.more = true
      }
      if (speed > 100 && this.more) {
        this.more = false
      }
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
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#2056dd',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    // showLoading()
    // canvas 动画
    // const context = wx.createCanvasContext('first') // 还记得 在wxml里面canvas的id叫first吗
    // wxCanvas = new WxDraw(context, 0, 0, 400, 500) // 初始化wxDraw对象 注意这里除了context的四个参数 就是canvas的位置以及长宽，😏还记得吗？
    // console.log('wxCanvas', wxCanvas)
    // const rect = new Shape('rect', { x: 60, y: 60, w: 40, h: 40, fillStyle: '#2FB8AC', rotate: Math.PI / 2 }, 'mix', true)
    // wxCanvas.add(rect)
    // rect.animate({'x': '+=100', 'y': '+=100'}, {duration: 1000}).animate('rotate', Math.PI * 5, {duration: 1000}).start(1)
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
  },
  onShow () {
    wx.hideTabBar()
  },
  onHide () {
    wx.showTabBar()
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
    .bg{
      bg-size(750rpx, 1197rpx)
      bg-image('step-bg', 'jpg')
      background-position 0rpx -200rpx
      background-repeat no-repeat
    }
    .bg-img{
      // scale = 1931/1125
      width 750rpx
    }
    .step-info{
      position absolute
      top 0
      right 20rpx
      background rgba(255,255,255,0.95)
      display flex
      align-items center
      border-radius 45rpx
      box-sizing border-box
      height 75rpx
      padding-left 5rpx
      padding-right 15rpx
      .avatar{
        flex 0 0 auto
        width 70rpx
        height 70rpx
        border-radius 50%
        overflow hidden
        margin-right 13rpx
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
      &.more{
        top 0
        opacity .95
      }
      transition all .5s
      position fixed
      z-index 2
      width 750rpx
      height 100%
      display flex
      flex-direction column
      border-top-left-radius 30rpx
      border-top-right-radius 30rpx
      overflow hidden
      top 75%
      opacity 1
      left 0
      .news-title{
        flex 0 0 auto
        background rgba(255,255,255,1)
        height 100rpx
        display flex
        justify-content space-between
        align-items center
        color #000
        font-size 32rpx
        font-weight bold
        padding 0 30rpx
        letter-spacing 1.5rpx
        .news-more{
          background main-color
          font-size 28rpx
          padding 10rpx 15rpx
          border-radius 30rpx
          color #fff
          center()
          .iconfont{
            transform rotate(180deg)
            transition all .5s
            &.sanjiao-more{
              transform rotate(0deg)
            }
          }
        }
      }
      .content{
        flex 1
        background rgba(245,245,245,1)
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
            margin-bottom 20rpx
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
      .bubble-btn{
        width 100%
        height 100%
        opacity 0
      }
      position absolute
      z-index 1
      border-radius 50%
      overflow hidden
      bg-size(100rpx, 100rpx)
      bg-image('bul')
      animation up-down-animation .5s ease-in 0s infinite alternate
      &.active{
      }
      &.bubble-wrap-0{
        top 500rpx
        left 50rpx
        animation-delay 0s
      }
      &.bubble-wrap-1{
        top 200rpx
        left 500rpx
        animation-delay .5s
      }
      &.bubble-wrap-2{
        top 300rpx
        left 640rpx
        animation-delay .7s
      }
      &.bubble-wrap-3{
        top 20rpx
        left 380rpx
        animation-delay .8s
      }
      &.bubble-wrap-4{
        top 430rpx
        left 570rpx
        animation-delay .6s
      }
      &.bubble-wrap-5{
        top 500rpx
        left 390rpx
        animation-delay .9s
      }
    }
  }
</style>
