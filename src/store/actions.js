import * as types from './mutation-types'
import {pf, formatTime} from '@/utils'
import * as api from '@/http/api'
import auths from '@/utils/auths'
const actions = {
  [types.SET_SYSTEM_INFO] ({commit}) {
    wx.getSystemInfo({
      success (res) {
        commit(types.SET_SYSTEM_INFO, res)
      }
    })
  },
  async LOGIN ({commit}) {
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
        try {
          const result = await api.login({ code: loginResult.code }) // 将code发送给后台获取openid
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
  },
  async AUTH_OF_WERUN ({commit}) {
    const isAuthOfWerun = await auths.werun()
    commit(types.SET_WE_RUN, isAuthOfWerun)
  },
  async SET_STEP_EXCHANGE ({commit, state}) {
    const {encryptedData, iv} = await pf('getWeRunData')
    console.log('从微信获取运动iv+ed信息', encryptedData, iv)
    try {
      const decryptResult = await api.decrypt({
        encryptedData,
        iv,
        openId: state.openId,
        type: 'step'
      })
      commit(types.SET_STEPS_EXCHANGED, decryptResult.data.canBeExchangedToday)
      console.log('获取剩余步数信息', decryptResult)
    } catch (e) {
      // commit(types.SET_STEPS_EXCHANGED, 0)
      console.log('获取剩余步数信息失败')
    }
  },
  async SIGN ({commit, state}) {
    const result = await api.sign({
      openId: state.openId,
      signTime: formatTime(new Date())
    })
    console.log('签到结果天数+兑换得到的数学币', result)
    if (result.code === 0) {
      commit(types.SET_CONTINUES, result.data.continuous)
    } else {
      pf('showToast', {
        icon: 'none',
        title: result.data.detailMessage
      })
    }
  }
}
export default actions
