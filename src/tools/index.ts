/**
 * @Description: 通用工具函数
 * @Author: Neo
 * @Date: 2022-03-18
 * @LastEditTime: 2022-03-18
 * @LastEditors: Neo
 */
/**
 * @description: 日期时间格式化
 * @param {Date | number | string} time js的date类型、时间戳、格式化后的日期格式
 * @param {string} format 自定义时间格式，选填，默认为'{y}-{m}-{d} {h}:{i}:{s}'，星期为{a}
 * @param {boolean} isNeedZero 是否需要自动补零，默认true
 * @return {string} 默认格式 2018-09-01 10:55:00
 */
function formatDate (time?: Date | number | string, format = '{y}-{m}-{d} {h}:{i}:{s}', isNeedZero = true): string {
  time = time || new Date()
  // eslint-disable-next-line eqeqeq
  if (+time == time) {
    time = +time
  }
  let date
  if (typeof time === 'string') {
    time = time.replace(/-/g, '/')
    date = new Date(time)
  } else if (typeof time === 'number') {
    if (('' + Math.floor(time)).length === 10) time = time * 1000
    date = new Date(time)
  } else {
    date = time
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = (formatObj as any)[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (isNeedZero) {
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
    }
    return value || 0
  })
  return timeStr
}

/**
 * @description: 日期格式转时间戳
 * @param {Date | string} date js的date类型、格式化后的日期格式 2019-05-24 14:22:17
 * @return {number} 1558678937000
 */
function getTimestamp (date?: Date | string): number {
  if (!date) {
    return +new Date()
  }
  if (typeof date === 'string') {
    date = date.replace(/-/g, '/')
  }
  return +new Date(date)
}

/**
 * @description: 判断是否是NaN
 * @param {any} val 任意数据类型的数据
 * @return {boolean}
 */
function judgeNaN (val: any): boolean {
  return typeof val === 'number' && !(val >= 0) && !(val <= 0)
}

/**
 * @description: 对象数据过滤（过滤后端无法识别的无效值：undefined, NaN, null）
 * @param {object} obj 对象数据
 * @return {object}
 */
function filterObject (obj: { [propName: string]: any; }): { [propName: string]: any; } {
  const isValid = (val: any) => {
    return val !== undefined && !judgeNaN(val) && val !== null
  }
  const newObj: any = {}
  Object.keys(obj).forEach((v) => {
    const val = obj[v]
    if (isValid(val)) {
      newObj[v] = val
    }
  })
  return newObj
}

/**
 * @description: 对象参数序列化（过滤undefined和NaN,自动encode）
 * @param {object} obj 对象参数
 * @return {string} a=1&b=2&c=3
 */
function objToUrlParams (obj: { [propName: string]: any; }): string {
  let str = ''
  Object.keys(obj).forEach((v) => {
    const val = obj[v]
    if (val !== undefined && !judgeNaN(val)) {
      str += `${encodeURIComponent(v)}=${encodeURIComponent(val)}&`
    }
  })
  return str.slice(0, -1)
}

/**
 * @description: 获取地址参数
 * @param {string} url 指定地址，默认取当前页地址
 * @return {string} { a: 1, b: 2, c: 3 }
 */
function getQueryObject (url?: string): { [propName: string]: any; } {
  url = url || window?.location.href || ''
  const questionIndex = url.lastIndexOf('?')
  const obj: { [propName: string]: any; } = {}
  if (questionIndex > 0) {
    const search = url.substring(questionIndex + 1)
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
      const name = decodeURIComponent($1)
      let val = decodeURIComponent($2)
      val = String(val)
      obj[name] = val
      return rs
    })
  }
  return obj
}

/**
 * @description: 创建唯一的字符串
 * @return {string} ojgdvbvaua40
 */
