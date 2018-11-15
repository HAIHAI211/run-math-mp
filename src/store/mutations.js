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
    state.todayChangedStep = v.todayChangedStep
    state.mathCoin = v.mathCoin
    state.todayStealStep = v.todayStealStep
    state.signDayCount = v.signDayCount
    if (v.shouldSetStep) {
      state.todayStep = v.todayStep
    }
  }
}

export default mutations
