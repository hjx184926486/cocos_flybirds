import { MainScene } from "./MainScene";
import { User } from "./User";


const {ccclass, property} = cc._decorator;

@ccclass
export  class HeroItem extends cc.Component {

    @property( cc.Label)
    private name_txt:cc.Label = null;

    @property( cc.Sprite)
    private hero_img:cc.Sprite = null;

    @property( cc.Button)
    private play_btn:cc.Button = null;

    private _data:any;
    private width :number = 150;
    private height:number = 180;
    // onLoad () {} 

    start () {
        // this.init();
    }
    public setClick(callBack,ctx){
        this.node.on(cc.Node.EventType.TOUCH_START,(event:cc.Event.EventTouch)=>{
            callBack.call( ctx )
        })
    }
    itemClick(){    
        if( !this._data ){
            return
        }
        cc.director.getScene().getChildByName("Canvas").getComponent( MainScene ).startGame(this._data);
    }
    public changeSize(sizePercentage:number = 1){
        this.node.width = this.width * sizePercentage;
        this.node.height = this.height * sizePercentage;
        let childRen = this.node.children;
        childRen.forEach( (val,idx)=>{
            val.scaleX = sizePercentage;
            val.scaleY = sizePercentage;
        })
    }
    public set data(val){
        this._data = val;
        this.updateUI(val);
        
    }
    private updateUI(data) {
         if( data){
             if( data.have){
                 this.play_btn.interactable = true;
                 cc.loader.loadRes('sprite/play_item.png' ,cc.SpriteFrame,(err, spriteFrame)=> {
                   this.play_btn.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
             }else{
                this.play_btn.interactable = false;
             }
            this.name_txt.string = data.name;
            cc.loader.loadRes( data.imgUrl,cc.SpriteFrame,(err,spriteFrame)=>{
                if (err != null) {
                    console.log(err.message);
                    return;
                }
                this.hero_img.spriteFrame = spriteFrame;
            })
            
         }
    }
    // update (dt) {}
}
