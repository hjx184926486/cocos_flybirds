
import {MainScene} from "./MainScene";
import { GameManager } from "./GameManager";
import { HeroItem } from "./HeroItem";
import { SubDomController } from "./SubDomController";
import { User } from "./User"
const {ccclass, property} = cc._decorator;

@ccclass
export  class StarView extends cc.Component {

    @property( cc.Node)
    private name_txt:cc.Node = null;

    @property( cc.ScrollView )
    private birdsScroll:cc.ScrollView = null;

    @property( cc.Sprite )
    private headPic:cc.Sprite = null;

    @property( cc.Label )
    private nick_name:cc.Label = null;

    @property( cc.Label )
    private coin_num:cc.Label = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    private horScrollFlag:boolean = false; // 移动开动
    private horScrollEaseFlag:boolean = false ;// 停止过后开关
    private scrollItemWidth:number;
    private scrollItemHeight:number;
    private bigScrollItemWidth:number;
    start () {
        this.nameAnimate();
        this.initScrollUi();
        this.initScrollEvent();
        this.setItemClick();
        this.initTopUI();
    }

    // update (dt) {}
    private nameAnimate(){
        let action =  cc.sequence( 
            cc.moveTo(1.5,cc.p(0,370)),
            cc.tintTo(1.5,255,255,255),
            cc.callFunc(()=>{
               
            })
         ) ;
        action.easing(cc.easeBounceInOut());
        this.name_txt.runAction( action )
    }
    
    private initScrollEvent(){
        this.birdsScroll.node.on('scrolling', this.horMove, this);
        this.birdsScroll.node.on('scroll-ended', this.horMoveEnd, this);
        
    }
    private initScrollUi(){
        let scrollview:cc.Node = this.birdsScroll.node;
        let content = this.birdsScroll.content;
            cc.loader.loadRes("prefab/birdsItem",cc.Prefab,(err, prefab)=>{
                if (err != null) {
                    console.log(err.message);
                    return;
                }
                User.I.userData.skinData.forEach((val,idx) => {
                    let item = cc.instantiate(prefab);
                    item.getComponent(HeroItem).data = val;
                    content.addChild( item );
                    if( idx == 0 ){
                        this.scrollItemWidth = item.width;
                        this.scrollItemHeight = item.height;
                        this.bigScrollItemWidth = item.width*1.5
                        item.getComponent(HeroItem).changeSize(1.5);
                    }
                });
            })
    }
    private horMove(){
        let scrollview:cc.Node = this.birdsScroll.node;
        let content = this.birdsScroll.content;
        let items = content.children;
        items.forEach((val,idx) => {
            let x =  val.convertToWorldSpaceAR(cc.v2()).x-this.node.parent.x;
            if( x > -this.bigScrollItemWidth && x < this.bigScrollItemWidth ){
                let rate = 1.5 - Math.abs(x)/2/this.bigScrollItemWidth;
                val.getComponent(HeroItem).changeSize(rate); 
            }else{
                val.getComponent(HeroItem).changeSize(1);
            }
        });

    }

    private horMoveEnd(){
        let scrollview:cc.Node = this.birdsScroll.node;
        let content = scrollview.getChildByName("view").getChildByName("content")
        let items = content.children;
        let arr = [];
        items.forEach((val,idx) => {
            arr.push({val,idx});
        });
        arr.sort( (item1,item2)=>{
            return item2.val.width - item1.val.width;
        } )
        let bigIdx = arr[0].idx;
        items.forEach( (val,idx)=>{
            let x  =  val.convertToWorldSpaceAR(cc.v2()).x-this.node.parent.x;
            if( idx == bigIdx ){
                let contentX = this.birdsScroll.getContentPosition()["x"];
                contentX = contentX-x;
                this.birdsScroll.setContentPosition( cc.p(contentX,0)  )
                val.getComponent(HeroItem).changeSize(1.5);
            }
            if( x > -this.bigScrollItemWidth && x < this.bigScrollItemWidth ){
                let rate = 1.5 - Math.abs(x)/2/this.bigScrollItemWidth;
                val.getComponent(HeroItem).changeSize(rate); 
            }else{
                val.getComponent(HeroItem).changeSize(1);
            }
        })
    }

    private setItemClick(){
        let scrollview:cc.Node = this.birdsScroll.node;
        let content = scrollview.getChildByName("view").getChildByName("content")
        let items = content.children;
        items.forEach( (val,idx)=>{
            val.getComponent(HeroItem).setClick( ()=>{

            },this );
        } )
    }

    private initTopUI(){
        SubDomController.getUserInfo( (res)=>{
            cc.loader.load(`${res.avatarUrl}?aa=aa.jpg` ,(err, texture)=> {
                var frame = new cc.SpriteFrame(texture);
                this.headPic.spriteFrame = frame;
            });
            this.nick_name.string = res.nickname
        })
        this.coin_num.string = ""+2000;
    }
}
