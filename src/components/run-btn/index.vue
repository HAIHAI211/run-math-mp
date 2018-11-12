<template>
  <div class="run-btn">
    <span>{{ title }}</span>
    <button class="wx-btn" :open-type="openType"></button>
  </div>
</template>
<script>
export default {
  props: {
    openType: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .run-btn{
    position relative
    center()
    .wx-btn{
      position absolute
      width 100%
      height 100%
      opacity 0
    }
  }
</style>
