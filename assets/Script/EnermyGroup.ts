
import {GameConfig}  from './GameConfig';
const {ccclass, property} = cc._decorator;

@ccclass
export  class EnermyGroup extends cc.Component {

    @property(cc.Node)
    private top_enermy:cc.Node = null;

    @property(cc.Node)
    private bottom_enermy:cc.Node = null;

    @property(cc.Node)
    private coin:cc.Node = null;

    start () {

    }
    update(){
        
    }
    public changeEnermy(){
        let topScaleY = this.getRandomNum();
        let boScaleY= this.node.height/100 - topScaleY -this.getRandowHeight()/100;
        
        this.top_enermy.scaleY = topScaleY;
        this.bottom_enermy.scaleY = boScaleY;
        this.top_enermy.y = this.node.height/2 - this.top_enermy.height * topScaleY /2;
        this.bottom_enermy.y = -this.node.height/2 + this.bottom_enermy.height *  boScaleY/2;
        this.coin.y = this.top_enermy.y - this.top_enermy.height * topScaleY /2 - this.getRandowHeight()/2;
    }
    // 获得100～500中的随机数
    private getRandomNum(){
        return Math.ceil(Math.random()*3);
    }
    
    private getRandowHeight():number{
        let a = GameConfig.MIN_ENERMY_HEIGHT + Math.floor(  Math.random()*10 )
        console.log( "高度"+a  )
        return  a;
    }
}
