import Vue from 'vue'
import App from './App'
import store from './store'
import * as utils from './utils'
import '@/common/style/iconfont.css'
Vue.prototype.$store = store
Vue.prototype.utils = utils
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)
app.$mount()
