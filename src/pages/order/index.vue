<template>
  <div class="order-page">
    <van-tabs :active="tag" @change="tabChange" color="#3ACF7A">
      <van-tab title="数学资料">
        <div class="gift-list math" v-if="mathGifts.length">
        </div>
        <div class="empty" v-else>暂无数据</div>
      </van-tab>
      <van-tab title="实物礼品">
        <div class="gift-list physical" v-if="mathGifts.length">
        </div>
        <div class="empty" v-else>暂无数据</div>
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
      mathGifts: [],
      physicalGifts: []
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
    .empty{
      padding-top 300rpx
      text-align center
      color #333333
      font-size 26rpx
    }
  }
</style>
