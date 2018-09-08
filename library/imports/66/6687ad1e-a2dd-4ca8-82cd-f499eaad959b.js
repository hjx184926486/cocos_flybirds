"use strict";
cc._RF.push(module, '6687a0eot1MqILN9JnqrZWb', 'GameManager');
// Script/GameManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GAME_TYPE;
(function (GAME_TYPE) {
    GAME_TYPE[GAME_TYPE["DOWN"] = 0] = "DOWN";
    GAME_TYPE[GAME_TYPE["UP"] = 1] = "UP";
})(GAME_TYPE = exports.GAME_TYPE || (exports.GAME_TYPE = {}));
var GameManager = /** @class */ (function () {
    function GameManager() {
        this._gameFlag = false; //游戏开关
        this._gameType = GAME_TYPE.DOWN; // 游戏模式 重力 反重力
        this._birdCfg = [
            {
                "name": "大崽儿",
                "id": "0",
                "imgUrl": "sprite/hero/hero1",
                "coinNum": "100",
                "howGet": "默认皮肤",
                "dis": "0",
                "skill": "",
                "skillNum": ""
            },
            {
                "name": "二崽儿",
                "id": "1",
                "imgUrl": "sprite/hero/hero2",
                "coinNum": "300",
                "howGet": "400金币购买并且句跑分超过200",
                "dis": "200",
                "skill": "单句允许复活两次，每天只能用五次",
                "skillNum": "5"
            },
            {
                "name": "三崽儿",
                "id": "2",
                "imgUrl": "sprite/hero/hero3",
                "coinNum": "200",
                "howGet": "200金币购买并且单句跑分超过200",
                "dis": "200",
                "skill": "单句复活两次次，每天只能用二次",
                "skillNum": "2"
            },
            {
                "name": "四崽儿",
                "id": "4",
                "imgUrl": "sprite/hero/hero4",
                "coinNum": "100",
                "howGet": "100金币并且单句跑分超过500",
                "dis": "500",
                "skill": "单句免费复活一次,无限使用",
                "skillNum": ""
            },
            {
                "name": "五崽儿",
                "id": "5",
                "imgUrl": "sprite/hero/hero5",
                "coinNum": "200",
                "howGet": "200金币购买",
                "dis": "0",
                "skill": "吃到前10个金币翻倍",
                "skillNum": ""
            },
            {
                "name": "六崽儿",
                "id": "6",
                "imgUrl": "sprite/hero/hero6",
                "coinNum": "0",
                "howGet": "反重力模式下单句超过400分自动获得",
                "dis": "0",
                "skill": "单句复活三次，每天只能用一次",
                "skillNum": "1"
            },
            {
                "name": "七崽儿",
                "id": "7",
                "imgUrl": "sprite/hero/hero7",
                "coinNum": "0",
                "howGet": "活动获得",
                "dis": "0",
                "skill": "",
                "skillNum": ""
            }
        ];
    }
    Object.defineProperty(GameManager, "I", {
        get: function () {
            return this._instance || (this._instance = new GameManager);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "gameFlag", {
        get: function () {
            return this._gameFlag;
        },
        set: function (val) {
            this._gameFlag = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "gameType", {
        get: function () {
            return this._gameType;
        },
        set: function (val) {
            this._gameType = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "birdsData", {
        get: function () {
            return this._birdCfg;
        },
        enumerable: true,
        configurable: true
    });
    GameManager._instance = null;
    return GameManager;
}());
exports.GameManager = GameManager;

cc._RF.pop();