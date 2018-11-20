<template>
  <div class="pic-pop"  v-if="selfPopShow" @click.stop="" @touchmove.stop="" >
    <div class="overlay"></div>
    <div class="content" v-if="selfPopShow">
      <div class="pic-wrap">
        <image :src="selfUrl" class="pic" mode="widthFixed"/>
        <image src="/static/img/delete@2x.png" class="close-btn" @click="selfPopShow=false"/>
        <div class="detail" v-if="popType !==2">
          <div class="title">关注<span class="bold">回复“{{ boldTitle }}”</span>，{{ suffixTitle }}</div>
          <!--<div :class="['btn','btn-'+popType]">{{ detailBtnText }}</div>-->
          <button open-type="contact":class="['btn','btn-'+popType]">{{ detailBtnText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    popShow: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ''
    },
    popType: {
      type: Number,
      default: 0 // 0:关注公众号 1:去客服 2：自定义
    }
  },
  data () {
    return {
      selfPopShow: this.popShow
    }
  },
  computed: {
    selfUrl () {
      if (this.popType === 0) {
        return '/static/img/Popup_window@2x.png'
      } else if (this.popType === 1) {
        return '/static/img/Dialog_q@2x.png'
      } else {
        return this.url
      }
    },
    boldTitle () {
      if (this.popType === 0) {
        return '6'
      } else if (this.popType === 1) {
        return 'Q'
      } else {
        return ''
      }
    },
    suffixTitle () {
      if (this.popType === 0) {
        return '领精美礼品!'
      } else if (this.popType === 1) {
        return '客服小姐姐为您解答'
      } else {
        return ''
      }
    },
    detailBtnText () {
      if (this.popType === 0) {
        return '关注公众号'
      } else if (this.popType === 1) {
        return '联系客服'
      } else {
        return ''
      }
    }
  },
  watch: {
    popShow (v) {
      this.selfPopShow = v
    },
    selfPopShow (v) {
      this.$emit('update:popShow', v)
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .pic-pop{
    .overlay{
      position fixed
      z-index 1000
      top 0
      left 0
      right 0
      bottom 0
      background rgba(0,0,0,.3)
    }
    .content{
      position fixed
      z-index 1001
      top 0
      left 0
      right 0
      bottom 0
      display flex
      center()
      .pic-wrap{
        position relative
        // $pw = 476 * 1.2rpx
        // $ph = 648 * 1.2rpx
        .pic{
          width 500rpx
        }
        .close-btn{
          position absolute
          bottom -100rpx
          left 50%
          margin-left -35rpx
          width 70rpx
          height 70rpx
        }
        .detail{
          position absolute
          left 0rpx
          bottom 50rpx
          width 100%
          display flex
          flex-direction column
          align-items center
          .title{
            color #9b9b9b
            font-size 30rpx
            margin-bottom 20rpx
            .bold{
              color #000
              font-weight bolder
              font-size 35rpx
            }
          }
          .btn{
            width 250rpx
            height 80rpx
            border-radius 40rpx
            center()
            font-size 30rpx
            letter-spacing 1rpx
            color #fff
            &.btn-0{
              background #f16063
            }
            &.btn-1{
              background #3acf7b
            }
          }
        }
      }
    }
  }
</style>
