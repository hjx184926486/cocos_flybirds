const {ccclass, property} = cc._decorator;

import {GameConfig}  from './GameConfig';
import {OverView}  from './OverView';
import { SubDomController } from './SubDomController';
import { GameManager } from './GameManager';
import { EnermyGroup } from './EnermyGroup';
import { Hero } from './Hero';
import { User } from "./User"
const wx = window["wx"];
export enum GAME_TYPE{
    DOWN=0,
    UP = 1
}

@ccclass
export  class MainScene extends cc.Component {
    @property(cc.Node)
    private enermy_team:cc.Node = null

    @property(cc.Node)
    public hero:cc.Node = null

    @property( cc.Prefab )
    private enermy_group:cc.Prefab = null;

    @property(cc.Label)
    private scoreTxt:cc.Label = null;

    @property(cc.Label)
    private coinTxt:cc.Label = null;

    @property( cc.Node)
    private pause_view:cc.Node = null;

    @property(cc.Node)
    private start_view:cc.Node = null;

    @property(cc.Node)
    private game_view:cc.Node = null;

    @property(cc.Node)
    private over_view:cc.Node = null;

    @property( cc.Node)
    private bg1:cc.Node = null;

    @property( cc.Node)
    private bg2:cc.Node = null;

    private heroFirstY:number;  //英雄初始y坐标
    private windowSize:any;

    private score :number = 0;
    private coinNum :number = 0;
    private bestScore:number = 0;
    private enermyArr:Array<cc.Node> = [];
    onLoad(){
        this.initEvent();
        this.initConfig();
        this.shareRightTop();
        
    }

    count:number  = 0;

    update(dt){
        
        this.count++;
        if(this.count == 150){
            this.count  = 0;
            this.createEnermy(this.hero.x);
            this.addScore();
        } 
        this.creatBg();
    }

    start () {
        this.initCollision();
        // init logic9
       User.I.setUserData({
        "openId":"",
        "coin":"",
        "skinData":[
            {
            "name":"大崽儿",
            "id":"0",
            "imgUrl":"sprite/hero/hero1",
            "coinNum":"100",
            "howGet":"默认皮肤",
            "dis":"0",
            "skill":"",
            "relifeNum":0,
            "skillNum":"",
            "have":false
            },
            {
            "name":"二崽儿",
            "id":"1",
            "imgUrl":"sprite/hero/hero2",
            "coinNum":"300",
            "howGet":"400金币购买并且句跑分超过200",
            "dis":"200",
            "skill":"单句允许复活两次，每天只能用五次",
            "relifeNum":2,
            "skillNum":"5",
            "have":true
            },
            {
            "name":"三崽儿",
            "id":"2",
            "imgUrl":"sprite/hero/hero3",
            "coinNum":"200",
            "howGet":"200金币购买并且单句跑分超过200",
            "dis":"200",
            "skill":"单句复活两次，每天只能用二次",
            "relifeNum":2,
            "skillNum":"2",
            "have":true
            },
            {
            "name":"四崽儿",
            "id":"4",
            "imgUrl":"sprite/hero/hero4",
            "coinNum":"100",
            "howGet":"100金币并且单句跑分超过500",
            "dis":"500",
            "skill":"单句免费复活一次,无限使用",
            "relifeNum":1,
            "skillNum":"",
            "have":true
            },
            {
            "name":"五崽儿",
            "id":"5",
            "imgUrl":"sprite/hero/hero5",
            "coinNum":"200",
            "howGet":"200金币购买",
            "dis":"0",
            "skill":"吃到前10个金币翻倍",
            "relifeNum":0,
            "skillNum":"",
            "have":true
            },
            {
            "name":"六崽儿",
            "id":"6",
            "imgUrl":"sprite/hero/hero6",
            "coinNum":"0",
            "howGet":"反重力模式下单句超过400分自动获得",
            "dis":"0",
            "skill":"单句复活三次，每天只能用一次",
            "relifeNum":3,
            "skillNum":"1",
            "have":true
            },
            {
            "name":"七崽儿",
            "id":"7",
            "imgUrl":"sprite/hero/hero7",
            "coinNum":"0",
            "howGet":"活动获得",
            "dis":"0",
            "skill":"",
            "skillNum":"",
            "relifeNum":0,
            "have":true
            }]
        })

        
    }
    // 开启碰撞检测
    private initCollision(){
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = false;
        
    }
    private initEvent(){
        this.node.on(cc.Node.EventType.TOUCH_START,(event:cc.Event.EventTouch)=>{
            this.hero.getComponent(Hero).jump();
        })
    }
  
    private initConfig(){
        this.windowSize = cc.view.getVisibleSize();
    }
   
