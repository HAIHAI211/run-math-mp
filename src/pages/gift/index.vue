<template>
  <div class="gift-page">
    <tab :items="tabItems" :activeTabIndex.sync="activeTabIndex"/>
    <div class="content math" v-if="activeTabIndex === 0">
      <div class="bar">
        <div :class="['bar-item', {'active': barIndex===activeBarIndex}]"
             @click="pickActiveItem(item,barIndex)"
             v-for="(item,barIndex) in bar" :key="barIndex">
          <span>{{ item }}</span>
          <span class="iconfont icon-sanjiao"/>
        </div>
      </div>
      <div class="gift-list">
        <run-gift v-for="(gift, giftIndex) in activeTab.gifts" :key="giftIndex" :gift="gift"/>
      </div>
    </div>
    <div class="content physical" v-else>
      <div class="gift-list">
        <run-gift v-for="(gift, giftIndex) in activeTab.gifts" :key="giftIndex" :gift="gift"/>
      </div>
    </div>
    <runLoading :state="loadingState"/>
    <div class="overlay" v-if="activeBarIndex !== -1" @click="activeBarIndex=-1">
      <div class="wrap-0" v-if="activeBarIndex === 0" @click.stop="">
        <div
          :class="['wrap-item',
          {'active': typeIndex === activeTypeIndex}]"
          v-for="(type, typeIndex) in types"
          :key="typeIndex"
          @click="pickType(typeIndex)"
        >{{ type.name }}</div>
      </div>
      <scroll-view class="wrap-1" scroll-y :style="{height: '100%'}"v-if="activeBarIndex === 1" @click.stop="">
        <div class="wrap-item"  v-for="(cla, claIndex) in classes" :key="claIndex">
          <div class="title">{{ cla.name }}</div>
          <div class="btns-container">
            <div :class="['class-btn', {'row-end': (i+1)%3===0}, {'active': cla.valueCs[i]}]" v-for="(item,i) in cla.values" :key="i" @click="classBtnSelect(claIndex, i)">{{ item }}</div>
          </div>
        </div>
        <div class="wrap-item" :style="{paddingBottom: '160rpx'}">
          <div class="title" style="padding-bottom: 16rpx">其他</div>
          <switch-cell
            class="vsc"
            title="显示已兑换的资料"
            :checked=switchCellchecked
            @change="onSwitchCellChange"></switch-cell>
        </div>
        <div class="confirm-btn-wrap">
          <div class="confirm-btn" @click="pickSx()">确定</div>
        </div>
      </scroll-view>
      <div class="wrap-2" v-if="activeBarIndex === 2">
        <div
          :class="['wrap-item',
          {'active': sortIndex === activeSortIndex}]"
          v-for="(sort, sortIndex) in sorts"
          :key="sortIndex"
          @click="pickSort(sortIndex)"
        >{{ sort.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import tab from '@/components/tab'
import runLoading from '@/components/run-loading'
import physicalGift from '@/components/physical-gift'
import mathGift from '@/components/math-gift'
import runGift from '@/components/run-gift'
import { sleep } from '@/utils'
import { getGiftList } from '@/http/api'

export default {
  components: {
    tab,
    runLoading,
    runGift,
    physicalGift,
    mathGift
  },
  data () {
    return {
      loadingState: 0, // 0:不可见 1:正在加载 2:全部加载完毕 3:异常
      activeTabIndex: 0, // 0：数学资料 1：实物礼品
      tabItems: [
        {
          name: '数学资料',
          pageNum: 1, // 当前页
          pageSize: 10, // 一页多少条数据
          pageCount: 10, // 一共多少页
          gifts: [] // 礼物
        },
        {
          name: '实物礼品',
          pageNum: 1, // 当前页
          pageSize: 10, // 一页多少条数据
          pageCount: 10, // 一共多少页
          gifts: [] // 礼物
        }
      ],
      types: [
        {
          id: 0,
          name: '文档'
        },
        {
          id: 1,
          name: '视频'
        }
      ],
      activeTypeIndex: 0,
      sorts: [
        {
          id: 0,
          name: '价格由低到高排序'
        },
        {
          id: 1,
          name: '价格由高到低排序'
        }
      ],
      activeSortIndex: 0,
      activeBarIndex: -1, // 正在定位哪一项[类别、筛选、排序]
      switchCellchecked: false,
      classes: [
        {
          id: 0,
          name: '小学',
          tags: [0, 1, 2, 3, 4, 5],
          values: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
          valueCs: [false, false, false, false, false, false],
          groupCount: 2
        },
        {
          id: 1,
          name: '初中',
          tags: [6, 7, 8],
          values: ['初一', '初二', '初三'],
          valueCs: [false, false, false],
          groupCount: 1
        },
        {
          id: 2,
          name: '高中',
          tags: [9, 10, 11],
          values: ['高一', '高二', '高三'],
          valueCs: [false, false, false],
          groupCount: 1
        }
      ]
    }
  },
  computed: {
    activeTab () {
      return this.tabItems[this.activeTabIndex]
    },
    fitGrade () {
      let result = []
      for (let i = 0; i < this.classes.length; i++) {
        let cla = this.classes[i]
        for (let j = 0; j < cla.valueCs.length; j++) {
          let vc = cla.valueCs[j]
          if (vc) {
            result.push(cla.tags[j])
          }
        }
      }
      return result
    },
    presentType () {
      if (this.activeTabIndex === 1) { // 实物礼品
        return 2
      } else { // 数学资料中的
        if (this.activeTypeIndex === 0) { // 文档
          return 0
        } else { // 视频
          return 1
        }
      }
    },
    bar () {
      return [this.types[this.activeTypeIndex].name, '筛选', '排序']
    }
  },
  watch: {
    activeTabIndex (v) {
      this.activeBarIndex = -1
      this.loadingState = 0
      wx.showTabBar()
      if (v === 1 && !this.activeTab.gifts.length) {
        wx.startPullDownRefresh()
      }
    }
  },
  methods: {
    pickActiveItem (item, index) {
      if (this.activeBarIndex === index) {
        wx.showTabBar({
          complete: () => {
            this.activeBarIndex = -1
          }
        })
        return
      }
      if (index === 1) { // 如果是筛选下拉框，就隐藏系统的tabbar(此处代码无业务逻辑，单纯是为了样式美观一些)
        wx.hideTabBar({
          complete: () => {
            this.activeBarIndex = index
          }
        })
      } else {
        wx.showTabBar()
        this.activeBarIndex = index
      }
    },
    pickType (index) {
      this.activeTypeIndex = index
      this.activeBarIndex = -1
    },
    pickSort (index) {
      this.activeSortIndex = index
      this.activeBarIndex = -1
    },
    pickSx () {
      // todo
      wx.showTabBar({
        complete: () => {
          this.activeBarIndex = -1
        }
      })
    },
    classBtnSelect (classIndex, i) {
      console.log('classIndex', classIndex, 'i', i)
      this.classes[classIndex].valueCs[i] = !this.classes[classIndex].valueCs[i]
      this.classes = [...this.classes]
      console.log(this.classes)
    },
    onSwitchCellChange (e) {
      console.log(e.mp)
      this.switchCellchecked = e.mp.detail
    },
    async fetchGiftList (isRefresh = true) {
      if (isRefresh) {
        this.activeTab.pageNum = 1
        this.activeTab.pageCount = 0
      } else {
        this.activeTab.pageNum += 1
        if (this.activeTab.pageNum > this.activeTab.pageCount) {
          // todo 数据已经请求到了最后一页
          this.loadingState = 2
          this.activeTab.pageNum -= 1
          return
        }
      }
      let params = {
        pageNum: this.activeTab.pageNum,
        pageSize: this.activeTab.pageSize,
        presentType: this.presentType,
        fitGrade: this.fitGrade,
        hasChanged: this.switchCellchecked,
        sort: this.activeSortIndex
      }
      console.log('请求礼物列表的参数', params)
      this.loadingState = 1
      try {
        const result = await getGiftList(params)
        this.loadingState = 0
        console.log('gifts', result)
        if (isRefresh) {
          this.activeTab.gifts = result.data
        } else {
          this.activeTab.gifts = [...this.activeTab.gifts, ...result.data]
        }
        this.activeTab.pageCount = result.pageCount
      } catch (e) {
        this.loadingState = 3
      }
    }
  },
  async onPullDownRefresh () { // 下拉刷新
    console.log('下拉刷新')
    this.fetchGiftList()
    wx.stopPullDownRefresh()
  },
  async onReachBottom () { // 上拉加载
    console.log('上拉加载')
    this.fetchGiftList(false)
  },
  async mounted () {
    console.log('mounted')
    await sleep(50)
    wx.startPullDownRefresh()
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  .gift-page{
    .bar{
      height 68rpx
      display flex
      align-items center
      border-bottom 1rpx solid rgba(1,1,1,0.1)
      background #fff
      .bar-item{
        font-size 28rpx
        flex 1
        display flex
        align-items center
        justify-content center
        .iconfont{
          width 38rpx
          height 38rpx
          transition transform 0.3s
        }
        &.active{
          color main-color
          .iconfont{
            transform rotate(180deg)
          }
        }
      }
    }
    .overlay{
      overflow hidden
      position absolute
      top 150rpx
      bottom 0
      left 0
      right 0
      background rgba(0,0,0,0.7)
      .wrap-0,.wrap-2{
        background #fff
        .wrap-item{
          height 103rpx
          display flex
          align-items center
          justify-content center
          border-bottom 1rpx solid rgba(1,1,1,0.1)
          font-size 32rpx
          color #666
          &.active{
            color main-color
          }
        }
      }
      .wrap-1{
        width 100%
        height 500rpx
        box-sizing border-box
        background #fff
        .wrap-item{
          padding 0 50rpx
          .title{
            font-size 30rpx
            color #000
            font-weight 400
            padding 50rpx 0 30rpx 0
          }
          .btns-container{
            display flex
            flex-wrap wrap
            .class-btn{
              display flex
              justify-content center
              align-items center
              width 200rpx
              height 68rpx
              box-sizing border-box
              font-size 26rpx
              letter-spacing 1rpx
              color #666
              border 1rpx solid rgba(0,0,0,0.2)
              border-radius 8rpx
              margin-right 25rpx
              margin-bottom 25rpx
              &.row-end{
                margin-right 0rpx
              }
              &.active{
                color main-color
                border-color main-color
              }
            }
          }
        }
        .confirm-btn-wrap{
          position fixed
          bottom 0
          left 0
          z-index 101
          width 750rpx
          padding-bottom 13rpx
          display flex
          justify-content center
          .confirm-btn{
            background main-color
            center()
            width 685rpx
            height 97rpx
            border-radius 47rpx
            color #fff
            font-size 34rpx
            letter-spacing 1rpx
          }
        }
      }
    }
    .content{
      &.math{
      }
      &.physical{
      }
      .gift-list{
        padding 20rpx 32.5rpx 10rpx 32.5rpx
      }
    }
    /*
   修改第三方或自定义组件样式
   */
    .vsc{
      /deep/ .van-cell{
        background #fff
        padding 0
        font-size 26rpx
        color #777
      }
      /deep/ .van-switch--on{
        background main-color
      }
    }
  }
</style>
