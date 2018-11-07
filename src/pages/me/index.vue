<template>
  <div class="me-page">
    <div class="top">
      <div class="user">
        <image class="avatar" :src="avatar"/>
        <div class="text">
          <div class="name">{{ name }}</div>
          <div class="run-days">已经连续运动了{{ runDays }}天</div>
        </div>
      </div>
      <div class="run-info">
        <div class="run-item">
          <div class="num">{{ friendNums }}</div>
          <div class="text">邀请好友数</div>
        </div>
        <div class="run-item">
          <div class="num">{{ todayStolenSteps }}</div>
          <div class="text">今日已偷步数</div>
        </div>
        <div class="run-item" style="border-right:none;">
          <div class="num">{{ todayTotalSteps }}</div>
          <div class="text">今日总步数</div>
        </div>
      </div>
    </div>
    <div class="order">
      <div class="title">我的订单</div>
      <navigator class="order-item" url="/pages/order/main?tag=0">
        <div class="left">
          <div class="icon icon-0"></div>
          <div class="name">数学资料</div>
        </div>
        <span class="iconfont icon-fanhui"/>
        <div class="line"></div>
      </navigator>
      <navigator class="order-item" style="margin-bottom: 17rpx" url="/pages/order/main?tag=1">
        <div class="left">
          <div class="icon icon-1"></div>
          <div class="name">实物礼品</div>
        </div>
        <span class="iconfont icon-fanhui"/>
      </navigator>
      <navigator class="order-item" url="/pages/address/main">
        <div class="left">
          <div class="icon icon-2"></div>
          <div class="name">地址管理</div>
        </div>
        <span class="iconfont icon-fanhui"/>
        <div class="line"></div>
      </navigator>
      <navigator class="order-item">
        <div class="left">
          <div class="icon icon-3"></div>
          <div class="name">联系我们</div>
        </div>
        <span class="iconfont icon-fanhui"/>
      </navigator>
    </div>
    <div class="ad-wrap">
      <div class="ad" :style="{backgroundImage: 'url(' + ad +')'}" v-if="ad.length">
      </div>
    </div>
  </div>
</template>

<script>
import tabBar from '@/components/tab-bar'
export default {
  components: {
    tabBar
  },
  data () {
    return {
      avatar: 'https://profile-1257124244.cos.ap-chengdu.myqcloud.com/micoapp/mine_photo%402x.png',
      runDays: 1,
      name: '走着走着就散了',
      friendNums: 60,
      todayStolenSteps: 2800,
      todayTotalSteps: 30020,
      ad: 'https://profile-1257124244.cos.ap-chengdu.myqcloud.com/micoapp/index_banner%402x.png' // 广告地址
    }
  },

  methods: {
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .me-page{
    .top{
      bg-size(750rpx,323rpx)
      bg-image('mine_bg')
      box-sizing border-box
      padding-top 42rpx
      .user{
        display flex
        align-items center
        padding-left 34rpx
        .avatar{
          width 108rpx
          height 108rpx
          border-radius 50%
          margin-right 36rpx
        }
        .text{
          display flex
          flex-direction column
          color #fff
          justify-content center
          .name{
            font-size 34rpx
            margin-bottom 18rpx
          }
          .run-days{
            font-size 24rpx
          }
        }
      }
      .run-info{
        margin-top 55rpx
        display flex
        .run-item{
          height 62rpx
          flex 1 0 0
          display flex
          flex-direction column
          align-items center
          justify-content center
          color #ffffff
          box-sizing border-box
          border-right 2rpx solid #55F79A
          .num{
            font-size 36rpx
            transform scale(1, 1.2)
          }
          .text{
            font-size 26rpx
          }
        }
      }
    }
    .order{
      .title{
        color #666666
        font-size 26rpx
        margin 33rpx 0 14rpx 33rpx
      }
      .order-item{
        position relative
        height 100rpx
        background #fff
        display flex
        align-items center
        justify-content space-between
        padding 0 40rpx
        .left{
          display flex
          align-items center
          .name{
            color #333
            font-size 32rpx
            margin-left 34rpx
          }
          .icon{
            bg-size(48rpx,48rpx)
            &.icon-0{
              bg-image('mine_fahuo')
            }
            &.icon-1{
              bg-image('mine_duihuan')
            }
            &.icon-2{
              bg-image('mine_map')
            }
            &.icon-3{
              bg-image('mine_fahuo')
            }
          }
        }
        .iconfont{
          font-size 24rpx
          color #c1c1c1
        }
        .line{
          position absolute
          width 718rpx
          height 1rpx
          background #dfdfdf
          right 0
          bottom 0
        }
      }
    }
    .ad-wrap{
      margin-top 20rpx
      padding-bottom 30rpx
      .ad{
        bg-size(750rpx, 250rpx)
      }
    }
  }
</style>
