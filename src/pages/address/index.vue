<template>
  <div class="address-page">
    <address-form :focus="false"/>
    <div class="confirm-btn-wrap">
      <div class="confirm-btn" @click="_save">保存</div>
    </div>
  </div>
</template>
<script>
import addressForm from '@/components/address-form'
import { updateUserInfo } from '@/http/api'
import {mapActions, mapGetters} from 'vuex'
export default {
  data () {
    return {
      focus: true
    }
  },
  components: {
    addressForm
  },
  computed: {
    ...mapGetters(['addressInfo', 'addressInfoErr'])
  },
  methods: {
    ...mapActions(['FETCH_USER_INFO', 'LOGIN']),
    async _save () {
      this.focus = false
      this.utils.showLoading()
      await this.utils.sleep(300)
      if (this.addressInfoErr) {
        this.utils.showToast(this.addressInfoErr)
        return
      }
      console.log('save')
      try {
        await updateUserInfo()
        this.utils.showToast('保存成功')
      } catch (e) {
        console.log('保存失败的真实原因', e)
        this.utils.showError()
      }
    }
  },
  async onShow () {
    this.focus = true
    this.utils.showLoading()
    try {
      await this.FETCH_USER_INFO()
    } catch (e) {
      console.log(e)
    } finally {
      wx.hideLoading()
    }
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
