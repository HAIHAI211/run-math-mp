<template>
  <div class="gift-detail-page">
    <div class="swiper-wrap">
      <swiper class="swiper" :current="current" @change="swiperChange">
        <swiper-item v-for="(imgUrl,imgUrlIndex) in imgUrls" :key="imgUrlIndex">
          <image :src="imgUrl" class="slide-image"/>
        </swiper-item>
      </swiper>
      <div class="my-indicator">
        <span class="current">{{ current + 1 }}</span> /<span>{{ imgUrls.length }}</span>
      </div>
    </div>
    <div class="gift-info">
      <div class="name">{{ name }}</div>
      <div class="middle">
        <div class="postage">包邮</div>
        <div class="shengyu">今日剩余：{{ leftCount }}份</div>
      </div>
      <div class="bottom">
        <div class="price">
          <div class="now">
            <span class="num">{{ price }}</span>
            <span class="suffix">数学币</span>
          </div>
          <div class="old">原价￥{{ oldPrice }}</div>
        </div>
        <div class="share">
          分享好友
          <span class="iconfont icon-fenxiang"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
      current: 0,
      name: '极客数学帮专属定制笔记本，超值优惠大放送',
      postage: true,
      leftCount: 2, // 今日剩余数量
      price: 135,
      oldPrice: 5
    }
  },
  methods: {
    swiperChange (res) {
      console.log(res.mp.detail.current)
      this.current = res.mp.detail.current
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .gift-detail-page{
    .swiper-wrap{
      position relative
      .swiper{
        width 750rpx
        height 500rpx
      }
      .slide-image{
        width 750rpx
        height 500rpx
      }
      .my-indicator{
        position absolute
        bottom 20rpx
        right 35rpx
        width 91rpx
        height 50rpx
        border-radius 24rpx
        color #fff
        background rgba(195,192,191,0.5)
        center()
        font-size 26rpx
        font-weight 400
        .current{
          font-size 32rpx
          transform scale(1, 1.2)
        }
      }
    }
    .gift-info{
      background #fff
      padding 0 25rpx
      display flex
      flex-direction column
      justify-content space-around
      height 206rpx
      margin-bottom 22rpx
      .name{
        color #333
        font-size 30rpx
        font-weight bolder
        wrap(2)
      }
      .middle{
        display flex
        align-items center
        .postage{
          background #FFEDD4
          color #F69307
          center()
          padding 1rpx
          font-size 24rpx
          margin-right 43rpx
        }
        .shengyu{
          background #FFEBE7
          border 1rpx solid #FFB2A3
          color #FF4520
          border-radius 16rpx
          font-size 24rpx
          padding 2rpx
          center()
        }
      }
      .bottom{
        display flex
        justify-content space-between
        align-items center
        .price{
          display flex
          align-items center
          .now{
            margin-right 21rpx
            display flex
            align-items center
            .num{
              color main-color
              font-size 36rpx
              transform scale(1,1.2)
            }
            .suffix{
              font-size 26rpx
              color #333
            }
          }
          .old{
            text-decoration line-through
            color #999999
            font-size 26rpx
          }
        }
        .share{
          color main-color
          font-size 30rpx
        }
      }
    }
  }
</style>
