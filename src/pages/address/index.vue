<template>
  <div class="address-page">
    <van-field
      v-model="username"
      required
      clearable
      label="联系人"
      placeholder="请输入联系人姓名"
      :focus="focus && !areaPickerShow"
    />

    <van-field
      v-model="phone"
      type="number"
      label="手机号码"
      placeholder="请输入联系人手机号码"
      required
      :focus="focus && !areaPickerShow"
    />

    <van-field
      v-model="addressArrStr"
      label="选择地区"
      placeholder="请选择所在地区"
      icon="location"
      @clickIcon="chooseAddress"
      @click="chooseAddress"
      readonly
      required
    />
    <van-field
      v-model="detailAddress"
      required
      clearable
      label="详细地址"
      placeholder="如小区几栋几单元门牌号"
      :focus="focus && !areaPickerShow"
    />
    <div class="confirm-btn-wrap">
      <div class="confirm-btn">保存</div>
    </div>
    <van-popup
      :show="areaPickerShow"
      position="bottom">
      <van-area :area-list="areaList"
                class="area-picker"
                @click.stop=""
                @cancel="areaPickerCancel"
                @confirm="areaPickerConfirm"/>
    </van-popup>
  </div>
</template>
<script>
import areaList from '@/utils/area.js'
export default {
  data () {
    return {
      areaList: areaList,
      username: '',
      phone: '',
      address: '',
      detailAddress: '',
      areaPickerShow: false,
      addressArr: null,
      focus: false
    }
  },
  computed: {
    addressArrStr () {
      if (!this.addressArr) {
        return ''
      }
      let result = ''
      for (let a of this.addressArr) {
        result += a.name + '-'
      }
      return result.slice(0, result.length - 1)
    }
  },
  methods: {
    f () {
      console.log('ff')
    },
    chooseAddress () {
      this.areaPickerShow = true
    },
    areaPickerCancel () {
      this.areaPickerShow = false
    },
    areaPickerConfirm (res) {
      console.log(res.mp.detail.values)
      this.addressArr = res.mp.detail.values
      this.areaPickerShow = false
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .address-page{
    padding-top 22rpx
    .overlay{
      position fixed
      top 0
      bottom 0
      left 0
      right 0
      background rgba(0,0,0,0.2)
    }
    .area-picker{
      width 750rpx
    }
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
