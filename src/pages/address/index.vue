<template>
  <div class="address-page">
    <address-form @update="_updateForm"/>
    <div class="confirm-btn-wrap">
      <div class="confirm-btn" @click="_save">保存</div>
    </div>
  </div>
</template>
<script>
import addressForm from '@/components/address-form'
import { updateUserInfo } from '@/http/api'
import { showError, showLoading, showToast, sleep } from '@/utils'
import {mapActions, mapState} from 'vuex'
export default {
  components: {
    addressForm
  },
  data () {
    return {
      user: null,
      err: ''
    }
  },
  computed: {
    ...mapState(['contactsName', 'telNo', 'addressArea', 'address'])
  },
  methods: {
    ...mapActions(['FETCH_USER_INFO', 'LOGIN']),
    _checkSame () {
      console.log('old address', this.user.address)
      console.log('now address', this.address)
      return this.contactsName === this.user.contactsName &&
        this.telNo === this.user.telNo &&
        this.addressArea === this.user.addressArea &&
        this.address === this.user.address
    },
    async _save () {
      showLoading()
      await sleep(300)
      if (this.err) {
        showToast(this.err)
        return
      }
      if (this._checkSame()) {
        showToast('保存成功')
        return
      }
      console.log('save')
      try {
        await updateUserInfo(this.user)
        await this.LOGIN()
        await this.FETCH_USER_INFO()
        showToast('保存成功')
      } catch (e) {
        console.log('保存失败的真实原因', e)
        showError()
      }
    },
    _updateForm (param) {
      console.log('user', param.user)
      this.user = param.user
      this.err = param.err
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
