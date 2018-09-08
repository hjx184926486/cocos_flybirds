
import {GameConfig}  from './GameConfig';

export enum GAME_TYPE{
    DOWN=0,
    UP = 1
}
export class GameManager {
    
    private _gameFlag:Boolean = false;       //游戏开关
    private _gameType:GAME_TYPE = GAME_TYPE.DOWN;  // 游戏模式 重力 反重力
    private _birdCfg = [
        {
        "name":"大崽儿",
        "id":"0",
        "imgUrl":"sprite/hero/hero1",
        "coinNum":"100",
        "howGet":"默认皮肤",
        "dis":"0",
        "skill":"",
        "skillNum":""
        },
        {
        "name":"二崽儿",
        "id":"1",
        "imgUrl":"sprite/hero/hero2",
        "coinNum":"300",
        "howGet":"400金币购买并且句跑分超过200",
        "dis":"200",
        "skill":"单句允许复活两次，每天只能用五次",
        "skillNum":"5"
        },
        {
        "name":"三崽儿",
        "id":"2",
        "imgUrl":"sprite/hero/hero3",
        "coinNum":"200",
        "howGet":"200金币购买并且单句跑分超过200",
        "dis":"200",
        "skill":"单句复活两次次，每天只能用二次",
        "skillNum":"2"
        },
        {
        "name":"四崽儿",
        "id":"4",
        "imgUrl":"sprite/hero/hero4",
        "coinNum":"100",
        "howGet":"100金币并且单句跑分超过500",
        "dis":"500",
        "skill":"单句免费复活一次,无限使用",
        "skillNum":""
        },
        {
        "name":"五崽儿",
        "id":"5",
        "imgUrl":"sprite/hero/hero5",
        "coinNum":"200",
        "howGet":"200金币购买",
        "dis":"0",
        "skill":"吃到前10个金币翻倍",
        "skillNum":""
        },
        {
        "name":"六崽儿",
        "id":"6",
        "imgUrl":"sprite/hero/hero6",
        "coinNum":"0",
        "howGet":"反重力模式下单句超过400分自动获得",
        "dis":"0",
        "skill":"单句复活三次，每天只能用一次",
        "skillNum":"1"
        },
        {
        "name":"七崽儿",
        "id":"7",
        "imgUrl":"sprite/hero/hero7",
        "coinNum":"0",
        "howGet":"活动获得",
        "dis":"0",
        "skill":"",
        "skillNum":""
        }]
    private static _instance = null;
   

    public static get I(): GameManager {
        return this._instance || (this._instance = new GameManager);
    }

    public set gameFlag(val:Boolean){
        this._gameFlag = val;
    }
    public get gameFlag(){
        return this._gameFlag
    }

    public set gameType(val:GAME_TYPE){
        this._gameType = val;
    }

    public get gameType(){
        return this._gameType;
    }

    public get birdsData(){
        return this._birdCfg;
    }
}
