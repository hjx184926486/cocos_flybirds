"use strict";
cc._RF.push(module, '63164kOW3VDW6qNuEupJbIY', 'MainScene');
// Script/MainScene.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OverView_1 = require("./OverView");
var SubDomController_1 = require("./SubDomController");
var GameManager_1 = require("./GameManager");
var EnermyGroup_1 = require("./EnermyGroup");
var Hero_1 = require("./Hero");
var User_1 = require("./User");
var wx = window["wx"];
var GAME_TYPE;
(function (GAME_TYPE) {
    GAME_TYPE[GAME_TYPE["DOWN"] = 0] = "DOWN";
    GAME_TYPE[GAME_TYPE["UP"] = 1] = "UP";
})(GAME_TYPE = exports.GAME_TYPE || (exports.GAME_TYPE = {}));
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enermy_team = null;
        _this.hero = null;
        _this.enermy_group = null;
        _this.scoreTxt = null;
        _this.coinTxt = null;
        _this.pause_view = null;
        _this.start_view = null;
        _this.game_view = null;
        _this.over_view = null;
        _this.bg1 = null;
        _this.bg2 = null;
        _this.score = 0;
        _this.coinNum = 0;
        _this.bestScore = 0;
        _this.enermyArr = [];
        _this.count = 0;
        return _this;
    }
    MainScene.prototype.onLoad = function () {
        this.initEvent();
        this.initConfig();
        this.shareRightTop();
    };
    MainScene.prototype.update = function (dt) {
        this.count++;
        if (this.count == 150) {
            this.count = 0;
            this.createEnermy(this.hero.x);
            this.addScore();
        }
        this.creatBg();
    };
    MainScene.prototype.start = function () {
        this.initCollision();
        // init logic9
        User_1.User.I.setUserData({
            "openId": "",
            "coin": "",
            "skinData": [
                {
                    "name": "大崽儿",
                    "id": "0",
                    "imgUrl": "sprite/hero/hero1",
                    "coinNum": "100",
                    "howGet": "默认皮肤",
                    "dis": "0",
                    "skill": "",
                    "relifeNum": 0,
                    "skillNum": "",
                    "have": false
                },
                {
                    "name": "二崽儿",
                    "id": "1",
                    "imgUrl": "sprite/hero/hero2",
                    "coinNum": "300",
                    "howGet": "400金币购买并且句跑分超过200",
                    "dis": "200",
                    "skill": "单句允许复活两次，每天只能用五次",
                    "relifeNum": 2,
                    "skillNum": "5",
                    "have": true
                },
                {
                    "name": "三崽儿",
                    "id": "2",
                    "imgUrl": "sprite/hero/hero3",
                    "coinNum": "200",
                    "howGet": "200金币购买并且单句跑分超过200",
                    "dis": "200",
                    "skill": "单句复活两次，每天只能用二次",
                    "relifeNum": 2,
                    "skillNum": "2",
                    "have": true
                },
                {
                    "name": "四崽儿",
                    "id": "4",
                    "imgUrl": "sprite/hero/hero4",
                    "coinNum": "100",
                    "howGet": "100金币并且单句跑分超过500",
                    "dis": "500",
                    "skill": "单句免费复活一次,无限使用",
                    "relifeNum": 1,
                    "skillNum": "",
                    "have": true
                },
                {
                    "name": "五崽儿",
                    "id": "5",
                    "imgUrl": "sprite/hero/hero5",
                    "coinNum": "200",
                    "howGet": "200金币购买",
                    "dis": "0",
                    "skill": "吃到前10个金币翻倍",
                    "relifeNum": 0,
                    "skillNum": "",
                    "have": true
                },
                {
                    "name": "六崽儿",
                    "id": "6",
                    "imgUrl": "sprite/hero/hero6",
                    "coinNum": "0",
                    "howGet": "反重力模式下单句超过400分自动获得",
                    "dis": "0",
                    "skill": "单句复活三次，每天只能用一次",
                    "relifeNum": 3,
                    "skillNum": "1",
                    "have": true
                },
                {
                    "name": "七崽儿",
                    "id": "7",
                    "imgUrl": "sprite/hero/hero7",
                    "coinNum": "0",
                    "howGet": "活动获得",
                    "dis": "0",
                    "skill": "",
                    "skillNum": "",
                    "relifeNum": 0,
                    "have": true
                }
            ]
        });
    };
    // 开启碰撞检测
    MainScene.prototype.initCollision = function () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = false;
    };
    MainScene.prototype.initEvent = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            _this.hero.getComponent(Hero_1.Hero).jump();
        });
    };
    MainScene.prototype.initConfig = function () {
        this.windowSize = cc.view.getVisibleSize();
    };
    // 随机生成障碍物加金币
    MainScene.prototype.createEnermy = function (x) {
        if (!GameManager_1.GameManager.I.gameFlag) {
            return;
        }
        var enermy_group = cc.instantiate(this.enermy_group);
        enermy_group.x = x + 800;
        enermy_group.y = 0;
        enermy_group.getComponent(EnermyGroup_1.EnermyGroup).changeEnermy();
        this.enermy_team.addChild(enermy_group);
        this.enermyArr.push(enermy_group);
        if (this.enermyArr.length > 5) {
            this.enermyArr.shift().destroy();
        }
    };
    // 创建图片
    MainScene.prototype.creatBg = function () {
        if (!GameManager_1.GameManager.I.gameFlag) {
            return;
        }
        if (this.hero.x % 1280 == 0 && this.hero.x > 0) {
            var i = this.hero.x / 1280;
            if (i % 2 == 0) {
                this.bg2.x = (i + 1) * 1280;
                console.log("第2个背景位移");
            }
            else {
                this.bg1.x = (i + 1) * 1280;
                console.log("第一个背景位移 " + "  ");
            }
        }
    };
    // 获得100～500中的随机数
    MainScene.prototype.getRandomNum = function () {
        return Math.ceil(Math.random() * 5);
    };
    // 增加成绩
    MainScene.prototype.addScore = function () {
        if (!GameManager_1.GameManager.I.gameFlag)
            return;
        this.score += 10;
        this.scoreTxt.string = "\u8DDD\u79BB:" + this.score;
    };
    // 游戏结束
    MainScene.prototype.gameOver = function () {
        var _this = this;
        GameManager_1.GameManager.I.gameFlag = false;
        SubDomController_1.SubDomController.getUserScore(function (res) {
            var scoreBest;
            var allCoin;
            res.forEach(function (val, idx) {
                if (val["key"] == "score") {
                    scoreBest = val["value"];
                }
            });
            // if( !scoreBest || this.score > scoreBest ){
            //     //cc.sys.localStorage.setItem("BEST_SCORE", this.score)
            //     scoreBest = this.score;
            //     wx.setUserCloudStorage({
            //         KVDataList: [{ key: "score", value: "" + scoreBest }],
            //         success: res => { console.log("设置开放成功", res); },
            //         fail: res => { console.error("设置开放域失败", res) },
            //         complete: res => { }
            //     })
            // }
            SubDomController_1.SubDomController.getFriendInfo(function (res) {
                _this.over_view.getComponent(OverView_1.OverView).setRankData(res);
                _this.over_view.getComponent(OverView_1.OverView).setScore({ coin: _this.coinNum, score: _this.score, best_score: scoreBest });
                _this.over_view.active = true;
                _this.game_view.active = false;
                _this.resetGame();
                _this.pauseBgMusic();
            });
        });
    };
    // 根据分数去调整速度
    MainScene.prototype.addSpead = function () {
        if (this.score % 20 == 0) {
            //this.nowSpeed += GameConfig.ADD_SPEED;
        }
    };
    //开始游戏
    MainScene.prototype.startGame = function (data) {
        this.hero.getComponent(Hero_1.Hero).setData(data);
        GameManager_1.GameManager.I.gameFlag = true;
        this.playBgMusic();
        this.start_view.active = false;
        this.game_view.active = true;
    };
    //继续游戏
    MainScene.prototype.continueGame = function () {
        GameManager_1.GameManager.I.gameFlag = true;
        this.playBgMusic();
        this.pause_view.active = false;
    };
    //重新开始游戏
    MainScene.prototype.againGame = function () {
        this.over_view.active = false;
        this.game_view.active = true;
        this.playBgMusic();
        GameManager_1.GameManager.I.gameFlag = true;
    };
    //暂停游戏
    MainScene.prototype.pauseGame = function () {
        GameManager_1.GameManager.I.gameFlag = false;
        this.pauseBgMusic();
        this.pause_view.active = true;
    };
    MainScene.prototype.setSpriteBg = function (node, resUrl) {
        cc.loader.loadRes(resUrl, cc.SpriteFrame, function (err, spriteFrame) {
            if (err != null) {
                console.log(err.message);
                return;
            }
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    };
    //播放背景音乐
    MainScene.prototype.playBgMusic = function () {
        this.node.getComponent(cc.AudioSource).play();
    };
    // 关闭背景音乐
    MainScene.prototype.pauseBgMusic = function () {
        this.node.getComponent(cc.AudioSource).pause();
    };
    MainScene.prototype.changeVolume = function (x) {
        this.node.getComponent(cc.AudioSource).volume = x || 0.5;
    };
    // 吃到金币
    MainScene.prototype.getCoin = function (node) {
        this.coinNum++;
        this.coinTxt.string = "\u91D1\u5E01:" + this.coinNum;
        node.destroy();
    };
    MainScene.prototype.setGameType = function (e, data) {
        switch (+data) {
            case GAME_TYPE.UP:
                GameManager_1.GameManager.I.gameType = GAME_TYPE.UP;
                break;
            case GAME_TYPE.DOWN:
                GameManager_1.GameManager.I.gameType = GAME_TYPE.DOWN;
        }
    };
    // 重置游戏
    MainScene.prototype.resetGame = function () {
        this.score = 0;
        this.coinNum = 0;
        this.scoreTxt.string = "\u5206\u6570:" + this.score + "\u5206";
        this.enermy_team.children.forEach(function (val) {
            val.destroy();
        });
        this.hero.getComponent(Hero_1.Hero).reset();
    };
    // 返回主界面
    MainScene.prototype.backStartView = function () {
        this.over_view.active = false;
        this.start_view.active = true;
    };
    MainScene.prototype.shareLife = function () {
        wx.shareAppMessage({
            title: '体验过飞的感觉吗',
            imageUrl: "http://oss.againfly.com/game/share_battle.png",
            query: "type=relay"
        });
    };
    MainScene.prototype.shareRightTop = function () {
        if (cc.sys.platform !== cc.sys.WECHAT_GAME)
            return;
        wx.showShareMenu();
    };
    __decorate([
        property(cc.Node)
    ], MainScene.prototype, "enermy_team", void 0);
    __decorate([
        property(cc.Node)
    ], MainScene.prototype, "hero", void 0);
    __decorate([
        property(cc.Prefab)
    ], MainScene.prototype, "enermy_group", void 0);
    __decorate([
        property(cc.Label)
    ], MainScene.prototype, "scoreTxt", void 0);
    __decorate([
        property(cc.Label)
    ], MainScene.prototype, "coinTxt", void 0);
    __decorate([
        property(cc.Node)
    ], MainScene.prototype, "pause_view", void 0);
    __decorate([
        property(cc.Node)
    ], MainScene.prototype, "start_view", void 0);
    __decorate([
        property(cc.Node)
    ], MainScene.prototype, "game_view", void 0);
    __decorate([
        property(cc.Node)
    ], MainScene.prototype, "over_view", void 0);
    __decorate([
        property(cc.Node)
    ], MainScene.prototype, "bg1", void 0);
    __decorate([
        property(cc.Node)
    ], MainScene.prototype, "bg2", void 0);
    MainScene = __decorate([
        ccclass
    ], MainScene);
    return MainScene;
}(cc.Component));
exports.MainScene = MainScene;

cc._RF.pop();