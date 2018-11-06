<template>
  <navigator class="math-gift" :url="url">
    <div :class="['left', 'type-' + docType]"></div>
    <div class="right">
      <div class="name">{{ name }}</div>
      <div class="price">
        <div class="num">{{ price }}</div>
        <div class="suffix">数学币</div>
      </div>
    </div>
  </navigator>
</template>
<script>
import {mapState} from 'vuex'
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    docType: {
      type: Number,
      default: 0 // 0:doc 1:pdf 2:video
    },
    docClass: {
      type: Number,
      default: 0 // 一年级数学 依次类推
    },
    price: {
      type: Number,
      default: 0
    },
    giftId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log('系统信息', this.systemInfo)
  },
  computed: {
    ...mapState(['systemInfo']),
    url () {
      return `/pages/gift-detail/main?giftId=${this.giftId}`
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .math-gift{
    height 180rpx
    background #fff
    border-radius 6rpx
    box-sizing border-box
    padding 24rpx 18rpx 18rpx 23rpx
    display flex
    margin-bottom 36rpx
    .left{
      flex 0 0 auto
      bg-size(108rpx,125rpx)
      margin-right 39rpx
      &.type-0{
        bg-image('wps')
      }
      &.type-1{
        bg-image('pdf')
      }
      &.type-2{
        bg-image('player')
      }
    }
    .right{
      flex 1
      display flex
      flex-direction column
      justify-content space-between
      .name{
        wrap(2)
        font-size 30rpx
        color #333
      }
      .price{
        display flex
        align-items center
        .num{
          color #43D17F
          font-size 36rpx
        }
        .suffix{
          color #333
          font-size 26rpx
        }
      }
    }
  }
</style>
