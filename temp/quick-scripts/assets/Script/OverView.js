(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/OverView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4e201mRs8hP9qzwMu4lldYT', 'OverView', __filename);
// Script/OverView.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameManager_1 = require("./GameManager");
var MainScene_1 = require("./MainScene");
var RankItem_1 = require("./RankItem");
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var wx = window["wx"];
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OverView = /** @class */ (function (_super) {
    __extends(OverView, _super);
    function OverView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.coin_txt = null;
        _this.score_txt = null;
        _this.best_txt = null;
        _this.award_txt = null;
        _this.main = null;
        _this.rankList = null;
        _this.rankItem = null;
        _this.dataList = [];
        _this.itemArr = [];
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    OverView.prototype.start = function () {
    };
    OverView.prototype.setScore = function (data) {
        if (!data) {
            return;
        }
        this.coin_txt.string = data["coin"];
        this.score_txt.string = data["score"];
        this.best_txt.string = data["best_score"];
        if (data["score"] <= 100) {
            if (GameManager_1.GameManager.I.gameType == MainScene_1.GAME_TYPE.UP) {
                this.award_txt.string = " 崩溃了吧,菜鸡儿 ";
                return;
            }
            this.award_txt.string = " 你可真的是个小菜鸡呢 ";
        }
        else if (data["score"] > 100 && data["score"] <= 200) {
            this.award_txt.string = " 这波不亏 ";
        }
        else if (data["score"] > 200 && data["score"] <= 400) {
            this.award_txt.string = " 恭喜您已入门 ";
        }
        else if (data["score"] > 400 && data["score"] <= 600) {
            this.award_txt.string = " 这么棒的吗，兄弟 ";
        }
        else {
            this.award_txt.string = " 我没话说了 ";
        }
    };
    // update (dt) {}
    OverView.prototype.setRankData = function (data) {
        var _this = this;
        this.dataList = data;
        this.rankList.getChildByName("view").getChildByName("content").removeAllChildren();
        data.sort(function (a, b) {
            return +b["KVDataList"][0]["value"] - +a["KVDataList"][0]["value"];
        });
        data.forEach(function (val, idx) {
            var node = cc.instantiate(_this.rankItem);
            _this.itemArr.push(node);
            node.getComponent(RankItem_1.RankItem).setData(val, idx);
            _this.rankList.getChildByName("view").getChildByName("content").addChild(node);
            ;
        });
    };
    __decorate([
        property(cc.Label)
    ], OverView.prototype, "coin_txt", void 0);
    __decorate([
        property(cc.Label)
    ], OverView.prototype, "score_txt", void 0);
    __decorate([
        property(cc.Label)
    ], OverView.prototype, "best_txt", void 0);
    __decorate([
        property(cc.Label)
    ], OverView.prototype, "award_txt", void 0);
    __decorate([
        property(cc.Node)
    ], OverView.prototype, "main", void 0);
    __decorate([
        property(cc.Node)
    ], OverView.prototype, "rankList", void 0);
    __decorate([
        property(cc.Prefab)
    ], OverView.prototype, "rankItem", void 0);
    OverView = __decorate([
        ccclass
    ], OverView);
    return OverView;
}(cc.Component));
exports.OverView = OverView;

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
        //# sourceMappingURL=OverView.js.map
        