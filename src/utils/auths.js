import {pf} from '@/utils'
/**
 * 授权--微信运动步数 wx.getWeRunData
 * @param  {[type]} authHandler [description]
 * @return {[type]}             [description]
 */
export default {
  async werun () {
    const scopeName = 'scope.werun'
    try {
      const getSettingRes = await pf('getSetting')
      if (!getSettingRes.authSetting[scopeName]) {
        try {
          await pf('authorize', {scope: scopeName})
          console.log('申请授权werun，然后用户同意')
          return true
        } catch (e) {
          console.log('申请授权werun，但是用户拒绝了')
          return false
        }
      }
      console.log('已经授权werun')
      return true
    } catch (e) {
      console.log('获取setting失败', e)
      return false
    }
  }
}

// function openSettingWerun (authHandler) {
//   wx.getSetting({
//     success: (res) => {
//       console.log('5')
//       if (!res.authSetting['scope.werun']) {
//         wx.showModal({
//           title: '',
//           content: '请先完成授权！在设置页面中勾选“微信运动步数”选项，否则部分功能将受限。',
//           showCancel: true,
//           confirmText: '前去设置',
//           confirmColor: '#3ACF7A',
//           success (res) {
//             if (res.confirm) {
//               console.log('6')
//               wx.openSetting({
//                 success: (res) => {
//                   console.log('7')
//                   res.authSetting = {
//                     'scope.werun': true
//                   }
//                 },
//                 fail (res) {
//                   console.log('8')
//                   // openSettingWerun(authHandler)
//                 }
//               })
//             }
//             if (res.cancel) {
//               console.log('9')
//               authHandler && authHandler.fail()
//               // 注释上一行，启用下面这一行，就是强制用户授权
//               // openSetting_werun(authHandler); //强制授权
//             }
//             if (!res.confirm && !res.cancel) {
//               openSettingWerun(authHandler)
//             }
//           }
//         })
//       } else {
//         console.log('10')
//         // werun(authHandler)
//       }
//     }
//   })
// }
