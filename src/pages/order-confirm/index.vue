<template>
  <div class="order-confirm-page">
    <run-gift/>
    <div class="confirm-address-title">确认收货地址</div>
    <address-form/>
    <div class="submit-btn">提交</div>
  </div>
</template>
<script>
  import runGift from '@/components/run-gift'
  import addressForm from '@/components/address-form'
  export default {
    components: {
      runGift,
      addressForm
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .order-confirm-page{
    padding 20rpx
    .confirm-address-title{
      color #666
      font-size 30rpx
    }
    .submit-btn{
      background main-color
      width 685rpx
      height 97rpx
      border-radius 47rpx
      center()
      color #fff
      font-size 34rpx
      position fixed
      bottom 30rpx
    }
  }
</style>
