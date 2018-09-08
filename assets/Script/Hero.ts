import {MainScene} from "./MainScene";
import { GameConfig } from "./GameConfig";
import { GameManager } from "./GameManager";
import { GAME_TYPE } from "./GameManager";
import { User } from "./User";
const {ccclass, property} = cc._decorator;

enum skillOrRelife{
    SKILL = 0,
    RELIFE = 1
}

@ccclass
export  class Hero extends cc.Component {

    @property(cc.Node)
    private main: cc.Node = null;

    @property( cc.Node )
    reLifeView:cc.Node = null;

    birdData:any;

    protected horSpeed:number = GameConfig.SPEED; //水平移动速度
    protected downSpeed:number = 0;  //下落速度

    lateUpdate(){
        this.heroMoveHor();
        this.heroMoveVer();
        this.changeRotation();
    }
    onCollisionEnter (other:any, self:any) {
        if( other.tag == 1 ){
            this.main.getComponent(MainScene).getCoin(other.node);
            
        }else{
            // 有无技能
            if( this.birdData.skillNum > 0 ){
                this.reLifeView.active = true;  //用技能吗？

            }else{
                this.main.getComponent(MainScene).gameOver(); 
            }
        }   
    }   
    //水平移动
    protected heroMoveHor(){
        if( !GameManager.I.gameFlag ){
            return;
        }
        this.node.x+=this.horSpeed;
    }
    // 跳跃
    public jump(){
        this.downSpeed = 0;
        switch(GameManager.I.gameType){
            case GAME_TYPE.UP:
                this.downSpeed+=GameConfig.UP_G_SPEED
                break
            case GAME_TYPE.DOWN:
                this.downSpeed -=GameConfig.UP_G_SPEED
                break
        }
    }
    // 下落或者上升
    protected heroMoveVer(){
        if( !GameManager.I.gameFlag  ){
            return
        }
        switch(GameManager.I.gameType){
            case GAME_TYPE.UP:
                this.downSpeed-=GameConfig.DOWN_G_SPEED
                break
            case GAME_TYPE.DOWN:
                this.downSpeed +=GameConfig.DOWN_G_SPEED
                break
        }
        this.node.y-=this.downSpeed;

        if( this.node.y <= -cc.winSize.height/2 || this.node.y >= cc.winSize.height/2 ){
            this.main.getComponent(MainScene).gameOver(); 
        }
    }

    public reset(){
        this.downSpeed = 0;
        this.node.y = 0;
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    setBg( url:string ){
        cc.loader.loadRes(url,cc.SpriteFrame,(err,spriteFrame)=>{
            this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        })
    } 

    setData(val){
        this.birdData = val
        this.setBg( val.url )
    }
    start () {

    }

    changeRotation(){
        switch(GameManager.I.gameType){
            case GAME_TYPE.DOWN:
                    if(  this.downSpeed < 0 ){
                        this.node.rotation = 20
                    }else{
                        if( this.node.rotation == 0 ){
                            return;
                        }else{
                            this.node.rotation = 0;
                        }
                    
                    }
                break
            case GAME_TYPE.UP:
                if(  this.downSpeed >0 ){
                    this.node.rotation = 20
                }else{
                    if( this.node.rotation == 0 ){
                        return;
                    }else{
                        this.node.rotation = 0;
                    }
                }
                break
        }

       

    }
    // update (dt) {}


    // // 发动技能
    // useSkill(){
        


    // }

    // 复活
    reLife(type:skillOrRelife){
        // 按钮执行第一次
        switch( type ){
            case skillOrRelife.SKILL:
                this.birdData.skillNum--;
                this.birdData.relifeNum--;
                break;
            case skillOrRelife.RELIFE:
                this.birdData.relifeNum--;
        }
        GameManager.I.gameFlag = true;
        this.reLifeView.active = false;
    }
    // 放弃复活
    loseLife(){
        this.main.getComponent(MainScene).gameOver();
        this.reLifeView.active = false;
    }
}
