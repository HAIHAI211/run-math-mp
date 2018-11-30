const state = {
  openId: '',
  isLogin: false,
  systemInfo: null,
  advs: [], // 全部广告位
  authWerun: undefined, // 微信运动权限 undefined true false
  authUserInfo: undefined, // 用户信息权限
  mathCoin: 0, // 我的数学币
  signDayCount: 0, // 连续签到天数
  allShareCount: 0, // 总邀请好友数
  todayChangedStep: 0, // 今日已兑步数
  todayStealStep: 0, // 今日已偷步数
  todayStep: 0, // 今日可兑步数
  city: '',
  gender: 1, // 1:男 2：女
  avatarUrl: '',
  nickName: '',
  addressArea: '', // 地址（区域）
  address: '', // 详细地址
  country: '', // 国家
  province: '', // 省
  contactsName: '', // 联系人姓名
  telNo: '', // 电话
  gift: null,
  videoOrder: null // 用户点击的某个videoOrder
  // needFetchUserInfo: false // 偷步数本地计算
}
export default state
