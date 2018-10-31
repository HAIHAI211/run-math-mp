<template>
  <div class="tab-bar">
    <div v-for="(item,index) in items"
               open-type="redirect"
               :key="index"
               hover-class="none"
               :class="['bar-item',{'active': index === activeIndex}]"
               @click.stop="toPage(index === activeIndex, item.url)">{{ item.label }}</div>
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
            label: '简介',
            url: '/pages/index/main'
          },
          {
            label: '文章',
            url: '/pages/article/main'
          },
          {
            label: '留言',
            url: '/pages/msg/main'
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
    background: rgba(255,255,255,.4);
    -webkit-backdrop-filter: blur(6px);
    .bar-item{
      flex: 1;
      text-align: center;
      line-height: 45px;
      color: #999;
      font-size: 15px;
      &.active{
        color: #000;
      }
    }
  }
</style>
