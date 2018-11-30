<template>
  <div class="step-page">
    <div class="bg">
      <div class="step-info">
        <open-data type="userAvatarUrl" class="avatar"></open-data>
        <div class="step-num">{{ todayStep }}</div>
      </div>
    </div>
    <div :class="['news',{'more': more}]" @touchmove="_touchmove" @touchstart="_touchstart" @touchend="_touchend">
      <div class="news-title"  @click="more=!more">
        <span>最新动态</span>
        <div class="news-more"><div :class="['iconfont','icon-sanjiao', {'sanjiao-more': more}]"/></div>
      </div>
      <div class="avatar-wall">
        <div class="avatar" v-for="(item, avatarIndex) in avatars" :key="avatarIndex">
          <image class="avatar-img" :src="item.avatarUrl"/>
          <div class="steal-num">{{ item.stealStepNum }}</div>
        </div>
      </div>
      <scroll-view  class="content" scroll-y>
        <div class="wrap">
          <div class="steal-me-item" v-for="(item, stealMeIndex) in stealMeFormatList" :key="stealMeIndex">
            <div class="date-label" v-if="item.dateLabel">{{item.dateLabel}}</div>
              <div class="steal-me-item-inner">
              <div class="item-title">{{ item.nickName }} <span class="item-title-suffix">偷走你 </span><span class="item-step">{{ item.stealStepNum }}步</span></div>
              <div class="item-time">{{ item.time }}</div>
              <div class="item-steal" v-if="item.canBeSteal"></div>
            </div>
          </div>
        </div>
      </scroll-view>
      <!--<tab-bar :activeIndex="2" :fix="false"/>-->
    </div>
    <div class="bubble-container" v-for="(bubble,bubbleIndex) in bubbleClicks" :key="bubbleIndex">
      <div :class="['bubble-wrap', 'bubble-wrap-' + bubbleIndex,{'up-down-animation': !bubble.hasClick},{'scale-disappear-animation': bubble.hasClick}]"
           @click="_bubbleClick($event,bubbleIndex)">
      </div>
      <div :class="['plus-step', 'plus-step-' + bubbleIndex, {'move-disappear-animation': bubble.hasClick}]">
        +{{ bubble.stolenStepNum }}
      </div>
    </div>
    <accredit-pop :show.sync="userinfoPopShow" @getuserinfo="_getuserinfo" @cancel="_cancel"/>
    <auth-pop :show.sync="werunPopShow"/>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import {mixinLoginWerun} from '@/mixin'
