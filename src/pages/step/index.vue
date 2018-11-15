<template>
  <div class="step-page">
    <image class="bg-img" src="https://profile-1257124244.cos.ap-chengdu.myqcloud.com/micoapp/bg%403x.png"/>
    <div class="step-info">
      <open-data type="userAvatarUrl" class="avatar"></open-data>
      <div class="step-num">{{ stepsOfTodayCanExchanged }}</div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  components: {
    // tabBar
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['stepsOfTodayCanExchanged'])
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
    .bg-img{
      scale = 1931/1125
      width 750rpx
      height 750rpx * scale
    }
    .step-info{
      position absolute
      top 100rpx
      left 50rpx
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
        text-align center   
        font-size 42rpx
        color main-color
        font-weight bold
        transform scale(1,1.2)
      }
    }
  }
</style>
