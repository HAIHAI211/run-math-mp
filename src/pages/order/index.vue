<template>
  <div class="order-page">
    <van-tabs :active="tag" @change="tabChange" color="#3ACF7A">
      <van-tab title="数学资料">
        <div class="order-list math">
          <div class="math-order" v-for="order in orders">
            <div class="main">
              <div class="icon type-doc"></div>
              <div class="right">
                <div class="name">{{ order.name }}</div>
                <div class="price">
                  <div class="num">{{ order.price }}</div>
                  <div class="suffix">数学币</div>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="btn btn-see">查看</div>
              <div class="btn btn-download">下载</div>
            </div>
          </div>
        </div>
        <!--<div class="empty" v-else>暂无数据</div>-->
      </van-tab>
      <van-tab title="实物礼品">
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
// import { sleep } from '@/utils'
export default {
  components: {
  },
  data () {
    return {
      tag: 0, // 判断是从实物礼品item进来还是从数学资料item进来,0为数学资料
      orders: [
        {
          name: '【三年级英语】期末考试试题解析.doc',
          price: 66
        }
      ]
    }
  },
  methods: {
  },
  mounted () {
  },
  onLoad (options) {
    console.log(options)
    this.tag = options.tag
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .order-page{
    .order-list{
      padding 0 33rpx
      .math-order{
        background #fff
        margin-top 21rpx
        border-radius 5rpx
        width 694rpx
        height 300rpx
        box-sizing border-box
        display flex
        flex-direction column
        .main{
          flex 0 0 auto
          border-bottom 1rpx solid #DBDBDB
          height 190rpx
          box-sizing border-box
          padding 23rpx 20rpx 10rpx 20rpx
          display flex
          .icon{
            flex 0 0 auto
            bg-size(108rpx,125rpx)
            margin-right 39rpx
            &.type-doc{
              bg-image('wps')
            }
            &.type-pdf{
              bg-image('pdf')
            }
            &.type-player{
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
        .bottom{
          padding 0 10rpx
          flex 1 0 0
          display flex
          align-items center
          justify-content flex-end
          .btn{
            width 136rpx
            height 65rpx
            border-radius 28rpx
            box-sizing border-box
            center()
            font-size 26rpx
            letter-spacing 1rpx
            &.btn-see{
              background main-color
              color #fff
              margin-right 17rpx
            }
            &.btn-download{
              border 1rpx solid main-color
              color main-color
            }
          }
        }
      }
    }
    .empty{
      padding-top 300rpx
      text-align center
      color #333333
      font-size 26rpx
    }
  }
</style>
