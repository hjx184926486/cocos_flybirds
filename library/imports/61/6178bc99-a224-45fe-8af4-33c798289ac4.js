"use strict";
cc._RF.push(module, '6178byZoiRF/or0M8eYKJrE', 'Coin');
// Script/Coin.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Coin = /** @class */ (function (_super) {
    __extends(Coin, _super);
    function Coin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Coin.prototype.update = function () {
        this.rotate();
    };
    Coin.prototype.start = function () {
    };
    Coin.prototype.rotate = function () {
        if (!this.node) {
            return;
        }
        if (this.node.scaleX >= 1) {
            this.node.scaleX = 0;
        }
        this.node.scaleX += 0.01;
    };
    Coin = __decorate([
        ccclass
    ], Coin);
    return Coin;
}(cc.Component));
exports.Coin = Coin;

cc._RF.pop();