import { sleep } from '@/utils'
import runLoading from '@/components/run-loading'
export const mixinShow = {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selfShow: this.show
    }
  },
  watch: {
    show (v) {
      this.selfShow = v
    },
    selfShow (v) {
      this.$emit('update:show', v)
    }
  }
}

export const mixinPullToRefresh = {
  components: {
    runLoading
  },
  data () {
    return {
      loadingState: 0, // 0:不可见 1:正在加载 2:全部加载完毕 3:异常
      pageIndex: 0
    }
  },
  computed: {
    pages () {
      let result = []
      for (let i = 0; i < this.pageSum; i++) {
        result.push({
          pageNum: 1, // 当前页
          pageSize: 10, // 一页多少条数据
          pageCount: 10, // 一共多少页
          list: []
        })
      }
      return result
    },
    activePage () {
      return this.pages[this.pageIndex]
    }
  },
  async onPullDownRefresh () { // 下拉刷新
    console.log('下拉刷新')
    await this.fetchList()
    wx.stopPullDownRefresh()
  },
  async onReachBottom () { // 上拉加载
    console.log('上拉加载')
    await this.fetchList(false)
  },
  async mounted () {
    await sleep(50)
    wx.startPullDownRefresh()
  }
}