function createUniqueString (): string {
  const timestamp = +new Date() + ''
  const randomNum = (1 + Math.random()) * 65536 + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * @description: 函数防抖
 * @param {function} fn 函数
 * @param {number} t 等待时间（毫秒）
 * @return {function}
 */
function debounce (fn: any, t?: number): any {
  let timeId: any
  let delay = t || 500
  return function (this: any, ...args: any) {
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      timeId = null
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * @description: 函数节流
 * @param {function} fn 函数
 * @param {number} t 间隔时间（毫秒）
 * @return {function}
 */
function throttle (fn: any, t?: number): any {
  let timeId: any
  let firstTime = true
  let interval = t || 500
  return function (this: any, ...args: any) {
    if (firstTime) {
      fn.apply(this, args)
      firstTime = false
      return
    }
    if (timeId) {
      return
    }
    timeId = setTimeout(() => {
      clearTimeout(timeId)
      timeId = null
      fn.apply(this, args)
    }, interval)
  }
}

/**
 * @description: 获取数据类型
 * @param {any} data 数据
 * @return {string} 'array'
 */
function getDataType (data: any): string {
  const str = Object.prototype.toString.call(data)
  return (str.match(/\s(\w*)\]/) as any)[1].toLowerCase()
}

/**
 * @description: 数字千分化
 * @param {number} num 数字
 * @return {string} 10,000
 */
function toThousands (num: number): string {
  return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * @description: 字符串超出长度用...表示
 * @param {string} str 字符串
 * @param {number} maxLen 最大长度
 * @return {string}
 */
function omitText (str: string, maxLen: number): string {
  if (!str) {
    return ''
  }
  maxLen = maxLen || str.length
  if (str.length > maxLen) {
    str = str.slice(0, maxLen) + '...'
  }
  return str
}

/**
 * @description: 判断是否支持storage存储（区分无痕模式）
 * @return {boolean}
 */
function isStorageSupported (): boolean {
  const testKey = 'testIsStorageSupported'
  const storage = window.sessionStorage
  try {
    storage.setItem(testKey, 'testValue')
    storage.removeItem(testKey)
    return true
  } catch (error) {
    console.warn('storage is not supported')
    return false
  }
}

/**
 * @description: 自定义的setInterval函数（使用setTimeout代替实现，性能更好）
 * @param {function} fn 回调函数
 * @param {number} delay 延时，毫秒
 * @return {object} timer 调用timer.clear()可以清除该定时器
 */
function setMyInterval (fn: any, delay: number): { clear: () => void } {
  let timeId: any = null
  const intervalFn = () => {
    timeId = setTimeout(() => {
      intervalFn()
      fn.call(window)
    }, delay)
  }
  intervalFn()

  const timer = {
    clear: () => {
      clearTimeout(timeId)
    },
  }
  return timer
}

/**
  * @description: 数字转换小数
  * @param {number} number 原始数字
  * @param {number} numth 可选，保留几位小数，默认2
  * @param {string} type 可选，多出的小数位处理方式，(默认)floor舍弃，round四舍五入
  * @return {string} 0.00
  */
function toDecimal (number: number, saveNum = 2, type = 'floor'): string {
  number = +number || 0
  saveNum = +saveNum
  if (saveNum <= 0) {
    return (Math as any)[type](number)
  }
  const multiple = Math.pow(10, saveNum)
  const intNum = (Math as any)[type](number * multiple) / multiple
  let strNum = intNum.toString()
  let index = strNum.indexOf('.')
  if (index < 0) {
    index = strNum.length
    if (saveNum > 0) {
      strNum += '.'
    }
  }
  while (strNum.length <= index + saveNum) {
    strNum += '0'
  }
  return strNum
}

/**
 * @description: 数字存储大小格式化
 * @param {number} num 存储大小 单位：Byte
 * @param {number} digits 保留几位小数，默认2
 * @return {string} 2MB
 */
function formatStorage (num: number, digits = 2): string {
  digits = digits || 2
  if (num < 1024) {
    return num + 'B'
  }
  const si = [
    { value: Math.pow(1024, 6), symbol: 'E' },
    { value: Math.pow(1024, 5), symbol: 'P' },
    { value: Math.pow(1024, 4), symbol: 'T' },
    { value: Math.pow(1024, 3), symbol: 'G' },
    { value: Math.pow(1024, 2), symbol: 'M' },
    { value: Math.pow(1024, 1), symbol: 'K' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
        si[i].symbol + 'B'
    }
  }
  return ''
}

/**
 * @description: 版本号比较
 * @param {string} v1 第一个版本号
 * @param {string} v2 第二个版本号
 * @return {number} 1大于 0等于 -1小于
 */
function compareVersion (v1: string, v2: string): number {
  const arr1 = v1.split('.')
  const arr2 = v2.split('.')
  const len = Math.max(arr1.length, arr2.length)
  while (arr1.length < len) {
    arr1.push('0')
  }
  while (arr2.length < len) {
    arr2.push('0')
  }
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(arr1[i])
    const num2 = parseInt(arr2[i])
    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}

/**
 * @description: 手机号隐藏中间四位，用****表示
 * @param {number|string} mobile 手机号
 * @return {string}
 */
function hidePhoneNum (mobile: number | string): string {
  mobile = mobile + ''
  const arr = mobile.split('')
  arr.splice(3, 4, '****')
  return arr.join('')
}

export default {
  // 日期时间格式化
  formatDate,
  // 日期格式转时间戳
  getTimestamp,
  // 判断是否是NaN
  judgeNaN,
  // 对象数据过滤
  filterObject,
  // 对象参数序列化
  objToUrlParams,
  // 获取地址参数
  getQueryObject,
  // 创建唯一的字符串
  createUniqueString,
  // 函数防抖
  debounce,
  // 函数节流
  throttle,
  // 获取数据类型
  getDataType,
  // 数字千分化
  toThousands,
  // 字符串超出长度用...表示
  omitText,
  // 判断是否支持storage存储
  isStorageSupported,
  // 自定义的setInterval函数
  setMyInterval,
  // 数字小数位格式化
  toDecimal,
  // 数字存储大小格式化
  formatStorage,
  // 版本号比较
  compareVersion,
  // 手机号隐藏中间四位
  hidePhoneNum,
}
