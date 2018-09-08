// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
//
const {ccclass, property} = cc._decorator;

@ccclass
export  class RankItem extends cc.Component {

   @property(cc.Label)
   rank_num:cc.Label = null;

   @property(cc.Label)
   nick_name:cc.Label = null;

   @property(cc.Label)
   score:cc.Label = null;

   @property(cc.Sprite)
   head_pic:cc.Sprite = null
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    setData(data,idx){
        if( idx == 0 ){
            this.rank_num.node.color = cc.color( 245,62,4 );
        }else if(idx == 1){
            this.rank_num.node.color = cc.color( 240,148,11 )
        }else if( idx == 2){
            this.rank_num.node.color = cc.color( 221,205,25 )
        }else{

        }
        this.rank_num.string = `No.${idx+1}`;
        this.nick_name.string = data.nickname;
        this.score.string =data.KVDataList[0]["value"];
        cc.loader.load(`${data.avatarUrl}?aa=aa.jpg` ,(err, texture)=> {
            var frame = new cc.SpriteFrame(texture);
            this.head_pic.spriteFrame = frame;
        });
    }
    // update (dt) {}
}
