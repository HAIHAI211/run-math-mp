<template>
  <div class="gift-page">
    <div class="tab-wrap">
      <div class="tab">
        <div :class="['tab-item', {'active': tabIndex === activeTabIndex}]"
             v-for="(item,tabIndex) in tabItems" :key="tabIndex" @click="activeTabIndex = tabIndex">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="content">
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      activeTabIndex: 0,
      tabItems: ['数学资料', '实物礼品']
    }
  },

  methods: {
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .gift-page{
    .tab-wrap{
      background #fff
      padding-bottom 13rpx
      border-bottom 2rpx solid #DBDBDB
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
  }
</style>
