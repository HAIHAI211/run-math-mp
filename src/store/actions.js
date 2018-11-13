import * as types from './mutation-types'
import {pf} from '@/utils'
import {login} from '@/http/api'
const actions = {
  [types.SET_SYSTEM_INFO] ({commit}) {
    wx.getSystemInfo({
      success (res) {
        commit(types.SET_SYSTEM_INFO, res)
      }
    })
  },
  async login ({commit}) {
    console.log('开始登录')
    try {
      const checkSessionResult = await pf('checkSession')
      console.log('session没过期', checkSessionResult)
      commit(types.SET_IS_LOGIN, true)
    } catch (e) {
      console.log('session过期', e)
      try {
        console.log('重新登录')
        const loginResult = await pf('login') // 重新登录
        console.log('loginResult', loginResult.code)
        try {
          const result = await login({ code: loginResult.code }) // 将code发送给后台获取openid
          console.log('获取openid', result.data.openId)
          if (result.data.status === 0) {
            commit(types.SET_IS_LOGIN, true)
            commit(types.SET_OPEN_ID, result.data.openId)
          } else {
            console.log('登录失败')
            commit(types.SET_IS_LOGIN, false)
          }
        } catch (e) {
          console.log('获取openid失败', e)
          commit(types.SET_IS_LOGIN, false)
        }
      } catch (e) {
        console.log('登录失败')
        commit(types.SET_IS_LOGIN, false)
      }
    }
  }
}
export default actions
