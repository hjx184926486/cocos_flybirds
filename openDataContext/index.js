let cccc = wx.getSharedCanvas().getContext('2d')
wx.onMessage(data => {
    console.log("收到主域消息:", JSON.stringify(data));
    if(data.message.type == 2){
        //获取好友信息
        // cccc.canvas.USER_INFO = 
        wx.getFriendCloudStorage({
            keyList: ["score"],
            success:res=>{
                cccc.canvas.FRIEND_STORAGE = res.data;
            }
        })
    } else if (data.message.type == 3) {
        wx.getUserInfo({
            openIdList: ["selfOpenId"],
            success:res=>{
                // console.log("子域获取用户信息",res.data[0])
                cccc.canvas.USER_INFO = res.data[0];
            }
        })
    } else{
        wx.getUserCloudStorage({
            keyList: ["score","coin"],
            success: res => {
                if( res["KVDataList"].length > 0 ){
                    cccc.canvas.USER_STORAGE = res["KVDataList"];
                }else{
                    cccc.canvas.USER_STORAGE = [{"key":"score","value":"0"}];
                }
                
            }
          })
        
    }
});
