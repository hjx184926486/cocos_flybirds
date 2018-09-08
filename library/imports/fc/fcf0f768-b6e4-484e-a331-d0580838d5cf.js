"use strict";
cc._RF.push(module, 'fcf0fdotuRITqMx0FgIONXP', 'HttpUtil');
// Script/Utils/HttpUtil.ts

Object.defineProperty(exports, "__esModule", { value: true });
var HttpUtil = /** @class */ (function () {
    function HttpUtil() {
    }
    HttpUtil.get = function (url, params, callback) {
        var dataStr = '';
        Object.keys(params).forEach(function (key) {
            dataStr += key + '=' + params[key] + '&';
        });
        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
        url = HttpUtil.URL + url;
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var response = xhr.responseText;
                if (xhr.status >= 200 && xhr.status < 300) {
                    var httpStatus = xhr.statusText;
                    callback(true, JSON.parse(response));
                }
                else {
                    callback(false, response);
                }
            }
        };
        xhr.send();
    };
    //Post请求
    HttpUtil.post = function (url, param, callback) {
        if (param === void 0) { param = {}; }
        url = HttpUtil.URL + url;
        var xhr = cc.loader.getXMLHttpRequest();
        var dataStr = '';
        Object.keys(param).forEach(function (key) {
            dataStr += key + '=' + param[key] + '&';
        });
        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var response = xhr.responseText;
                if (xhr.status >= 200 && xhr.status < 300) {
                    var httpStatus = xhr.statusText;
                    callback(true, JSON.parse(response));
                }
                else {
                    callback(false, response);
                }
            }
        };
        xhr.send(dataStr);
    };
    HttpUtil.URL = "https://zk.againfly.com/emoji/jx/bird/";
    return HttpUtil;
}());
exports.HttpUtil = HttpUtil;

cc._RF.pop();