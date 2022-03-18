# neo-utils
js常用工具库。

+ 支持TS

## 1、安装
```js
npm i neo-utils -S
```

## 2、使用
### (1) deepClone
数据深克隆/深拷贝
```js
import { deepClone } from 'neo-utils'

const newVal = deepClone(val)
```

### (2) clipboard
剪贴板复制
```js
import { clipboard } from 'neo-utils'

clipboard('hello')
  .then(res => {
    console.log('复制成功')
  })
  .catch(err => {
    console.log('复制失败')
  })
```

### (3) platform
运行环境判断
```js
import { platform } from 'neo-utils'

// platform API：
{
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
```

### (4) tools
js通用函数
```js
import { tools } from 'neo-utils'

// tools API：
{
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
```
