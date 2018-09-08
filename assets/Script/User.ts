
import {MainScene} from "./MainScene";
import { GameManager } from "./GameManager";
import { HeroItem } from "./HeroItem";
import { SubDomController } from "./SubDomController";

const {ccclass, property} = cc._decorator;

@ccclass
export  class  User {

    private static _instance = null;
    private _userData:any;

    public static get I(): User {
        return this._instance || (this._instance = new User);
    }

   public setUserData( data ){

        if(  data.hasOwnProperty( "openId" )  ){
            this._userData.openId = data.openId;
        }

        if( data.hasOwnProperty("coin") ){
            this._userData.coin = data.coin;
        }
   }
   public get userData(){
        return this._userData;
   }
   public  setNowBirdData(skinData){
        // 技能次数
        for( let i = 0 ;i<this._userData.skinData.length;i++ ){
            if( this._userData.skinData[i].id == skinData.id ){
                this._userData.skinData[i] = skinData;
                break;

            }
        }
   }
//    public getNowBirdsData( id ){
//         // 获取当前出战小鸟的数据
//         for( let i = 0 ;i<this._userData.skinData.length;i++ ){
//             if( this._userData.skinData[i].id == id ){
//                 let data  = this._userData.skinData[i];
//                 return  data
//             }
//         }
//    }
}
window["User"] = User;