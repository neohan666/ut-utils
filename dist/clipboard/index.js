/**
 * @Description: 剪贴板复制
 * @Author: Neo
 * @Date: 2022-03-18
 * @LastEditTime: 2022-03-18
 * @LastEditors: Neo
 */
import Clipboard from 'clipboard';
/**
  * @param {string} text 要复制的文字
  * @return {promise} 返回promise对象
  */
export default function (text) {
    return new Promise(function (resolve, reject) {
        var element = document.createElement('div');
        var clipboard = new Clipboard(element, {
            text: function () { return text; }
        });
        clipboard.on('success', function (res) {
            clipboard.destroy();
            resolve(res);
        });
        clipboard.on('error', function (err) {
            clipboard.destroy();
            reject(err);
        });
        clipboard.onClick({ currentTarget: element });
    });
}
