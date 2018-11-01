<template>
  <div class="index-page">

    <!--<web-view src="https://mp.weixin.qq.com/"></web-view>-->
    <!--<official-account @load='officialLoad' @error="officialError"></official-account>-->
    <!--<a href="/pages/animationtest/main">去往动画页面</a>-->
    <!--<scroll-view class="scroll-view" scroll-x style="width: 100%">-->
      <!--<div class="scroll-view-item-wrap">-->
        <!--<div class="scroll-view-item" v-for="(item,itemIndex) in 10" :key="itemIndex"></div>-->
      <!--</div>-->
    <!--</scroll-view>-->
    <!--<button @click="openSetting">打开设置页</button>-->
    <!--<button open-type="getUserInfo" @getuserinfo="getuserinfo">登录</button>-->
    <!--<div class="userinfo" @click="bindViewTap">-->
      <!--<img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />-->
      <!--<div class="userinfo-nickname">-->
        <!--<card :text="userInfo.nickName"></card>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="usermotto">-->
      <!--<div class="user-motto">-->
        <!--<card :text="motto"></card>-->
      <!--</div>-->
    <!--</div>-->

    <!--<form class="form-container">-->
      <!--<input type="text" class="form-control" v-model="motto" placeholder="v-model" />-->
      <!--<input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />-->
    <!--</form>-->
    <!--<a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>-->
    <van-popup
      :show="show"
      z-index="10"
      :close-on-click-overlay="true"
      :overlay="true"
      @close="onClose"
      custom-style="top:500rpx;"
      duration="300"
    >
      <div class="wrap">
        <div class="title">
          登录需要获得您的授权
        </div>
        <button open-type="getUserInfo" @getuserinfo="getuserinfo">同意</button>
        <div class="btn" @click="refuse">拒绝</div>
      </div>
    </van-popup>
    <tab-bar/>
  </div>
</template>

<script>
import tabBar from '@/components/tab-bar'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      show: false
    }
  },

  components: {
    tabBar
  },
  methods: {
    officialLoad (e) {
      console.log('e', e.mp.detail)
    },
    officialError (e) {
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    getuserinfo (e) {
      console.log(e.mp.detail)
    },
    openSetting () {
      wx.openSetting({
        success (res) {
          console.log(res.authSetting)
          // res.authSetting = {
          //   "scope.userInfo": true,
          //   "scope.userLocation": true
          // }
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    wx.checkSession({ // 判断是否登录
      success () {
        console.log('已登录')
        // session_key 未过期，并且在本生命周期一直有效
      },
      fail () {
        console.log('未登录')
        // session_key 已经失效，需要重新执行登录流程
        wx.login() // 重新登录
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  }
}
</script>

<style scoped lang="stylus">
  .index-page{
    .scroll-view{
      .scroll-view-item-wrap{
        display flex
        .scroll-view-item{
          flex 0 0 auto
          width 200rpx
          height 200rpx
          background lightseagreen
          margin-left 40rpx
          border-radius 8rpx
        }
      }
    }
  }
</style>
