<template>
  <div class="run-loading">
    <span>{{ loadingMsg }}</span>
  </div>
</template>
<script>
  export default {
    props: {
      state: { // 0:不可见 1:正在加载 2:全部加载完毕 3:异常
        type: Number,
        default: 0
      }
    },
    computed: {
      loadingMsg () {
        let msg = ''
        if (this.state === 1) {
          msg = '正在加载'
        } else if (this.state === 2) {
          msg = '已显示全部'
        } else if (this.state === 3) {
          msg = '加载异常 请稍后重试'
        }
        return `${msg}`
      }
    }
  }
</script>
<style scoped lang="stylus">
  .run-loading{
    width 750rpx
    font-size 26rpx
    color #666
    height 70rpx
    text-align center
    letter-spacing 1rpx
  }
</style>
