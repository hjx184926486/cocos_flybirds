import { GameManager } from "./GameManager";


const {ccclass, property} = cc._decorator;

@ccclass
export  class CameraCtl extends cc.Component {

    @property(cc.Node)
    private target:cc.Node = null;

    // LIFE-CYCLE CALLBACKS:


    
    onLoad () {
        //this.node.position = this.target.position;
        
    }
    start (){
        this.node.position = this.target.position;
    }
    lateUpdate(){
        if( !GameManager.I.gameFlag ){
            return;
        }
        this.node.x = this.target.x;
        this.node.y = 0;
    }
    // start () {

    // }

    // update (dt) {}
}
