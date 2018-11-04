<template>
  <div class="gift-page">
    <tab :items="tabItems" :activeTabIndex.sync="activeTabIndex"/>
    <div class="content" v-if="activeTabIndex === 0">
      数学资料
      <!--<div class="bar">-->
        <!--<div :class="['bar-item', {'active': index===activeIndex}]" @click="pickActiveItem(item,index)" v-for="(item,index) in bar">-->
          <!--<span>{{ item }}</span>-->
          <!--<span class="iconfont icon-sanjiao"/>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <div class="content" v-else>
     实物礼品
    </div>
  </div>
</template>
<script>
import tab from '@/components/tab'
export default {
  components: {
    tab
  },
  data () {
    return {
      activeTabIndex: 1,
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
