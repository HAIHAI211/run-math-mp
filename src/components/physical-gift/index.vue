<template>
  <div class="physical-gift">
    <div class="left"
         :style="{backgroundImage: 'url(' + img + ')'}"></div>
    <div class="right">
      <div class="right-top">{{ name }}</div>
      <div class="right-middle">
        <div class="postage" v-if="postage">包邮</div>
      </div>
      <div class="right-bottom">
        <div class="price">
          <span class="num">{{ price }}</span>
          <span class="suffix">数学币</span>
        </div>
        <div class="old-price">
          原价￥{{oldPrice}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      default: 0
    },
    oldPrice: {
      type: Number,
      default: 0
    },
    img: {
      type: String,
      default: ''
    },
    count: {
      type: Number,
      default: -1
    },
    state: {
      type: Number,
      default: -1
    },
    postage: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .physical-gift{
    margin-bottom 20rpx
    width 685rpx
    height 258rpx
    border-radius 6rpx
    background #fff
    box-sizing border-box
    padding 22rpx 22rpx 31rpx 22rpx
    display flex
    .left{
      flex 0 0 auto
      bg-size(205rpx,205rpx)
      margin-right 31rpx
    }
    .right{
      flex 1 0 0
      display flex
      flex-direction column
      justify-content space-between
      .right-top{
        width 367rpx
        color #333
        font-size 30rpx
        wrap(2)
      }
      .right-middle{
        .postage{
          width 72rpx
          height 35rpx
          background #FFEDD4
          border-radius 16rpx
          color #F69307
          font-size 24rpx
          center()
        }
      }
      .right-bottom{
        display flex
        align-items center
        .price{
          margin-right 35rpx
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
        .old-price{
          color #999
          font-size 26rpx
          text-decoration line-through
        }
      }
    }
  }
</style>
