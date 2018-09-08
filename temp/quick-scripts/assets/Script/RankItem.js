(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/RankItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9c2294ZESZNq7XsHzcMEFCx', 'RankItem', __filename);
// Script/RankItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
//
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankItem = /** @class */ (function (_super) {
    __extends(RankItem, _super);
    function RankItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rank_num = null;
        _this.nick_name = null;
        _this.score = null;
        _this.head_pic = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    RankItem.prototype.start = function () {
    };
    RankItem.prototype.setData = function (data, idx) {
        var _this = this;
        if (idx == 0) {
            this.rank_num.node.color = cc.color(245, 62, 4);
        }
        else if (idx == 1) {
            this.rank_num.node.color = cc.color(240, 148, 11);
        }
        else if (idx == 2) {
            this.rank_num.node.color = cc.color(221, 205, 25);
        }
        else {
        }
        this.rank_num.string = "No." + (idx + 1);
        this.nick_name.string = data.nickname;
        this.score.string = data.KVDataList[0]["value"];
        cc.loader.load(data.avatarUrl + "?aa=aa.jpg", function (err, texture) {
            var frame = new cc.SpriteFrame(texture);
            _this.head_pic.spriteFrame = frame;
        });
    };
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "rank_num", void 0);
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "nick_name", void 0);
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "score", void 0);
    __decorate([
        property(cc.Sprite)
    ], RankItem.prototype, "head_pic", void 0);
    RankItem = __decorate([
        ccclass
    ], RankItem);
    return RankItem;
}(cc.Component));
exports.RankItem = RankItem;

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
        //# sourceMappingURL=RankItem.js.map
        