// import runLoading from '@/components/run-loading'
import { sleep } from '@/utils'
import * as api from '@/http/api'
import { mapActions, mapState, mapGetters } from 'vuex'
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
/**
 ** 引入mixinPullToRefresh的页面
 * 需要自定义如下data或computed
 * data
 *   apis 列表请求所对应的api名称数组
 *   initPageNum pageNum的初始页码
 *   listKeyName 返回对象的list的键名
 *   pageCount 返回对象的pageCount的键名
 * computed
 *   params 自定义的请求参数
 *  components
 *   run-loading 加载组件（mpvue存在bug）
 * */
export const mixinPullToRefresh = {
  components: {
    // runLoading
  },
  data () {
    return {
      loadingState: 0, // 0:不可见 1:正在加载 2:全部加载完毕 3:异常
      pageIndex: 0,
      apis: [],
      initPageNum: 0, // pageNum的初始页码
      listKeyName: 'data',
      pageCountKeyName: 'pageCount'
    }
  },
  computed: {
    pages () {
      let result = []
      for (let i = 0; i < this.apis.length; i++) {
        result.push({
          pageNum: this.initPageNum, // 当前页
          pageSize: 10, // 一页多少条数据
          pageCount: 10, // 一共多少页
          list: []
        })
      }
      return result
    },
    activePage () {
      return this.pages[this.pageIndex]
    },
    activeApi () {
      return this.apis[this.pageIndex]
    }
  },
  methods: {
    async fetchList (isRefresh = true) {
      if (isRefresh) {
        this.activePage.pageNum = this.initPageNum
        this.activePage.pageCount = 0
      } else {
        this.activePage.pageNum += 1
        if (this.activePage.pageNum > this.activePage.pageCount) {
          // todo 数据已经请求到了最后一页
          this.loadingState = 2
          this.activePage.pageNum -= 1
          return
        }
      }
      let params = {
        pageNum: this.activePage.pageNum,
        pageSize: this.activePage.pageSize,
        ...this.params
      }
      // 开始请求
      console.log('请求列表的参数', params)
      this.loadingState = 1
      try {
        const result = await api[this.activeApi](params)
        console.log(this.activeApi, result)
        this.activePage.list = isRefresh ? result[this.listKeyName] : [...this.activePage.list, ...result[this.listKeyName]]
        this.activePage.pageCount = result[this.pageCountKeyName]
        if (this.activePage.pageNum < this.activePage.pageCount) { // 继续加载
          this.loadingState = 0 // 0:不可见 1:正在加载 2:全部加载完毕 3:异常
        } else {
          this.loadingState = 2
        }
      } catch (e) {
        console.log(e)
        this.loadingState = 3
      }
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
export const mixinLoginWerun = {
  computed: {
    ...mapState(['authWerun', 'isLogin', 'openId', 'todayCanChangeStep'])
  },
  methods: {
    ...mapActions(['LOGIN', 'AUTH_OF_WERUN', 'REPORT_OF_WERUN', 'FETCH_USER_INFO']),
    async _getSteps () {
      await this.LOGIN() // 登录
      await this.AUTH_OF_WERUN() // 申请授权
      await this.REPORT_OF_WERUN() // 上报微信运动数据给后台，返回是否成功的标志
      await this.FETCH_USER_INFO() // 获取用户信息
      await this._getRank()
      console.log('getSteps成功')
    }
  }
}
export const mixinaddressInfoSubmit = {
  computed: {
    ...mapGetters(['addressInfo', 'addressInfoErr'])
  },
  methods: {
    async _checkErr () {
      await this.utils.sleep(300) // 避免submit早于blur事件
      if (this.addressInfoErr) {
        this.utils.showToast(this.addressInfoErr)
        return true
      }
      return false
    }
  }
}
