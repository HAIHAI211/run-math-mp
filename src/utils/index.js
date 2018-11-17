// 给一位数字前面加'0'
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
export async function sleep (time = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}
export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
// 微信接口promisefy化
export function pf (method, options = {}) {
  return new Promise((resolve, reject) => {
    // 将options对象赋值 然后再传给下面调用的方法中
    options.success = resolve
    options.fail = err => {
      reject(err)
    }
    wx[method](options)
  })
}
// 加载中
export const showLoading = () => {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
}
// 显示异常
export const showError = (msg) => {
  wx.showToast({
    title: msg || '网络异常，请重试',
    icon: 'none'
  })
}