import tabBar from '@/components/tab-bar'
import accreditPop from '@/components/accredit-pop'
import authPop from '@/components/auth-pop'
import * as utils from '@/utils'
import * as api from '@/http/api'
export default {
  mixins: [mixinLoginWerun],
  components: {
    tabBar,
    accreditPop,
    authPop
  },
  data () {
    return {
      stealMeList: [],
      dateTags: [-1, -1],
      bubbles: [],
      bubbleClicks: [],
      hasUpdateUserInfo: false,
      more: false,
      startY: 0,
      startTime: 0,
      nowY: 0,
      nowTime: 0,
      lastY: 0,
      userinfoPopShow: false,
      werunPopShow: false,
      hasMove: false, // 如果是在scrollview中滑动，父元素的touchmove是被拦截的
      userinfo: null
    }
  },
  computed: {
    ...mapState(['todayStep', 'authWerun', 'authUserInfo']),
    stealMeFormatList () {
      let result = []
      let dateLabels = []
      for (let i = 0; i < this.stealMeList.length; i++) {
        let stealItem = this.stealMeList[i]
        let stealDate = new Date(stealItem.stealTime)
        // console.log('stealDateStr', stealItem.stealTime)
        // console.log('stealDate', stealDate)
        let dateLabel = utils.timeGapFromNow(stealDate, new Date(), false)
        if (!dateLabels.includes(dateLabel)) {
          // console.log('dateLabels不包含' + dateLabel + '，现在将其收纳入库')
          dateLabels.push(dateLabel)
        } else {
          dateLabel = ''
        }
        result.push({
          ...stealItem,
          dateLabel: dateLabel,
          time: utils.formatHour(stealDate)
        })
      }
      return result
    },
    avatars () {
      let result = []
      for (let i = 0; i < this.stealMeList.length; i++) {
        if (i < 5) {
          result.push({
            ...this.stealMeList[i]
          })
        }
      }
      return result
    }
  },
  watch: {
    authWerun (newV, oldV) { // 因为运动授权必须是在用户授权同意的基础上实现，故此处必定两个权限都OK了
      if (oldV === false && newV) { // 授权必须是被拒绝，然后现在同意了才能进入这儿
        console.log('微信运动授权之前被拒绝了，现在又同意了')
        this._getSteps()
      }
    },
    authUserInfo (v) {
      if (v) {
        api.updateUserInfo(this.userinfo) // 更新用户信息
      }
    },
    bubbleClicks (v) {
      console.log('bcw', v)
      for (let i = 0; i < v.length; i++) {
        if (!v[i].hasClick) {
          return
        }
      }
      console.log('全部点完啦，需要新的泡泡')
      this._load('正在为您收集新的泡泡')
    }
  },
  methods: {
    ...mapMutations(['SET_AUTH_USER_INFO', 'SET_USER_INFO']),
    ...mapActions(['FETCH_USER_INFO', 'AUTH_OF_USER_INFO']),
    _touchstart (e) {
      // console.log('touchstart')
      this.startY = e.mp.touches[0].pageY
      this.startTime = Date.now()
    },
    _touchmove (e) {
      // console.log('touchmove')
      this.hasMove = true
      this.lastY = this.nowY
      this.nowY = e.mp.touches[0].pageY
      this.nowTime = Date.now()
    },
    _touchend () {
      // console.log('touchend')
      if (this.hasMove) {
        let distance = this.nowY - this.startY
        let time = (this.nowTime - this.startTime) / 1000
        let speed = distance / time
        if (speed < -110 && !this.more) {
          this.more = true
        }
        if (speed > 110 && this.more) {
          this.more = false
        }
        // console.log(speed > 0 ? '下拉' : '上滑', speed)
      }
      this.hasMove = false
    },
    _setNavigationStyle () {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#2056dd',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    },
    setBubbleClicks () {
      let result = []
      for (let i = 0; i < this.bubbles.length; i++) {
        result.push({
          hasClick: false,
          stolenStepNum: this.bubbles[i].stolenStepNum
        })
      }
      this.bubbleClicks = result
    },
    async _dealBubbles (index) {
      // 修改数组
      let result = [
        ...this.bubbleClicks
      ]
      result[index].hasClick = true
      this.bubbleClicks = result
      try {
        // 上报服务器告知
        const stealStepResult = await api.stealStep({
          openIdBeStolen: this.bubbles[index].openId,
          stolenStepNum: this.bubbles[index].stolenStepNum,
          type: 'steal'
        })
        this.SET_USER_INFO({
          todayStep: this.todayStep + this.bubbles[index].stolenStepNum
        })
        console.log('stealStepResult', stealStepResult)
      } catch (e) {
        utils.showError(e.message)
        console.log('上报错误', e)
      }
    },
    _getuserinfo (e) {
      console.log('userinfo', e)
      this.userinfo = e
      if (!this.authWerun) {
        this.werunPopShow = true
      }
    },
    _cancel () {
    },
    async _bubbleClick (e, index) {
      if (!this.authUserInfo) {
        this.userinfoPopShow = true
        return
      }
      if (!this.authWerun) {
        this.werunPopShow = true
        return
      }
      this._dealBubbles(index)
    },
    async _load (msg) {
      this.hasUpdateUserInfo = false
      try {
        utils.showLoading(msg)
        const result = await api.randomSteal() // 获取6个随机被偷的靓仔
        this.bubbles = result.data
        this.setBubbleClicks()
        console.log(result)
        const stealMeResult = await api.stealMeList()
        this.stealMeList = stealMeResult.data
        console.log('stealMeResult', stealMeResult)
      } catch (e) {
        console.log(e)
        utils.showError()
      } finally {
        wx.hideLoading()
      }
    }
  },
  onLoad () {
    this._setNavigationStyle()
    // 权限
    this.AUTH_OF_USER_INFO()
    console.log('步数权限', this.authWerun) // 必须
    console.log('用户权限', this.authUserInfo) // 可选
    if (!this.authUserInfo) {
      this.userinfoPopShow = true
    }
    // 请求
    this._load()
  },
  onShow () {
    // this.needFetchUserInfo = false
    // wx.hideTabBar()
    // this.userinfoPopShow = !this.authUserInfo
  }
  // onHide () {
  //   wx.showTabBar()
  // }
}
</script>

<style scoped lang="stylus">
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  $bg-height=1197rpx
  .step-page{
    $bubble-0-top=500rpx
    $bubble-0-left=50rpx
    $bubble-1-top=200rpx
    $bubble-1-left=500rpx
    $bubble-2-top=300rpx
    $bubble-2-left=640rpx
    $bubble-3-top=20rpx
    $bubble-3-left=380rpx
    $bubble-4-top=430rpx
    $bubble-4-left=570rpx
    $bubble-5-top=500rpx
    $bubble-5-left=390rpx
    .bg{
      bg-size(750rpx, $bg-height)
      background-color #2056dd
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
        transform translateY(0)
        opacity .98
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
      top 0
      left 0
      transform translateY(79%)
      opacity 1
      background rgba(245,245,245,1)
      background rgba(255,255,255,1)
      .news-title{
        flex 0 0 auto
        background rgba(245,245,245,1)
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
          /*background #fff*/
          font-size 28rpx
          padding 5rpx 8rpx
          border-radius 8rpx
          color #000
          center()
          .iconfont{
            font-size 50rpx
            transform rotate(180deg)
            transition all .5s
            &.sanjiao-more{
              transform rotate(0deg)
            }
          }
        }
      }
      .avatar-wall{
        flex 0 0 auto
        display flex
        justify-content space-between
        padding 30rpx
        .avatar{
          position relative
          .avatar-img{
            width 90rpx
            height 90rpx
            border-radius 15rpx
          }
          .steal-num{
            width 42rpx
            height 42rpx
            border-radius 50%
            background lightseagreen
            position absolute
            right -10rpx
            bottom 0rpx
            font-size 17rpx
            color #fff
            center()
          }
        }
      }
      .content{
        flex 1
        min-height 600rpx
        .wrap{
          /*height:100%;*/
          width 100%;
          display: flex;
          flex-direction: column;
          /*flex-wrap: wrap;*/
          box-sizing border-box
          /*padding-top 30rpx*/
          .steal-me-item{
            width 750rpx
            box-sizing border-box
            padding 0rpx 30rpx
            .date-label{
              margin-top 15rpx
              font-size 32rpx
              font-weight bolder
              color #333
            }
            .steal-me-item-inner{
              position relative
              box-sizing border-box
              padding 0 10rpx
              height 86rpx
              background #fff
              display flex
              justify-content space-between
              align-items center
              .item-title{
                color #000
                font-weight bold
                font-size 28rpx
                .item-title-suffix{
                  font-size 25rpx
                  color #999
                  font-weight 400
                }
              }
              .item-step{
                color lightseagreen
                font-size 30rpx
              }
              .item-time{
                color #999999
                font-size 26rpx
                padding-right 40rpx
              }
              .item-steal{
                bg-image('hand-up-copy')
                bg-size(45rpx, 45rpx)
                position absolute
                bottom 20rpx
                right 0
              }
            }
          }
        }
      }
    }
    .bubble-wrap{
      position fixed
      z-index 1
      border-radius 50%
      overflow hidden
      bg-size(110rpx, 110rpx)
      bg-image('bul')
/*      .bubble-btn{
        width 100%
        height 100%
        opacity 0
      }*/
      &.bubble-wrap-0{
        top $bubble-0-top
        left $bubble-0-left
      }
      &.bubble-wrap-1{
        top $bubble-1-top
        left $bubble-1-left
        animation-delay .5s
      }
      &.bubble-wrap-2{
        top $bubble-2-top
        left $bubble-2-left
        animation-delay .7s
      }
      &.bubble-wrap-3{
        top $bubble-3-top
        left $bubble-3-left
        animation-delay .8s
      }
      &.bubble-wrap-4{
        top $bubble-4-top
        left $bubble-4-left
        animation-delay .6s
      }
      &.bubble-wrap-5{
        top $bubble-5-top
        left $bubble-5-left
        animation-delay .9s
      }
    }
    .plus-step{
      font-size 66rpx
      color main-color
      opacity 0
      font-weight bold
      position fixed
      transform scale(1.1,1.1)
      /*transition transform .8s ease .2s
      &.active{
        transform scale(0,0)
        opacity 1
        z-index 2
      }*/
      &.plus-step-0{
        top $bubble-0-top
        left $bubble-0-left
      }
      &.plus-step-1{
        top $bubble-1-top
        left $bubble-1-left
      }
      &.plus-step-2{
        top $bubble-2-top
        left $bubble-2-left - 60rpx
      }
      &.plus-step-3{
        top $bubble-3-top
        left $bubble-3-left
      }
      &.plus-step-4{
        top $bubble-4-top
        left $bubble-4-left
      }
      &.plus-step-5{
        top $bubble-5-top
        left $bubble-5-left
      }
    }
  }
</style>
