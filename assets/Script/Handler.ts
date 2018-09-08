import { User } from "./User";
import { HttpUtil } from "./Utils/HttpUtil";

const wx  = window["wx"];
export class Handler{


     /**用户登录,首次运行调用 */
     public static login(feedback):void{
       
        if(cc.sys.platform !== cc.sys.WECHAT_GAME){
            cc.sys.localStorage.setItem('openId', "oIBzT5BFyVZeFtpA76bycj4as7KQ");
            User.I.setUserData({'openId': "oIBzT5BFyVZeFtpA76bycj4as7KQ"  });
            if(typeof feedback == "function"){
                feedback();
            }
            return;
        }

        wx.login({success:res=>{
            console.log("登录口令code:",res.code);
            HttpUtil.post("login",{code:res.code},(state,res)=>{
                cc.sys.localStorage.setItem('openId', res.msg.openid);
                cc.sys.localStorage.setItem('session', res.msg.key);
                User.I.setUserData({'openId': res.msg.openid });
                if(typeof feedback == "function"){
                    feedback();
                }
            })
        }})
    }
}