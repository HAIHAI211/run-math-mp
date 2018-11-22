<template>
  <div class="step-page">
    <image class="bg-img" mode="widthFix" src="https://profile-1257124244.cos.ap-chengdu.myqcloud.com/micoapp/bg%403x.png"/>
    <div class="step-info">
      <open-data type="userAvatarUrl" class="avatar"></open-data>
      <div class="step-num">{{ todayStep }}</div>
    </div>
    <div class="news">
      <div class="news-title">最新动态</div>
      <div class="content">
        <div class="day-info" v-for="(dayInfo,dayInfoIndex) in dayInfos" :key="dayInfoIndex">
          <div class="day-info-title">{{ dayInfo.title }}</div>
          <div class="day-info-item" v-for="(item, itemIndex) in dayInfo.items" :key="itemIndex">
            <div class="item-title">{{ item.name }}</div>
            <div class="item-step">{{ item.step }}步</div>
            <div class="item-time">{{ item.time }}</div>
          </div>
        </div>
      </div>
    </div>
    <div :class="['bubble-wrap', 'bubble-wrap-' + bubbleIndex]"
         v-for="(bubble,bubbleIndex) in 6"
         :key="bubbleIndex">
      <run-btn openType="getUserInfo"/>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import runBtn from '@/components/run-btn'
export default {
  components: {
    runBtn
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
            }
          ]
        }
      ],
      bubbles: []
    }
  },
  computed: {
    ...mapState(['todayStep'])
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .step-page{
    position: relative
    height 100%
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
            height 80rpx
            background #fff
            display flex
            justify-content space-between
            align-items center
            padding 0 12rpx
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
      &.bubble-wrap-0{
        top 200rpx
        left 50rpx
        animation-delay 0s
      }
      &.bubble-wrap-1{
        top 200rpx
        left 100rpx
        animation-delay .5s
      }
      &.bubble-wrap-2{
        top 300rpx
        left 200rpx
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
