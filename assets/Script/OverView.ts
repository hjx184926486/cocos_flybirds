import { GameConfig } from "./GameConfig";
import { GameManager } from "./GameManager"
import { GAME_TYPE, MainScene } from "./MainScene"
import { SubDomController } from "./SubDomController";
import { RankItem } from "./RankItem";
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const wx = window["wx"];
const {ccclass, property} = cc._decorator;

@ccclass
export  class OverView extends cc.Component {

    @property(cc.Label)
    private coin_txt:cc.Label = null;

    @property(cc.Label)
    private score_txt:cc.Label = null;

    @property(cc.Label)
    private best_txt:cc.Label = null;

    @property(cc.Label)
    private award_txt:cc.Label = null;

    @property(cc.Node)
    main:cc.Node =  null;

    @property(cc.Node)
    rankList:cc.Node = null;

    @property(cc.Prefab)
    rankItem:cc.Prefab = null;

    dataList = [];
    itemArr = [];
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    public setScore(data){
        if( !data ){
            return
        }
        this.coin_txt.string = data["coin"]
        this.score_txt.string = data["score"]
        this.best_txt.string = data["best_score"]
        if( data["score"] <=100  ){
            
            if( GameManager.I.gameType == GAME_TYPE.UP  ){
                this.award_txt.string = " 崩溃了吧,菜鸡儿 ";
                return;
            }
            this.award_txt.string = " 你可真的是个小菜鸡呢 ";
        }else if( data["score"] >100  && data["score"] <= 200 ){
            this.award_txt.string = " 这波不亏 "
        }else if( data["score"] >200  && data["score"] <= 400 ){
            this.award_txt.string = " 恭喜您已入门 "
        }else if( data["score"] >400  && data["score"] <=600  ){
            this.award_txt.string = " 这么棒的吗，兄弟 "
        }else{
            this.award_txt.string = " 我没话说了 "
        }
    }
    // update (dt) {}
    
    public setRankData(data){
        this.dataList = data;
        this.rankList.getChildByName("view").getChildByName("content").removeAllChildren();
        data.sort( (a,b)=>{
            return +b["KVDataList"][0]["value"] - +a["KVDataList"][0]["value"];
        })
        data.forEach((val,idx) => {
            let node = cc.instantiate( this.rankItem );
            this.itemArr.push( node );
            node.getComponent(RankItem).setData(val,idx)
            this.rankList.getChildByName("view").getChildByName("content").addChild(node);;
        });
    }
    
}
