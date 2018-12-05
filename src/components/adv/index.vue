<template>
  <div class="adv-wrap" v-if="adUrl">
    <div class="adv" :style="{backgroundImage: 'url('+ adUrl +')'}"></div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  props: {
    type: {
      type: String,
      default: 'index'
    }
  },
  computed: {
    ...mapState(['advs']),
    adUrl () {
      switch (this.type) {
        case 'index':
          return this.getPicUrlById(1)
        case 'modal':
          return this.getPicUrlById(2)
        case 'gift0':
          return this.getPicUrlById(3)
        case 'gift1':
          return this.getPicUrlById(4)
        case 'gift2':
          return this.getPicUrlById(5)
        case 'gift3':
          return this.getPicUrlById(6)
        case 'me':
          return this.getPicUrlById(7)
        case 'exchange':
          return this.getPicUrlById(8)
      }
    }
  },
  methods: {
    getPicUrlById (id) {
      for (let i = 0; i < this.advs.length; i++) {
        let adv = this.advs[i]
        if (adv.id === id) {
          return adv.picUrl
        }
      }
      return ''
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .adv-wrap{
    padding-bottom main-gap
    display flex
    justify-content center
    .adv{
      border-radius 8rpx
      bg-size(main-width, 260rpx)
    }
  }
</style>
