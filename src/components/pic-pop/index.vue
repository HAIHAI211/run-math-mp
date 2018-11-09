<template>
  <div class="pic-pop" v-if="selfPopShow">
    <div class="overlay" @touchmove.stop="" @click="clickOverlay"></div>
    <!--<div class="content" v-if="selfPopShow">-->
      <!--<div class="pic-wrap">-->
        <!--<image :src="url" class="pic"/>-->
        <!--<image src="/static/img/delete@2x.png" class="close-btn" @click="clickOverlay"/>-->
      <!--</div>-->
    <!--</div>-->
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
    }
  },
  data () {
    return {
      selfPopShow: this.popShow
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
    clickOverlay () {
      console.log('点击了overlay')
      this.selfPopShow = false
    }
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
      .close-btn{
        width 70rpx
        height 70rpx
      }
      .pic-wrap{
        .pic{
          width 476rpx
          height 648rpx
        }
      }
    }
  }
</style>
