import * as types from './mutation-types'

// function setStorage (key, data) {
//   wx.setStorage({
//     key: key,
//     data: data
//   })
// }

const mutations = {
  /*
  * state: 当前状态树
  * v: 提交matations时传的参数
  * */
  [types.SET_OPEN_ID] (state, v) {
    state.openId = v
  },
  [types.SET_IS_LOGIN] (state, v) {
    state.isLogin = v
  },
  [types.SET_SYSTEM_INFO] (state, v) {
    state.systemInfo = v
  },
  [types.SET_WE_RUN] (state, v) {
    state.werun = v
  },
  [types.SET_STEPS_EXCHANGED] (state, v) {
    state.todayStep = v
  },
  [types.SET_CONTINUES] (state, v) {
    state.signDayCount = v
  },
  [types.SET_USER_INFO] (state, v) {
    state.todayChangedStep = v.todayChangedStep || state.todayChangedStep
    state.mathCoin = v.mathCoin || state.mathCoin
    state.todayStealStep = v.todayStealStep || state.todayStealStep
    state.signDayCount = v.signDayCount || state.signDayCount
    state.todayStep = v.todayStep || state.todayStep
    state.openId = v.openId || state.openId
    state.nickName = v.nickName || state.nickName
    state.gender = v.gender || state.gender
    state.city = v.city || state.city
    state.province = v.province || state.province
    state.country = v.country || state.country
    state.avatarUrl = v.avatarUrl || state.avatarUrl
    state.contactsName = v.contactsName || state.contactsName
    state.telNo = v.telNo || state.telNo
    state.addressArea = v.addressArea || state.addressArea
    state.address = v.address || state.address
  },
  [types.SET_ADVS] (state, v) {
    state.advs = v
  }
}

export default mutations
