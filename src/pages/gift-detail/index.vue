<template>
  <div class="gift-detail-page">
    <div class="swiper-wrap">
      <swiper class="swiper" :current="current" @change="swiperChange" :interval="2000" autoplay>
        <swiper-item v-for="(imgUrl,imgUrlIndex) in infoPicUrlListFormat" :key="imgUrlIndex">
          <image :src="imgUrl" class="slide-image"/>
        </swiper-item>
      </swiper>
      <div class="my-indicator">
        <span class="current">{{ current + 1 }}</span> /<span>{{ infoPicUrlListFormat.length }}</span>
      </div>
    </div>
    <div class="gift-info">
      <div class="name">{{ name }}</div>
      <div class="middle">
        <div class="postage" v-if="type===2 && postage === 1">包邮</div>
        <div class="shengyu">今日剩余：{{ totalAmount }}份</div>
      </div>
      <div class="bottom">
        <div class="price">
          <div class="now">
            <span class="num">{{ price }}</span>
            <span class="suffix">数学币</span>
          </div>
          <div class="old" v-if="type===2">原价￥{{ originalPrice }}</div>
        </div>
        <div class="share">
          <div class="btn-wrap">
            <run-btn openType="share"/>
          </div>
          <span class="share-title">分享好友</span>
          <span class="iconfont icon-fenxiang"/>
        </div>
      </div>
    </div>
    <van-tabs :active="activeTabIndex" @change="tabChange" color="#3ACF7A">
      <van-tab title="兑换记录">
        <div class="exchange-record-wrap">
          <div class="exchange-record" v-for="(record,recordIndex) in recordList" :key="recordIndex" v-if="recordList.length">
            <div class="user">
              <image :src="record.avatar_url" class="avatar"/>
              <div class="name">{{ record.pojoNickName }}</div>
            </div>
            <div class="info">兑换了{{ record.name }}</div>
            <div class="time">
              {{ record.pojoTime }}
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="商品介绍">{{ info }}</van-tab>
    </van-tabs>
    <div class="confirm-btn-wrap">
      <navigator class="confirm-btn" url="/pages/order-confirm/main">立即兑换</navigator>
    </div>
  </div>
</template>
<script>
import { getGiftDetail } from '@/http/api'
import runBtn from '@/components/run-btn'
import * as utils from '@/utils'
export default {
  components: {
    runBtn
  },
  data () {
    return {
      id: 0,
      price: 0,
      postage: 0, // 2
      originalPrice: 0, // 2
      infoPicUrlListFormat: [],
      recordList: [], // 兑换记录
      type: 0,
      info: '',
      activeTabIndex: 0,
      current: 0,
      name: '',
      totalAmount: 1 // 今日剩余数量
    }
  },
  methods: {
    swiperChange (res) {
      // console.log(res.mp.detail.current)
      this.current = res.mp.detail.current
    },
    tabChange (event) {
      this.activeTabIndex = event.mp.detail.index
    },
    _pojo (data) {
      console.log('礼品详情', data)
      this.name = data.name
      this.totalAmount = data.totalAmount // 剩余总数
      this.price = data.price
      this.info = data.info // 介绍
      this.infoPicUrlListFormat = data.infoPicUrlListFormat // 待定
      if (this.type === 2) {
        this.originalPrice = data.originalPrice
        this.postage = data.postage
      }
      for (let i = 0; i < data.recordList.length; i++) {
        let record = data.recordList[i]
        record.pojoNickName = record.nick_name.slice(0, 1) + '**'
        let date = new Date(record.change_time)
        // let date = new Date('2018/11/20 07:00')
        let now = new Date()
        record.pojoTime = utils.timeGapFromNow(date, now)
        this.recordList.push(record)
      }
      // this.recordList = data.recordList
    }
  },
  async onLoad (options) {
    console.log(options)
    this.id = parseInt(options.giftId)
    this.type = parseInt(options.giftType)
    utils.showLoading()
    try {
      const { data } = await getGiftDetail({
        id: this.id,
        type: this.type
      })
      this._pojo(data)
      wx.hideLoading()
    } catch (e) {
      wx.hideLoading()
      utils.showError()
    }
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '极客数学帮',
      path: 'pages/gift-detail/main'
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
          padding 2rpx 3rpx
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
              transform scale(1,1.1)
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
          display flex
          align-items center
          color main-color
          .btn-wrap{
            position absolute
            top 0
            left 0
            width 100%
            height 100%
          }
          .share-title{
            font-size 30rpx
            padding-right 6rpx
          }
        }
      }
    }
    .exchange-record-wrap{
      padding-bottom 130rpx
      .exchange-record{
        background #fff
        display flex
        align-items center
        justify-content space-between
        padding 20rpx
        .user{
          flex 0 0 auto
          display flex
          align-items center
          .avatar{
            width 60rpx
            height 60rpx
            border-radius 50%
            margin-right 16rpx
          }
          .name{
            font-size 26rpx
            color #333
          }
        }
        .info{
          font-size 26rpx
          color #999
          flex 0 0 400rpx
          no-wrap()
        }
        .time{
          font-size 26rpx
          color #999
        }
      }
    }

    .confirm-btn-wrap{
      width 750rpx
      position fixed
      bottom 15rpx
      left 0rpx
      display flex
      justify-content center
      .confirm-btn{
        background main-color
        center()
        width 685rpx
        height 97rpx
        border-radius 47rpx
        color #fff
        font-size 34rpx
        letter-spacing 1rpx
      }
    }
  }
</style>
