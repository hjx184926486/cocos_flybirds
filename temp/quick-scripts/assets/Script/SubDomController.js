(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SubDomController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'eb0866/ssBIXon9lTlNWmJ9', 'SubDomController', __filename);
// Script/SubDomController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var wx = window["wx"];
var sharedCanvas = window["sharedCanvas"];
/**
 * 子域控制器
 */
var SubDomController = /** @class */ (function (_super) {
    __extends(SubDomController, _super);
    function SubDomController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubDomController_1 = SubDomController;
    SubDomController.prototype.start = function () {
    };
    SubDomController.prototype.update = function () {
        SubDomController_1.display();
    };
    /**
     * 帧循环刷新域
     */
    SubDomController.display = function () {
        if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
            return;
        }
        var del = new Array();
        SubDomController_1.KEYS.forEach(function (value, index) {
            if (wx.getOpenDataContext().canvas[value]) {
                console.log("主域收到回复:", value, wx.getOpenDataContext().canvas[value]);
                var feedback = SubDomController_1.OBJ[value];
                if (typeof feedback == "function")
                    feedback(wx.getOpenDataContext().canvas[value]);
                del.push(value);
            }
        });
        del.forEach(function (value, index) {
            SubDomController_1.deleteArr(SubDomController_1.KEYS, value);
            SubDomController_1.OBJ[value] = undefined;
            wx.postMessage({ message: { type: 1, key: value, msg: "清除一个对象" } });
        });
    };
    /**
     * 获取用户信息
     */
    SubDomController.getUserInfo = function (feedback) {
        if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
            if (typeof feedback == "function")
                feedback({ "openId": "selfOpenId", "nickname": "安康", "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLB0tbB2zibOjGicv7ztvR2Z1jMvBOuDSnFUF1UWZNwiaibH4ibLIws61ePicATFTeDic6wkr3x5UXxKP4E4g/132", "gender": 1, "language": "zh_CN", "city": "", "province": "", "country": "中国" });
            return;
        }
        SubDomController_1.OBJ['USER_INFO'] = feedback;
        SubDomController_1.KEYS.push("USER_INFO");
        wx.postMessage({ message: { type: 3, key: "USER_INFO", msg: "获取用户信息" } });
    };
    /**
     * 获取好友信息
     * @param feedback
     */
    SubDomController.getFriendInfo = function (feedback) {
        // SubDomController.OBJ['FRIEND_STORAGE'] = feedback;
        if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
            var res = [{
                    "openid": "oIBzT5Ipt2UG9_qmqBChfElWFhyU",
                    "nickname": "Momo",
                    "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoBDWashnx1icbCrez0bWOm2rjpCQ0Pa84yITGOefKWv6Nqlt4yxZ7hz2gmrlWLb2zG0lH9maWVUicg/132",
                    "KVDataList": [{
                            "key": "score",
                            "value": "7777"
                        }]
                }, {
                    "openid": "1",
                    "nickname": "安康2",
                    "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLB0tbB2zibOjGicv7ztvR2Z1jMvBOuDSnFUF1UWZNwiaibH4ibLIws61ePicATFTeDic6wkr3x5UXxKP4E4g/132",
                    "KVDataList": [{
                            "key": "score",
                            "value": "8888"
                        }]
                }, {
                    "openid": "2",
                    "nickname": "安康3",
                    "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLB0tbB2zibOjGicv7ztvR2Z1jMvBOuDSnFUF1UWZNwiaibH4ibLIws61ePicATFTeDic6wkr3x5UXxKP4E4g/132",
                    "KVDataList": [{
                            "key": "score",
                            "value": "9999"
                        }]
                }, {
                    "openid": "oIBzT5BFyVZeFtpA76bycj4as7KQ",
                    "nickname": "安康5",
                    "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLB0tbB2zibOjGicv7ztvR2Z1jMvBOuDSnFUF1UWZNwiaibH4ibLIws61ePicATFTeDic6wkr3x5UXxKP4E4g/132",
                    "KVDataList": [{
                            "key": "score",
                            "value": "0"
                        }]
                }
            ];
            if (typeof feedback == "function")
                feedback(res);
            return;
        }
        SubDomController_1.OBJ['FRIEND_STORAGE'] = feedback;
        SubDomController_1.KEYS.push("FRIEND_STORAGE");
        wx.postMessage({ message: { type: 2, key: "score", msg: "获取好友信息" } });
    };
    /**
     * 获取用户分数
     */
    SubDomController.getUserScore = function (feedback) {
        if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
            if (typeof feedback == "function") {
                feedback([{
                        "key": "score",
                        "value": "10"
                    }
                ]);
                return;
            }
        }
        SubDomController_1.OBJ['USER_STORAGE'] = feedback;
        SubDomController_1.KEYS.push("USER_STORAGE");
        wx.postMessage({ message: { type: 1, key: "USER_STORAGE", msg: "获取用户分数" } });
    };
    /**删除数组中的一个指定值 */
    SubDomController.deleteArr = function (arr, key) {
        arr.forEach(function (value, index) {
            if (value == key) {
                arr.splice(index, 1);
                return;
            }
        });
    };
    var SubDomController_1;
    SubDomController.KEYS = [];
    SubDomController.OBJ = {};
    SubDomController = SubDomController_1 = __decorate([
        ccclass
    ], SubDomController);
    return SubDomController;
}(cc.Component));
exports.SubDomController = SubDomController;

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
        //# sourceMappingURL=SubDomController.js.map
        