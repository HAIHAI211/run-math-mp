<template>
  <div class="tab-wrap">
    <div class="tab">
      <div :class="['tab-item', {'active': tabIndex === selfActiveTabIndex}]"
           v-for="(item,tabIndex) in items" :key="tabIndex" @click="selfActiveTabIndex = tabIndex">
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['items', 'activeTabIndex'], // 数组 长度为2
  data () {
    return {
      selfActiveTabIndex: this.activeTabIndex
    }
  },
  watch: {
    activeTabIndex (v) {
      this.selfActiveTabIndex = v
    },
    selfActiveTabIndex (v) {
      this.$emit('update:activeTabIndex', v)
    }
  }
}
</script>
<style scoped lang="stylus">
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .tab-wrap{
    background #fff
    padding-bottom 13rpx
    border-bottom 0rpx solid #DBDBDB
    .tab{
      display flex
      width 370rpx
      height 69rpx
      box-sizing border-box
      border 1px solid main-color
      border-radius 6rpx
      overflow hidden
      margin 0 auto
      .tab-item{
        flex 1 0 0
        center()
        font-size 30rpx
        color main-color
        background #fff
        &.active{
          color  #fff
          background main-color
        }
      }
    }
  }
</style>
