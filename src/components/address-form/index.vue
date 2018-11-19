<template>
  <div class="address-form">
    <div class="field-item">
      <div class="wrap">
        <div class="label">联系人</div>
        <input class="input"
               placeholder="请输入联系人姓名"
               type="text"
               maxlength="10"
               v-model.lazy="user.contactsName" :focus="focus && !areaPickerShow"/>
      </div>
    </div>
    <div class="field-item">
      <div class="wrap">
        <div class="label">手机号码</div>
        <input class="input"
               placeholder="请输入联系人姓名"
               maxlength="11"
               type="number"
               v-model.lazy="user.telNo" :focus="focus && !areaPickerShow"/>
      </div>
    </div>
    <div class="field-item">
      <div class="wrap">
        <div class="label">选择地区</div>
        <input @click="chooseAddress"
               disabled
               class="input" placeholder="点击选择所在地区" type="number" v-model="areaStr"/>
      </div>
    </div>
    <div class="field-item">
      <div class="wrap">
        <div class="label">详细地址</div>
        <input class="input" placeholder="如小区几栋几单元门牌号" type="number" v-model.lazy="user.address"/>
      </div>
    </div>
    <van-popup
      :show="areaPickerShow"
      position="bottom">
      <van-area :area-list="areaList"
                :value="addressArea"
                class="area-picker"
                @click.stop=""
                @cancel="areaPickerCancel"
                @confirm="areaPickerConfirm"/>
    </van-popup>
  </div>
</template>
<!--
由于小程序+vant的限制，这里无法使用v-model（事件的参数被包裹）
:value相当于初始值
@input相当于事件触发(还不能在input中修改:value对应变量，会重复赋值造成input闪烁)
-->
<script>
  import areaList from '@/utils/area.js'
  import {mapState, mapActions} from 'vuex'
  // import { sleep } from '../../utils'
  export default {
    data () {
      return {
        // 业务逻辑
        areaList: areaList,
        areaPickerShow: false,
        addressArr: null,
        focus: false,
        a: '123',
        user: {
          openId: '',
          contactsName: '',
          telNo: '',
          addressArea: '', // 是区县的areaCode
          address: '' // 详细地址
        }
      }
    },
    computed: {
      ...mapState(['contactsName', 'telNo', 'addressArea', 'address', 'openId']),
      areaStr () {
        if (!this.user.addressArea || this.user.addressArea.length !== 6) {
          return ''
        }
        // console.log('addressArea', this.user.addressArea)
        let provinceName = this.areaList.province_list[this.user.addressArea.slice(0, 2) + '0000']
        let cityName = this.areaList.city_list[this.user.addressArea.slice(0, 4) + '00']
        let countyName = this.areaList.county_list[this.user.addressArea]
        return provinceName + '-' + cityName + '-' + countyName
      }
    },
    watch: {
      user: {
        handler (val) {
          const errMsg = this._checkError(val)
          const param = {
            user: val,
            err: errMsg
          }
          this.$emit('update', param)
        },
        deep: true
      }
    },
    methods: {
      ...mapActions(['FETCH_USER_INFO']),
      _checkError (user) {
        if (!user.contactsName) {
          return '请输入联系人姓名'
        } else if (!user.telNo) {
          return '请输入联系人手机号'
        } else if (user.telNo.length !== 11) {
          return '请输入正确的手机号格式'
        } else if (!user.addressArea) {
          return '请选择所在地区'
        } else if (!user.address) {
          return '请填写详细地址'
        } else {
          return ''
        }
      },
      chooseAddress () {
        this.areaPickerShow = true
      },
      areaPickerCancel () {
        this.areaPickerShow = false
      },
      areaPickerConfirm (res) {
        // console.log(res.mp.detail.values)
        const addressValues = res.mp.detail.values
        this.user.addressArea = addressValues[addressValues.length - 1].code
        this.areaPickerShow = false
      }
    },
    mounted () {
      this.user = {
        openId: this.openId,
        contactsName: this.contactsName,
        telNo: this.telNo,
        addressArea: this.addressArea, // 是区县的areaCode
        address: this.address
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .address-form{
    padding-top 22rpx
    .area-picker{
      width 750rpx
    }
    .field-item{
      background #fff
      height 100rpx
      padding-left 35rpx
      .wrap{
        padding-right 35rpx
        height 100%
        box-sizing border-box
        border-bottom 1rpx solid line-color
        display flex
        justify-content space-between
        align-items center
        .label{
          font-size 30rpx
          color #666
          font-weight 300
        }
        .input{
          height 90%
          flex 0 0 510rpx
          color #333
          font-size 30rpx
          font-weight 00
        }
      }
    }
  }
</style>
