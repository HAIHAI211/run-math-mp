import * as types from './mutation-types'

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
    console.log('isWerunAuth', v)
  }
}

export default mutations
