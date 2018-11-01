<template>
  <div class="tab-bar">
    <div v-for="(item,index) in items"
               open-type="redirect"
               :key="index"
               hover-class="none"
               :class="['bar-item',{'active': index === activeIndex}]"
               @click.stop="toPage(index === activeIndex, item.url)">
      <span :class="['iconfont',item.icon]"/>
      <span class="text">{{ item.label }}</span>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      activeIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        items: [
          {
            label: '首页',
            icon: 'icon-shouye1',
            url: '/pages/index/main'
          },
          {
            label: '礼品',
            icon: 'icon-lipin',
            url: '/pages/gift/main'
          },
          {
            label: '偷步数',
            icon: 'icon-xiezi',
            url: '/pages/step/main'
          },
          {
            label: '我的',
            icon: 'icon-wode',
            url: '/pages/me/main'
          }
        ]
      }
    },
    methods: {
      toPage (isCurrentPage, toUrl) {
        if (!isCurrentPage) {
          console.log('不是相同页')
          wx.redirectTo({
            url: toUrl
          })
        } else {
          console.log('是相同页')
        }
      }
    }
  }
</script>
<style scoped lang="stylus">
  .tab-bar{
    width: 100%;
    height: 100rpx;
    left: 0;
    bottom: 0;
    position: fixed;
    z-index: 1000;
    display: flex;
    background: #fff;
    -webkit-backdrop-filter: blur(6px);
    .bar-item{
      flex: 1;
      display flex
      flex-direction column
      align-items center
      justify-content center
      .text{
        color #999999
        font-size 22rpx
      }
      .iconfont{
        color #B3B3B3
        font-size 38rpx
      }
      &.active{
        .text, .iconfont{
          color: #3ACF7A
        }
      }
    }
  }
</style>
