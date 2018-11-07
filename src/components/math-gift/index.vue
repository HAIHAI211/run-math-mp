<template>
  <navigator class="math-gift" :url="url">
    <div :class="['left', 'type-' + gift.fileType]"></div>
    <div class="right">
      <div class="name">{{ gift.name }}</div>
      <div class="price">
        <div class="num">{{ gift.price }}</div>
        <div class="suffix">数学币</div>
      </div>
    </div>
  </navigator>
</template>
<script>
// import {mapState} from 'vuex'
export default {
  props: {
    gift: {
      type: Object,
      default () {
        return {
          id: 0,
          name: '',
          type: 0, // 礼品类型 0:文档 1:视频 2:实物
          coverPicUrl: '', // 封面图
          fileType: 'doc', // 文件类型
          price: 0,
          postage: 1, // 是否包邮
          originalPrice: 0 // 原价
        }
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    // ...mapState(['systemInfo']),
    url () {
      return `/pages/gift-detail/main?giftId=${this.gift.id}&type=${this.gift.type}` // giftType = 0 || 1 表示是数学资料
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
