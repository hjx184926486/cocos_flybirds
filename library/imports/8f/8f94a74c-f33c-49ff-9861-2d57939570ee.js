"use strict";
cc._RF.push(module, '8f94adM8zxJ/5hhLVeTlXDu', 'Hero');
// Script/Hero.ts

Object.defineProperty(exports, "__esModule", { value: true });
var MainScene_1 = require("./MainScene");
var GameConfig_1 = require("./GameConfig");
var GameManager_1 = require("./GameManager");
var GameManager_2 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var skillOrRelife;
(function (skillOrRelife) {
    skillOrRelife[skillOrRelife["SKILL"] = 0] = "SKILL";
    skillOrRelife[skillOrRelife["RELIFE"] = 1] = "RELIFE";
})(skillOrRelife || (skillOrRelife = {}));
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.main = null;
        _this.reLifeView = null;
        _this.horSpeed = GameConfig_1.GameConfig.SPEED; //水平移动速度
        _this.downSpeed = 0; //下落速度
        return _this;
    }
    Hero.prototype.lateUpdate = function () {
        this.heroMoveHor();
        this.heroMoveVer();
        this.changeRotation();
    };
    Hero.prototype.onCollisionEnter = function (other, self) {
        if (other.tag == 1) {
            this.main.getComponent(MainScene_1.MainScene).getCoin(other.node);
        }
        else {
            // 有无技能
            if (this.birdData.skillNum > 0) {
                this.reLifeView.active = true; //用技能吗？
            }
            else {
                this.main.getComponent(MainScene_1.MainScene).gameOver();
            }
        }
    };
    //水平移动
    Hero.prototype.heroMoveHor = function () {
        if (!GameManager_1.GameManager.I.gameFlag) {
            return;
        }
        this.node.x += this.horSpeed;
    };
    // 跳跃
    Hero.prototype.jump = function () {
        this.downSpeed = 0;
        switch (GameManager_1.GameManager.I.gameType) {
            case GameManager_2.GAME_TYPE.UP:
                this.downSpeed += GameConfig_1.GameConfig.UP_G_SPEED;
                break;
            case GameManager_2.GAME_TYPE.DOWN:
                this.downSpeed -= GameConfig_1.GameConfig.UP_G_SPEED;
                break;
        }
    };
    // 下落或者上升
    Hero.prototype.heroMoveVer = function () {
        if (!GameManager_1.GameManager.I.gameFlag) {
            return;
        }
        switch (GameManager_1.GameManager.I.gameType) {
            case GameManager_2.GAME_TYPE.UP:
                this.downSpeed -= GameConfig_1.GameConfig.DOWN_G_SPEED;
                break;
            case GameManager_2.GAME_TYPE.DOWN:
                this.downSpeed += GameConfig_1.GameConfig.DOWN_G_SPEED;
                break;
        }
        this.node.y -= this.downSpeed;
        if (this.node.y <= -cc.winSize.height / 2 || this.node.y >= cc.winSize.height / 2) {
            this.main.getComponent(MainScene_1.MainScene).gameOver();
        }
    };
    Hero.prototype.reset = function () {
        this.downSpeed = 0;
        this.node.y = 0;
    };
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Hero.prototype.setBg = function (url) {
        var _this = this;
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
            _this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    };
    Hero.prototype.setData = function (val) {
        this.birdData = val;
        this.setBg(val.url);
    };
    Hero.prototype.start = function () {
    };
    Hero.prototype.changeRotation = function () {
        switch (GameManager_1.GameManager.I.gameType) {
            case GameManager_2.GAME_TYPE.DOWN:
                if (this.downSpeed < 0) {
                    this.node.rotation = 20;
                }
                else {
                    if (this.node.rotation == 0) {
                        return;
                    }
                    else {
                        this.node.rotation = 0;
                    }
                }
                break;
            case GameManager_2.GAME_TYPE.UP:
                if (this.downSpeed > 0) {
                    this.node.rotation = 20;
                }
                else {
                    if (this.node.rotation == 0) {
                        return;
                    }
                    else {
                        this.node.rotation = 0;
                    }
                }
                break;
        }
    };
    // update (dt) {}
    // // 发动技能
    // useSkill(){
    // }
    // 复活
    Hero.prototype.reLife = function (type) {
        // 按钮执行第一次
        switch (type) {
            case skillOrRelife.SKILL:
                this.birdData.skillNum--;
                this.birdData.relifeNum--;
                break;
            case skillOrRelife.RELIFE:
                this.birdData.relifeNum--;
        }
        GameManager_1.GameManager.I.gameFlag = true;
        this.reLifeView.active = false;
    };
    // 放弃复活
    Hero.prototype.loseLife = function () {
        this.main.getComponent(MainScene_1.MainScene).gameOver();
        this.reLifeView.active = false;
    };
    __decorate([
        property(cc.Node)
    ], Hero.prototype, "main", void 0);
    __decorate([
        property(cc.Node)
    ], Hero.prototype, "reLifeView", void 0);
    Hero = __decorate([
        ccclass
    ], Hero);
    return Hero;
}(cc.Component));
exports.Hero = Hero;

cc._RF.pop();