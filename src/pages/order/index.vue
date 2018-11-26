<template>
  <div class="order-page">
    <van-tabs :active="pageIndex" @change="tabChange" color="#3ACF7A">
      <van-tab title="数学资料">
        <div class="order-list math">
          <div class="math-order" v-for="(morder,morderIndex) in activePage.list" :key="morderIndex">
            <div class="main">
              <div class="icon type-doc"></div>
              <div class="right">
                <div class="name">{{ morder.name }}</div>
                <div class="price">
                  <div class="num">{{ morder.price }}</div>
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
      </van-tab>
      <van-tab title="实物礼品">
        <div class="order-list physical">
          <div class="physical-order" v-for="(porder,porderIndex) in activePage.list" :key="porderIndex">
            <div class="top" v-if="porder.status === 1">
              <span>运单号：{{ porder.waybillNo }}</span>
              <div class="copy">复制运单号</div>
            </div>
            <div class="main">
              <image class="icon" :src="porder.coverPicUrl"/>
              <div class="right">
                <div class="title">{{ porder.name }}</div>
                <div class="info">
                  <div class="price">
                    <div class="num">{{ porder.price }}</div>
                    <div class="suffix">数学币</div>
                  </div>
                  <div :class="['state', 'state-' + porder.status]">{{ porder.status === 0 ? '待发货' : '已发货' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <run-loading :state="loadingState"/>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import runLoading from '@/components/run-loading'
import {mixinPullToRefresh} from '@/mixin'
export default {
  mixins: [mixinPullToRefresh],
  components: {
    runLoading
  },
  data () {
    return {
      pageSum: 2,
      apis: ['getDocOrder', 'getRealOrder'],
      mathOrders: [
        {
          name: '【三年级英语】期末考试试题解析.doc',
          price: 66
        },
        {
          name: '【三年级英语】期末考试试题解析.doc',
          price: 66
        },
        {
          name: '【三年级英语】期末考试试题解析.doc',
          price: 66
        }
      ],
      physicalOrders: [
        {
          name: '极客数学帮专属定制笔记本， 超值优惠大放送',
          coverPicUrl: 'https://profile-1257124244.cos.ap-chengdu.myqcloud.com/micoapp/img_04%403x.png',
          price: 78,
          state: 0
        },
        {
          postId: '3428756285',
          name: '极客数学帮专属定制笔记本， 超值优惠大放送',
          coverPicUrl: 'https://profile-1257124244.cos.ap-chengdu.myqcloud.com/micoapp/img_04%403x.png',
          price: 99,
          state: 1
        }
      ]
    }
  },
  computed: {
    ...mapState(['gift'])
  },
  watch: {
    pageIndex (v) {
      wx.startPullDownRefresh()
    }
  },
  methods: {
    tabChange (v) {
      console.log(v)
      this.pageIndex = v.mp.detail.index
    }
  },
  onLoad (options) {
    console.log(options)
    this.pageIndex = this.gift.type === 2 ? 1 : 0
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
        margin-top 30rpx
        border-radius 5rpx
        width 694rpx
        height 300rpx
        box-sizing border-box
        display flex
        flex-direction column
        .main{
          bg-image('icon_yin')
          background-size 112rpx 83rpx
          background-position 510rpx 78rpx
          background-repeat no-repeat
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
            border-radius 32rpx
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
      .physical-order{
        background #fff
        margin-top 30rpx
        .top{
          padding-left 22rpx
          height 77rpx
          display flex
          justify-content space-between
          align-items center
          font-size 30rpx
          color #333
          border-bottom 1rpx solid #DBDBDB
          .copy{
            border 1rpx solid #b3b3b3
            border-radius 10rpx
            padding 5rpx 10rpx
            font-size 23rpx
            color #B3B3B3
            margin-right 20rpx
          }
        }
        .main{
          height 258rpx
          box-sizing border-box
          padding 22rpx
          display flex
          .icon{
            flex 0 0 auto
            width 205rpx
            height 205rpx
            margin-right 30rpx
          }
          .right{
            display flex
            flex-direction column
            justify-content space-between
            .title{
              wrap(2)
              font-size 30rpx
              color 333
            }
            .info{
              display flex
              justify-content space-between
              align-items center
              .price{
                display flex
                align-items center
                .num{
                  font-size 36rpx
                  color #43D17F
                }
                .suffix{
                  color #333
                  font-size 26rpx
                }
              }
              .state{
                font-size 30rpx
                &.state-0{
                  color #FF5409
                }
                &.state-1{
                  color #B3B3B3
                }
              }
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
