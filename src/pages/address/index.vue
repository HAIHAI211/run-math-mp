<template>
  <div class="address-page">
    <van-field
      v-model="username"
      required
      clearable
      label="联系人"
      placeholder="请输入联系人姓名"
    />

    <van-field
      v-model="phone"
      type="number"
      label="手机号码"
      placeholder="请输入联系人手机号码"
      required
    />

    <van-field
      v-model="addressArrStr"
      label="选择地区"
      placeholder="选择所在地区"
      icon="location"
      @clickIcon="chooseAddress"
      @focus="chooseAddress"
      required
    />
    <van-field
      v-model="detailAddress"
      label="详细地址"
      type="textarea"
      placeholder="请输入详细地址信息如:小区几栋几单元"
      required
      autosize
    />
    <div class="overlay" v-if="areaPickerShow" @click="areaPickerShow=false">
      <van-area :area-list="areaList"
                class="area-picker"
                @cancel="areaPickerCancel"
                @confirm="areaPickerConfirm"/>
    </div>
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
      addressArr: null
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
      // this.areaPickerShow = false
    },
    areaPickerConfirm (res) {
      console.log(res.mp.detail.values)
      this.addressArr = res.mp.detail.values
      // this.areaPickerShow = false
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
      position fixed
      bottom 0
    }
  }
</style>
