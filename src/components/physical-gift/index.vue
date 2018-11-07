<template>
  <navigator class="physical-gift":url="url">
    <div class="left"
         :style="{backgroundImage: 'url(' + gift.coverPicUrl + ')'}"></div>
    <div class="right">
      <div class="right-top">{{ gift.name }}</div>
      <div class="right-middle">
        <div class="postage" v-if="gift.postage">包邮</div>
      </div>
      <div class="right-bottom">
        <div class="price">
          <span class="num">{{ gift.price }}</span>
          <span class="suffix">数学币</span>
        </div>
        <div class="old-price" v-if="!usedByOrder">
          原价￥{{gift.originalPrice}}
        </div>
      </div>
      <!--<div class="count" v-if="usedByOrder">-->
        <!--x{{ gift.count }}-->
      <!--</div>-->
      <div class="state" v-if="usedByOrder">
        <span v-if="gift.state === 0" class="state-0">待发货</span>
        <span v-else class="state-1">已发货</span>
      </div>
    </div>
  </navigator>
</template>
<script>
export default {
  props: {
    usedByOrder: { // 是否用于订单页面
      type: Boolean,
      default: false
    },
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
          originalPrice: 0, // 原价
          state: 0 // 0:未发货 1:发货
        }
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    url () {
      return `/pages/gift-detail/main?giftId=${this.gift.id}&type=${this.gift.type}` // type = 2 表示是实物奖品
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .physical-gift{
    margin-bottom 36rpx
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
      position relative
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
      .count{
        position absolute
        top 0rpx
        right 0rpx
        font-size 30rpx
        transform scale(1,1.1)
        color #333333
      }
      .state{
        position absolute
        bottom 0rpx
        right 0rpx
        font-size 30rpx
        .state-0{
          color #FF5409
        }
        .state-1{
          color #B3B3B3
        }
      }
    }
  }
</style>
