<template>
  <div class="page">
    <h2>由于小程序限制，如需发至电脑或下载，请复制后使用浏览器访问</h2>
    <h3>{{fileUrl}}</h3>
    <button type="primary" style="width:600rpx;" @click="_copy">复制链接</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fileUrl: ''
    }
  },
  methods: {
    async _copy () {
      await this.utils.copy(this.file)
      this.utils.showToast('复制成功')
    }
  },
  onLoad (options) {
    this.fileUrl = options.fileUrl
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .page{
    height:100%;
    display flex
    flex-direction column
    align-items center
    h2{
      font-size 40rpx
      color #000
      margin-top 200rpx
      margin-bottom 50rpx
      text-align center
      padding 0 30rpx
    }
    h3{
      font-size 35rpx
      color #ccc
      margin-bottom 300rpx
    }
  }
</style>
