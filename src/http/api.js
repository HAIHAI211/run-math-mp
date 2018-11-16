import fly from './config'
import qs from 'qs'

import config from '@/config'
const host = config.host
// const appKey = config.appKey
// const appid = config.appid

/**
 * 接口模版====post
 *
 * export const test = params => {return fly.post(`${root}/xx/xx`, qs.stringify(params))};
 *
 * 接口模版====get
 *
 * export const test1 = function(){return fly.get(`${root}/api/getNewsList`)}
 *
 *
 * 用法：
 * 在 页面用引入 test
 * import {test} from '../../http/api.js'
 *
 * test(params).then(res=>{ console.log(res) })
 */

// 通用的all请求
export const all = fly.all
export const spread = fly.spread

// 通用的get请求
export const get = (params) => {
  // console.log('params', qs.stringify(params.data, {indices: false}))
  return fly.get(`${host}${params.url}`, qs.stringify(params.data, {indices: false}))
}

// 通用的post请求
export const post = (params) => {
  return fly.post(`${host}${params.url}`, params.data)
}
// 封装的登录请求，根据后台接收方式选择是否加qs.stringify
export const login = params => {
  return post({
    url: '/user/login',
    data: params
  })
}

// 签到
export const sign = params => {
  return post({
    url: '/user/sign',
    data: params
  })
}

// 解密
export const decrypt = params => {
  return post({
    url: '/user/decrypt',
    data: params
  })
}

// 排行榜
export const getRank = params => {
  return get({
    url: '/user/rank',
    data: params
  })
}

// 用户信息
export const getUserInfo = params => {
  return get({
    url: '/user/get',
    data: params
  })
}

// 获取首页礼品
export const getIndexPresent = params => {
  return get({
    url: '/common/indexPresent',
    data: params
  })
}

// 全部广告位
export const getAdvs = () => {
  return get({
    url: '/common/adv'
  })
}
