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
export function formatTime (date, showHour = true) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return showHour ? `${t1} ${t2}` : t1
}
export function formatHour (date) {
  const hour = date.getHours()
  const minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(':')
}

export function timeGapFromNow (date1, date2 = new Date(), todayDetail = true) {
  let timeGap = date2.getTime() - date1.getTime()
  let m1 = timeGap % (24 * 3600 * 1000)
  let m2 = m1 % (3600 * 1000)
  let days = Math.floor(timeGap / (24 * 3600 * 1000))
  let hours = Math.floor(m1 / (3600 * 1000))
  let minutes = Math.floor(m2 / (60 * 1000))
  if (days === 0) {
    return todayDetail ? (hours === 0 ? `${minutes}分钟前` : `${hours}小时前`) : '今天'
  } else if (days === 1) {
    return '昨天'
  } else if (days === 2) {
    return '前天'
  } else if (days < 30) {
    return `${days}天前`
  } else if (days < 60) {
    return '一个月前'
  } else {
    return formatTime(date1)
  }
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

// 显示toat
export const showToast = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'none'
  })
}

// 显示异常
export const showError = (msg) => {
  wx.showToast({
    title: msg || '网络异常，请重试',
    icon: 'none'
  })
}
