"use strict";
cc._RF.push(module, 'ba357WPnvNBZ7+2v91dk919', 'CameraCtl');
// Script/CameraCtl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CameraCtl = /** @class */ (function (_super) {
    __extends(CameraCtl, _super);
    function CameraCtl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.target = null;
        return _this;
        // start () {
        // }
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    CameraCtl.prototype.onLoad = function () {
        //this.node.position = this.target.position;
    };
    CameraCtl.prototype.start = function () {
        this.node.position = this.target.position;
    };
    CameraCtl.prototype.lateUpdate = function () {
        if (!GameManager_1.GameManager.I.gameFlag) {
            return;
        }
        this.node.x = this.target.x;
        this.node.y = 0;
    };
    __decorate([
        property(cc.Node)
    ], CameraCtl.prototype, "target", void 0);
    CameraCtl = __decorate([
        ccclass
    ], CameraCtl);
    return CameraCtl;
}(cc.Component));
exports.CameraCtl = CameraCtl;

cc._RF.pop();