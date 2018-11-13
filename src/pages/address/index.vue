<template>
  <div class="address-page">
    <address-form/>
    <div class="confirm-btn-wrap">
      <div class="confirm-btn">保存</div>
    </div>
  </div>
</template>
<script>
import addressForm from '@/components/address-form'
export default {
  components: {
    addressForm
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .address-page{
    .confirm-btn-wrap{
      margin-top 50rpx
      display flex
      justify-content center
      .confirm-btn{
        background main-color
        center()
        width 685rpx
        height 97rpx
        border-radius 47rpx
        color #fff
        font-size 34rpx
        letter-spacing 1rpx
      }
    }
  }
</style>
