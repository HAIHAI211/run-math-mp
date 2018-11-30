<template>
  <div class="order-confirm-page">
    <run-gift :gift="gift"/>
    <div class="confirm-address-title">确认收货地址</div>
    <address-form @update="_updateForm"/>
    <div class="submit-btn" @click="_submitOrder">提交</div>
  </div>
</template>
<script>
  import runGift from '@/components/run-gift'
  import addressForm from '@/components/address-form'
  import {mapState, mapActions} from 'vuex'
  import * as utils from '@/utils'
  import {placeOrder} from '@/http/api'

  export default {
    components: {
      runGift,
      addressForm
    },
    data () {
      return {
        user: null,
        err: ''
      }
    },
    computed: {
      ...mapState(['gift'])
    },
    methods: {
      ...mapActions(['FETCH_USER_INFO']),
      _updateForm (res) {
        console.log(res)
        this.user = res.user
        this.err = res.err
      },
      async _submitOrder () {
        await utils.sleep(50)
        if (this.err) {
          utils.showError(this.err)
          return
        }
        utils.showLoading()
        let params = {
          type: this.gift.type,
          presentId: this.gift.id,
          ...this.user
        }
        console.log('params', params)
        try {
          await placeOrder(params)
          this.FETCH_USER_INFO()
          wx.hideLoading()
          wx.navigateTo({
            url: '/pages/change-success/main'
          })
        } catch (e) {
          console.log(e)
          wx.hideLoading()
          utils.showError(e.message, 1500)
        }
      }
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
