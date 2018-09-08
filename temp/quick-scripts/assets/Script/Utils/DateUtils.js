(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Utils/DateUtils.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '16559w2TMZOxq76hf0q8CkT', 'DateUtils', __filename);
// Script/Utils/DateUtils.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DateUtils = /** @class */ (function () {
    function DateUtils() {
    }
    // 格式话时间戳 yyyy-mm-dd
    DateUtils.formatDate = function (date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    };
    // 获取当前时间
    DateUtils.nowDate = function () {
        DateUtils.formatDate(new Date().getTime());
    };
    return DateUtils;
}());
exports.DateUtils = DateUtils;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=DateUtils.js.map
        