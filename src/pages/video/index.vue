<template>
  <div class="video-page">
    <txv-video :vid="videoOrder.videoVid" playerid="txv1" width="100%" height="auto" autoplay v-if="videoOrder"></txv-video>
    <div class="video-name">{{ videoOrder.name }}</div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
// import { sleep } from '@/utils'
// const txvContext = requirePlugin('tencentvideo')
export default {
  data () {
    return {
      txvContext: ''
    }
  },
  computed: {
    ...mapState(['videoOrder'])
  },
  watch: {
    async videoOrder (v) {
      // if (v) {
      //   this.txvContext = txvContext.getTxvContext('txv1')
      // }
    }
  },
  methods: {
    requestFullScreen () {
      // this.txvContext.requestFullscreen()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .video-page{
    .video-name{
      font-size 35rpx
      color #000
    }
  }
</style>
