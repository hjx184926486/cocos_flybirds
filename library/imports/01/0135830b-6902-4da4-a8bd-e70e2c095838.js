"use strict";
cc._RF.push(module, '01358MLaQJNpKi95w4sCVg4', 'HeroItem');
// Script/HeroItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var MainScene_1 = require("./MainScene");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HeroItem = /** @class */ (function (_super) {
    __extends(HeroItem, _super);
    function HeroItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name_txt = null;
        _this.hero_img = null;
        _this.play_btn = null;
        _this.width = 150;
        _this.height = 180;
        return _this;
        // update (dt) {}
    }
    // onLoad () {} 
    HeroItem.prototype.start = function () {
        // this.init();
    };
    HeroItem.prototype.setClick = function (callBack, ctx) {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            callBack.call(ctx);
        });
    };
    HeroItem.prototype.itemClick = function () {
        if (!this._data) {
            return;
        }
        cc.director.getScene().getChildByName("Canvas").getComponent(MainScene_1.MainScene).startGame(this._data);
    };
    HeroItem.prototype.changeSize = function (sizePercentage) {
        if (sizePercentage === void 0) { sizePercentage = 1; }
        this.node.width = this.width * sizePercentage;
        this.node.height = this.height * sizePercentage;
        var childRen = this.node.children;
        childRen.forEach(function (val, idx) {
            val.scaleX = sizePercentage;
            val.scaleY = sizePercentage;
        });
    };
    Object.defineProperty(HeroItem.prototype, "data", {
        set: function (val) {
            this._data = val;
            this.updateUI(val);
        },
        enumerable: true,
        configurable: true
    });
    HeroItem.prototype.updateUI = function (data) {
        var _this = this;
        if (data) {
            if (data.have) {
                this.play_btn.interactable = true;
                cc.loader.loadRes('sprite/play_item.png', cc.SpriteFrame, function (err, spriteFrame) {
                    _this.play_btn.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
            }
            else {
                this.play_btn.interactable = false;
            }
            this.name_txt.string = data.name;
            cc.loader.loadRes(data.imgUrl, cc.SpriteFrame, function (err, spriteFrame) {
                if (err != null) {
                    console.log(err.message);
                    return;
                }
                _this.hero_img.spriteFrame = spriteFrame;
            });
        }
    };
    __decorate([
        property(cc.Label)
    ], HeroItem.prototype, "name_txt", void 0);
    __decorate([
        property(cc.Sprite)
    ], HeroItem.prototype, "hero_img", void 0);
    __decorate([
        property(cc.Button)
    ], HeroItem.prototype, "play_btn", void 0);
    HeroItem = __decorate([
        ccclass
    ], HeroItem);
    return HeroItem;
}(cc.Component));
exports.HeroItem = HeroItem;

cc._RF.pop();