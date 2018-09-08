
import {MainScene} from "./MainScene";
const {ccclass, property} = cc._decorator;

@ccclass
export  class Coin extends cc.Component {
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    update(){
        this.rotate();
    }
    start () {

    }
    private rotate(){
       if(  !this.node){
           return;
       }
       if( this.node.scaleX >=1){
        this.node.scaleX =0;
       }
       this.node.scaleX += 0.01;
    }
    // update (dt) {}
}
