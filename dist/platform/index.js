/**
 * @Description: 判断运行平台
 * @Author: Neo
 * @Date: 2022-03-18
 * @LastEditTime: 2022-03-18
 * @LastEditors: Neo
 */
var ua = (window === null || window === void 0 ? void 0 : window.navigator.userAgent.toLowerCase()) || '';
var isAndroid = (function () {
    return /Android|Adr/i.test(ua);
})();
var isIos = (function () {
    return /iPhone|iPod|iPad/i.test(ua);
})();
var isWechat = (function () {
    return /MicroMessenger/i.test(ua);
})();
var isWxmp = (function () {
    return /miniProgram/i.test(ua) || (window === null || window === void 0 ? void 0 : window.__wxjs_environment) === 'miniprogram';
})();
var isDingding = (function () {
    return /DingTalk/i.test(ua);
})();
export default {
    // android平台
    isAndroid: isAndroid,
    // ios平台
    isIos: isIos,
    // 微信生态
    isWechat: isWechat,
    // 微信小程序
    isWxmp: isWxmp,
    // 钉钉环境
    isDingding: isDingding
};
