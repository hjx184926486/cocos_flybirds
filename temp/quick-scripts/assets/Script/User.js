(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/User.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd9e55wnDW1LMo7hHnbG790Y', 'User', __filename);
// Script/User.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var User = /** @class */ (function () {
    function User() {
    }
    User_1 = User;
    Object.defineProperty(User, "I", {
        get: function () {
            return this._instance || (this._instance = new User_1);
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.setUserData = function (data) {
        if (data.hasOwnProperty("openId")) {
            this._userData.openId = data.openId;
        }
        if (data.hasOwnProperty("coin")) {
            this._userData.coin = data.coin;
        }
    };
    Object.defineProperty(User.prototype, "userData", {
        get: function () {
            return this._userData;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.setNowBirdData = function (skinData) {
        // 技能次数
        for (var i = 0; i < this._userData.skinData.length; i++) {
            if (this._userData.skinData[i].id == skinData.id) {
                this._userData.skinData[i] = skinData;
                break;
            }
        }
    };
    var User_1;
    User._instance = null;
    User = User_1 = __decorate([
        ccclass
    ], User);
    return User;
}());
exports.User = User;
window["User"] = User;

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
        //# sourceMappingURL=User.js.map
        