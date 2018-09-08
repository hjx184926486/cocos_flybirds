"use strict";
cc._RF.push(module, 'aaac55KTkJNaLmSGr31+xiE', 'StarView');
// Script/StarView.ts

Object.defineProperty(exports, "__esModule", { value: true });
var HeroItem_1 = require("./HeroItem");
var SubDomController_1 = require("./SubDomController");
var User_1 = require("./User");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StarView = /** @class */ (function (_super) {
    __extends(StarView, _super);
    function StarView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name_txt = null;
        _this.birdsScroll = null;
        _this.headPic = null;
        _this.nick_name = null;
        _this.coin_num = null;
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.horScrollFlag = false; // 移动开动
        _this.horScrollEaseFlag = false; // 停止过后开关
        return _this;
    }
    StarView.prototype.start = function () {
        this.nameAnimate();
        this.initScrollUi();
        this.initScrollEvent();
        this.setItemClick();
        this.initTopUI();
    };
    // update (dt) {}
    StarView.prototype.nameAnimate = function () {
        var action = cc.sequence(cc.moveTo(1.5, cc.p(0, 370)), cc.tintTo(1.5, 255, 255, 255), cc.callFunc(function () {
        }));
        action.easing(cc.easeBounceInOut());
        this.name_txt.runAction(action);
    };
    StarView.prototype.initScrollEvent = function () {
        this.birdsScroll.node.on('scrolling', this.horMove, this);
        this.birdsScroll.node.on('scroll-ended', this.horMoveEnd, this);
    };
    StarView.prototype.initScrollUi = function () {
        var _this = this;
        var scrollview = this.birdsScroll.node;
        var content = this.birdsScroll.content;
        cc.loader.loadRes("prefab/birdsItem", cc.Prefab, function (err, prefab) {
            if (err != null) {
                console.log(err.message);
                return;
            }
            User_1.User.I.userData.skinData.forEach(function (val, idx) {
                var item = cc.instantiate(prefab);
                item.getComponent(HeroItem_1.HeroItem).data = val;
                content.addChild(item);
                if (idx == 0) {
                    _this.scrollItemWidth = item.width;
                    _this.scrollItemHeight = item.height;
                    _this.bigScrollItemWidth = item.width * 1.5;
                    item.getComponent(HeroItem_1.HeroItem).changeSize(1.5);
                }
            });
        });
    };
    StarView.prototype.horMove = function () {
        var _this = this;
        var scrollview = this.birdsScroll.node;
        var content = this.birdsScroll.content;
        var items = content.children;
        items.forEach(function (val, idx) {
            var x = val.convertToWorldSpaceAR(cc.v2()).x - _this.node.parent.x;
            if (x > -_this.bigScrollItemWidth && x < _this.bigScrollItemWidth) {
                var rate = 1.5 - Math.abs(x) / 2 / _this.bigScrollItemWidth;
                val.getComponent(HeroItem_1.HeroItem).changeSize(rate);
            }
            else {
                val.getComponent(HeroItem_1.HeroItem).changeSize(1);
            }
        });
    };
    StarView.prototype.horMoveEnd = function () {
        var _this = this;
        var scrollview = this.birdsScroll.node;
        var content = scrollview.getChildByName("view").getChildByName("content");
        var items = content.children;
        var arr = [];
        items.forEach(function (val, idx) {
            arr.push({ val: val, idx: idx });
        });
        arr.sort(function (item1, item2) {
            return item2.val.width - item1.val.width;
        });
        var bigIdx = arr[0].idx;
        items.forEach(function (val, idx) {
            var x = val.convertToWorldSpaceAR(cc.v2()).x - _this.node.parent.x;
            if (idx == bigIdx) {
                var contentX = _this.birdsScroll.getContentPosition()["x"];
                contentX = contentX - x;
                _this.birdsScroll.setContentPosition(cc.p(contentX, 0));
                val.getComponent(HeroItem_1.HeroItem).changeSize(1.5);
            }
            if (x > -_this.bigScrollItemWidth && x < _this.bigScrollItemWidth) {
                var rate = 1.5 - Math.abs(x) / 2 / _this.bigScrollItemWidth;
                val.getComponent(HeroItem_1.HeroItem).changeSize(rate);
            }
            else {
                val.getComponent(HeroItem_1.HeroItem).changeSize(1);
            }
        });
    };
    StarView.prototype.setItemClick = function () {
        var _this = this;
        var scrollview = this.birdsScroll.node;
        var content = scrollview.getChildByName("view").getChildByName("content");
        var items = content.children;
        items.forEach(function (val, idx) {
            val.getComponent(HeroItem_1.HeroItem).setClick(function () {
            }, _this);
        });
    };
    StarView.prototype.initTopUI = function () {
        var _this = this;
        SubDomController_1.SubDomController.getUserInfo(function (res) {
            cc.loader.load(res.avatarUrl + "?aa=aa.jpg", function (err, texture) {
                var frame = new cc.SpriteFrame(texture);
                _this.headPic.spriteFrame = frame;
            });
            _this.nick_name.string = res.nickname;
        });
        this.coin_num.string = "" + 2000;
    };
    __decorate([
        property(cc.Node)
    ], StarView.prototype, "name_txt", void 0);
    __decorate([
        property(cc.ScrollView)
    ], StarView.prototype, "birdsScroll", void 0);
    __decorate([
        property(cc.Sprite)
    ], StarView.prototype, "headPic", void 0);
    __decorate([
        property(cc.Label)
    ], StarView.prototype, "nick_name", void 0);
    __decorate([
        property(cc.Label)
    ], StarView.prototype, "coin_num", void 0);
    StarView = __decorate([
        ccclass
    ], StarView);
    return StarView;
}(cc.Component));
exports.StarView = StarView;

cc._RF.pop();