    // 随机生成障碍物加金币
    private createEnermy(x){
        if( !GameManager.I.gameFlag  ){
            return
        }
        let enermy_group:cc.Node = cc.instantiate( this.enermy_group);
        enermy_group.x = x+800;
        enermy_group.y = 0;  
        enermy_group.getComponent(EnermyGroup).changeEnermy();
        this.enermy_team.addChild( enermy_group );
        this.enermyArr.push(enermy_group);
        if( this.enermyArr.length > 5 ){
            this.enermyArr.shift().destroy();
        }
    }

    // 创建图片
    private creatBg(){
        if( !GameManager.I.gameFlag  ){
            return
        }
        if(  this.hero.x % 1280 == 0 && this.hero.x > 0 ){
            
            let i = this.hero.x / 1280
            if( i % 2 == 0  ){
                this.bg2.x = (i+1)  * 1280
                console.log( "第2个背景位移" )
            }else{
                this.bg1.x = (i+1) * 1280
                console.log( "第一个背景位移 "+"  " )
            }
        }
    }

    // 获得100～500中的随机数
    private getRandomNum(){
        return Math.ceil(Math.random()*5);
    }
    // 增加成绩
    private addScore(){
        if( !GameManager.I.gameFlag  )
            return

        this.score += 10;

        this.scoreTxt.string = `距离:${this.score }`;
    }
    // 游戏结束
    public gameOver(){
        GameManager.I.gameFlag = false;
        SubDomController.getUserScore( (res)=>{
            let scoreBest;
            let allCoin;
            res.forEach( (val,idx)=>{
                if( val["key"] == "score" ){
                    scoreBest = val["value"]
                }
            } )
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
            
            SubDomController.getFriendInfo( (res)=>{
                this.over_view.getComponent(OverView).setRankData(res);
                this.over_view.getComponent(OverView).setScore({coin:this.coinNum,score:this.score,best_score:scoreBest});
                this.over_view.active = true;
                this.game_view.active = false;
                this.resetGame();
                this.pauseBgMusic();

            })
        } )
        
        
    }
    // 根据分数去调整速度
    private addSpead(){
        if(  this.score % 20 == 0 ){
            //this.nowSpeed += GameConfig.ADD_SPEED;
        }
        
    }
    //开始游戏
    public startGame(data){
        this.hero.getComponent(Hero).setData(data);

        GameManager.I.gameFlag = true;
        this.playBgMusic();
        this.start_view.active = false;
        this.game_view.active = true;
    }
    //继续游戏
    public continueGame(){
        GameManager.I.gameFlag = true;
        this.playBgMusic();
        this.pause_view.active = false;
    }
    //重新开始游戏
    private againGame(){
        this.over_view.active = false;
        this.game_view.active = true;
        this.playBgMusic();
        GameManager.I.gameFlag = true; 
    }
    //暂停游戏
    private pauseGame(){
        GameManager.I.gameFlag = false;
        this.pauseBgMusic();
        this.pause_view.active = true;
    }    
    private setSpriteBg( node:cc.Node,resUrl ){
        cc.loader.loadRes( resUrl,cc.SpriteFrame,(err,spriteFrame)=>{
            if (err != null) {
                console.log(err.message);
                return;
            }
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame
        })


    }
    //播放背景音乐
    private playBgMusic(){
        this.node.getComponent(cc.AudioSource).play();
    }
    // 关闭背景音乐
    private pauseBgMusic(){
        this.node.getComponent(cc.AudioSource).pause();
    }
    private changeVolume(x){
        this.node.getComponent(cc.AudioSource).volume = x || 0.5;
    }
    // 吃到金币
    public getCoin(node){
        this.coinNum++;
        this.coinTxt.string = `金币:${this.coinNum}`
        node.destroy();
    }
    private setGameType(e,data){
        switch( +data ){
            case GAME_TYPE.UP:
                GameManager.I.gameType = GAME_TYPE.UP
                break;
            case GAME_TYPE.DOWN:
                GameManager.I.gameType = GAME_TYPE.DOWN
        }
    }
    // 重置游戏
    private resetGame(){
        this.score = 0;
        this.coinNum = 0;
        this.scoreTxt.string = `分数:${this.score}分`;
        this.enermy_team.children.forEach( (val)=>{
            val.destroy();
        })
        this.hero.getComponent(Hero).reset();
    }
    // 返回主界面
    private backStartView(){
        this.over_view.active = false;
        this.start_view.active = true;
    }
    shareLife(){
        wx.shareAppMessage({
            title: '体验过飞的感觉吗',
            imageUrl:"http://oss.againfly.com/game/share_battle.png",
            query:"type=relay"
        })
    }
    shareRightTop(){
        if(cc.sys.platform !== cc.sys.WECHAT_GAME) return;
        wx.showShareMenu() 
    }
}
