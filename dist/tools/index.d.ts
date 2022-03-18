/**
 * @Description: 通用工具函数
 * @Author: Neo
 * @Date: 2022-03-18
 * @LastEditTime: 2022-03-18
 * @LastEditors: Neo
 */
interface ObjectType {
    [propName: string]: any;
}
/**
 * @description: 日期时间格式化
 * @param {Date | number | string} time js的date类型、时间戳、格式化后的日期格式
 * @param {string} format 自定义时间格式，选填，默认为'{y}-{m}-{d} {h}:{i}:{s}'，星期为{a}
 * @param {boolean} isNeedZero 是否需要自动补零，默认true
 * @return {string} 默认格式 2018-09-01 10:55:00
 */
declare function formatDate(time?: Date | number | string, format?: string, isNeedZero?: boolean): string;
/**
 * @description: 日期格式转时间戳
 * @param {Date | string} date js的date类型、格式化后的日期格式 2019-05-24 14:22:17
 * @return {number} 1558678937000
 */
declare function getTimestamp(date?: Date | string): number;
/**
 * @description: 判断是否是NaN
 * @param {any} val 任意数据类型的数据
 * @return {boolean}
 */
declare function judgeNaN(val: any): boolean;
/**
 * @description: 对象数据过滤（过滤后端无法识别的无效值：undefined, NaN, null）
 * @param {object} obj 对象数据
 * @return {object}
 */
declare function filterObject(obj: ObjectType): ObjectType;
/**
 * @description: 对象参数序列化（过滤undefined和NaN,自动encode）
 * @param {object} obj 对象参数
 * @return {string} a=1&b=2&c=3
 */
declare function objToUrlParams(obj: ObjectType): string;
/**
 * @description: 获取地址参数
 * @param {string} url 指定地址，默认取当前页地址
 * @return {string} { a: 1, b: 2, c: 3 }
 */
declare function getQueryObject(url?: string): ObjectType;
/**
 * @description: 创建唯一的字符串
 * @return {string} ojgdvbvaua40
 */
declare function createUniqueString(): string;
/**
 * @description: 函数防抖
 * @param {function} fn 函数
 * @param {number} t 等待时间（毫秒）
 * @return {function}
 */
declare function debounce(fn: any, t?: number): any;
/**
 * @description: 函数节流
 * @param {function} fn 函数
 * @param {number} t 间隔时间（毫秒）
 * @return {function}
 */
declare function throttle(fn: any, t?: number): any;
/**
 * @description: 获取数据类型
 * @param {any} data 数据
 * @return {string} 'array'
 */
declare function getDataType(data: any): string;
/**
 * @description: 数字千分化
 * @param {number} num 数字
 * @return {string} 10,000
 */
declare function toThousands(num: number): string;
/**
 * @description: 字符串超出长度用...表示
 * @param {string} str 字符串
 * @param {number} maxLen 最大长度
 * @return {string}
 */
declare function omitText(str: string, maxLen: number): string;
/**
 * @description: 判断是否支持storage存储（区分无痕模式）
 * @return {boolean}
 */
declare function isStorageSupported(): boolean;
/**
 * @description: 自定义的setInterval函数（使用setTimeout代替实现，性能更好）
 * @param {function} fn 回调函数
 * @param {number} delay 延时，毫秒
 * @return {object} timer 调用timer.clear()可以清除该定时器
 */
declare function setMyInterval(fn: any, delay: number): {
    clear: () => void;
};
/**
  * @description: 数字转换小数
  * @param {number} number 原始数字
  * @param {number} numth 可选，保留几位小数，默认2
  * @param {string} type 可选，多出的小数位处理方式，(默认)floor舍弃，round四舍五入
  * @return {string} 0.00
  */
declare function toDecimal(number: number, saveNum?: number, type?: string): string;
/**
 * @description: 数字存储大小格式化
 * @param {number} num 存储大小 单位：Byte
 * @param {number} digits 保留几位小数，默认2
 * @return {string} 2MB
 */
declare function formatStorage(num: number, digits?: number): string;
/**
 * @description: 版本号比较
 * @param {string} v1 第一个版本号
 * @param {string} v2 第二个版本号
 * @return {number} 1大于 0等于 -1小于
 */
declare function compareVersion(v1: string, v2: string): number;
/**
 * @description: 手机号隐藏中间四位，用****表示
 * @param {number|string} mobile 手机号
 * @return {string}
 */
declare function hidePhoneNum(mobile: number | string): string;
declare const _default: {
    formatDate: typeof formatDate;
    getTimestamp: typeof getTimestamp;
    judgeNaN: typeof judgeNaN;
    filterObject: typeof filterObject;
    objToUrlParams: typeof objToUrlParams;
    getQueryObject: typeof getQueryObject;
    createUniqueString: typeof createUniqueString;
    debounce: typeof debounce;
    throttle: typeof throttle;
    getDataType: typeof getDataType;
    toThousands: typeof toThousands;
    omitText: typeof omitText;
    isStorageSupported: typeof isStorageSupported;
    setMyInterval: typeof setMyInterval;
    toDecimal: typeof toDecimal;
    formatStorage: typeof formatStorage;
    compareVersion: typeof compareVersion;
    hidePhoneNum: typeof hidePhoneNum;
};
export default _default;
