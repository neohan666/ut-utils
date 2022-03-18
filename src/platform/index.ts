/**
 * @Description: 判断运行平台
 * @Author: Neo
 * @Date: 2022-03-18
 * @LastEditTime: 2022-03-18
 * @LastEditors: Neo
 */
const ua = window?.navigator.userAgent.toLowerCase() || ''

const isAndroid = (() => {
  return /Android|Adr/i.test(ua)
})()

const isIos = (() => {
  return /iPhone|iPod|iPad/i.test(ua)
})()

const isWechat = (() => {
  return /MicroMessenger/i.test(ua)
})()

const isWxmp = (() => {
  return /miniProgram/i.test(ua) || window?.__wxjs_environment === 'miniprogram'
})()

const isDingding = (() => {
  return /DingTalk/i.test(ua)
})()

export default {
  // android平台
  isAndroid,
  // ios平台
  isIos,
  // 微信生态
  isWechat,
  // 微信小程序
  isWxmp,
  // 钉钉环境
  isDingding
}
