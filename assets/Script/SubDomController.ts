const {ccclass, property} = cc._decorator;

const wx = window["wx"];
const sharedCanvas = window["sharedCanvas"]
/**
 * 子域控制器
 */

 
@ccclass
export  class SubDomController extends cc.Component {
    
    start(){


    }
    update(){
        SubDomController.display();
    }
    public static KEYS = [];

    public static OBJ:object = {};

    /**
     * 帧循环刷新域
     */
    public static display():void{
        if(cc.sys.platform !== cc.sys.WECHAT_GAME){return;}

        let del:Array<string> = new Array();

        SubDomController.KEYS.forEach((value, index) => {
            if(wx.getOpenDataContext().canvas[value]){
                console.log("主域收到回复:",value,wx.getOpenDataContext().canvas[value])
                let feedback = SubDomController.OBJ[value];
                if(typeof feedback == "function")
                feedback(wx.getOpenDataContext().canvas[value])
                del.push(value)
            }
        });

        del.forEach((value, index) => {
            SubDomController.deleteArr(SubDomController.KEYS,value);
            SubDomController.OBJ[value] = undefined;
            wx.postMessage({message: {type:1,key:value,msg:"清除一个对象"}})
        });
      
    }

    /**
     * 获取用户信息
     */
    public static getUserInfo(feedback){
        if(cc.sys.platform !== cc.sys.WECHAT_GAME){
            if(typeof feedback == "function")
            feedback({"openId":"selfOpenId","nickname":"安康","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLB0tbB2zibOjGicv7ztvR2Z1jMvBOuDSnFUF1UWZNwiaibH4ibLIws61ePicATFTeDic6wkr3x5UXxKP4E4g/132","gender":1,"language":"zh_CN","city":"","province":"","country":"中国"});
            return ;
        }
        SubDomController.OBJ['USER_INFO'] = feedback;
        SubDomController.KEYS.push("USER_INFO");
        wx.postMessage({message: {type:3,key:"USER_INFO",msg:"获取用户信息"}})
    }

    /**
     * 获取好友信息
     * @param feedback 
     */
    public static getFriendInfo(feedback){
        // SubDomController.OBJ['FRIEND_STORAGE'] = feedback;
        if(cc.sys.platform !== cc.sys.WECHAT_GAME){
            let res = [{
                    "openid": "oIBzT5Ipt2UG9_qmqBChfElWFhyU",
                    "nickname": "Momo",
                    "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoBDWashnx1icbCrez0bWOm2rjpCQ0Pa84yITGOefKWv6Nqlt4yxZ7hz2gmrlWLb2zG0lH9maWVUicg/132",
                    "KVDataList": [{
                        "key": "score",
                        "value": "7777"
                    }]
                },{
                    "openid": "1",
                    "nickname": "安康2",
                    "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLB0tbB2zibOjGicv7ztvR2Z1jMvBOuDSnFUF1UWZNwiaibH4ibLIws61ePicATFTeDic6wkr3x5UXxKP4E4g/132",
                    "KVDataList": [{
                        "key": "score",
                        "value": "8888"
                    }]
                },{
                    "openid": "2",
                    "nickname": "安康3",
                    "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLB0tbB2zibOjGicv7ztvR2Z1jMvBOuDSnFUF1UWZNwiaibH4ibLIws61ePicATFTeDic6wkr3x5UXxKP4E4g/132",
                    "KVDataList": [{
                        "key": "score",
                        "value": "9999"
                    }]
                },{
                    "openid": "oIBzT5BFyVZeFtpA76bycj4as7KQ",
                    "nickname": "安康5",
                    "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLB0tbB2zibOjGicv7ztvR2Z1jMvBOuDSnFUF1UWZNwiaibH4ibLIws61ePicATFTeDic6wkr3x5UXxKP4E4g/132",
                    "KVDataList": [{
                        "key": "score",
                        "value": "0"
                    }]
                }
            ];
            if(typeof feedback == "function")
            feedback(res);
            return;
        }
        SubDomController.OBJ['FRIEND_STORAGE'] = feedback;
        SubDomController.KEYS.push("FRIEND_STORAGE");
        wx.postMessage({message: {type:2,key:"score",msg:"获取好友信息"}})
    }
    /**
     * 获取用户分数
     */
    public static getUserScore(feedback){
        if(cc.sys.platform !== cc.sys.WECHAT_GAME){
            if(typeof feedback == "function"){
                feedback(
                    [{
                        "key": "score",
                        "value": "10"
                    }
                 ]);
                return;
            }
        }
        
        SubDomController.OBJ['USER_STORAGE'] = feedback;
        SubDomController.KEYS.push("USER_STORAGE");
        wx.postMessage({message: {type:1,key:"USER_STORAGE",msg:"获取用户分数"}})
    }
    /**删除数组中的一个指定值 */
    private static deleteArr(arr:Array<string>,key:string){
        arr.forEach((value, index) => {
            if (value == key) {
                arr.splice(index, 1);
                return ;
            }
        });
    }

}
