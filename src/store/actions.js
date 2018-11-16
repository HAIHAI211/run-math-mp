import * as types from './mutation-types'
import {pf} from '@/utils'
import * as api from '@/http/api'
import auths from '@/utils/auths'

async function reLogin (commit) {
  try {
    // console.log('重新登录')
    const loginResult = await pf('login') // 重新登录
    try {
      const result = await api.login({ code: loginResult.code }) // 将code发送给后台获取openid
      commit(types.SET_IS_LOGIN, true)
      commit(types.SET_OPEN_ID, result.data.openId)
    } catch (e) {
      // console.log('获取openid失败', e)
      commit(types.SET_IS_LOGIN, false)
      return Promise.reject(new Error('【self.server】登录失败'))
    }
  } catch (e) {
    // console.log('登录失败')
    commit(types.SET_IS_LOGIN, false)
    return Promise.reject(new Error('【wx.server】登录失败'))
  }
}
const actions = {
  [types.SET_SYSTEM_INFO] ({commit}) {
    wx.getSystemInfo({
      success (res) {
        commit(types.SET_SYSTEM_INFO, res)
      }
    })
  },
  async LOGIN ({commit, state}) {
    try {
      await pf('checkSession')
      if (!state.openId) { // 本地openid缓存被清
        await reLogin(commit)
      }
    } catch (e) { // session过期
      await reLogin(commit)
    }
  },
  async AUTH_OF_WERUN ({commit}) {
    const isAuthOfWerun = await auths.werun()
    commit(types.SET_WE_RUN, isAuthOfWerun)
  },
  async REPORT_OF_WERUN ({commit, state}) {
    if (state.isLogin && state.openId && state.werun) {
      console.log('【可以获取步数了哦哦哦哦】')
      const {encryptedData, iv} = await pf('getWeRunData')
      await api.decrypt({
        encryptedData,
        iv,
        openId: state.openId,
        type: 'step'
      })
      return true
    }
    // console.log('未达到步数上报条件')
    return false // 上传失败
  },
  async FETCH_USER_INFO ({commit, state}, shouldSetStep = true) {
    if (state.isLogin && state.openId) {
      const result = await api.getUserInfo({ openId: state.openId })
      result.data.shouldSetStep = shouldSetStep
      commit(types.SET_USER_INFO, result.data)
    }
  },
  async FETCH_ADVS ({commit}) {
    const result = await api.getAdvs()
    commit(types.SET_ADVS, result.data)
    return result.data
  }
}
export default actions
