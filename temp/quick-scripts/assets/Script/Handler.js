(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Handler.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5aac9eo8eNDuIpqa5l2iWaz', 'Handler', __filename);
// Script/Handler.ts

Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("./User");
var HttpUtil_1 = require("./Utils/HttpUtil");
var wx = window["wx"];
var Handler = /** @class */ (function () {
    function Handler() {
    }
    /**用户登录,首次运行调用 */
    Handler.login = function (feedback) {
        if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
            cc.sys.localStorage.setItem('openId', "oIBzT5BFyVZeFtpA76bycj4as7KQ");
            User_1.User.I.setUserData({ 'openId': "oIBzT5BFyVZeFtpA76bycj4as7KQ" });
            if (typeof feedback == "function") {
                feedback();
            }
            return;
        }
        wx.login({ success: function (res) {
                console.log("登录口令code:", res.code);
                HttpUtil_1.HttpUtil.post("login", { code: res.code }, function (state, res) {
                    cc.sys.localStorage.setItem('openId', res.msg.openid);
                    cc.sys.localStorage.setItem('session', res.msg.key);
                    User_1.User.I.setUserData({ 'openId': res.msg.openid });
                    if (typeof feedback == "function") {
                        feedback();
                    }
                });
            } });
    };
    return Handler;
}());
exports.Handler = Handler;

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
        //# sourceMappingURL=Handler.js.map
        