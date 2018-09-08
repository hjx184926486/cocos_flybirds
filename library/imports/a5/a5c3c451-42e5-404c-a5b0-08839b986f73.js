"use strict";
cc._RF.push(module, 'a5c3cRRQuVATKWwCIObmG9z', 'EnermyGroup');
// Script/EnermyGroup.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EnermyGroup = /** @class */ (function (_super) {
    __extends(EnermyGroup, _super);
    function EnermyGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.top_enermy = null;
        _this.bottom_enermy = null;
        _this.coin = null;
        return _this;
    }
    EnermyGroup.prototype.start = function () {
    };
    EnermyGroup.prototype.update = function () {
    };
    EnermyGroup.prototype.changeEnermy = function () {
        var topScaleY = this.getRandomNum();
        var boScaleY = this.node.height / 100 - topScaleY - this.getRandowHeight() / 100;
        this.top_enermy.scaleY = topScaleY;
        this.bottom_enermy.scaleY = boScaleY;
        this.top_enermy.y = this.node.height / 2 - this.top_enermy.height * topScaleY / 2;
        this.bottom_enermy.y = -this.node.height / 2 + this.bottom_enermy.height * boScaleY / 2;
        this.coin.y = this.top_enermy.y - this.top_enermy.height * topScaleY / 2 - this.getRandowHeight() / 2;
    };
    // 获得100～500中的随机数
    EnermyGroup.prototype.getRandomNum = function () {
        return Math.ceil(Math.random() * 3);
    };
    EnermyGroup.prototype.getRandowHeight = function () {
        var a = GameConfig_1.GameConfig.MIN_ENERMY_HEIGHT + Math.floor(Math.random() * 10);
        console.log("高度" + a);
        return a;
    };
    __decorate([
        property(cc.Node)
    ], EnermyGroup.prototype, "top_enermy", void 0);
    __decorate([
        property(cc.Node)
    ], EnermyGroup.prototype, "bottom_enermy", void 0);
    __decorate([
        property(cc.Node)
    ], EnermyGroup.prototype, "coin", void 0);
    EnermyGroup = __decorate([
        ccclass
    ], EnermyGroup);
    return EnermyGroup;
}(cc.Component));
exports.EnermyGroup = EnermyGroup;

cc._RF.pop();