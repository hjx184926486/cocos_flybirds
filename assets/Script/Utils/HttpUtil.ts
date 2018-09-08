

export  class HttpUtil{
    public static URL =  "https://zk.againfly.com/emoji/jx/bird/";

    public static get(url,params, callback){
        let dataStr = ''; 
		Object.keys(params).forEach(key => {
			dataStr += key + '=' + params[key] + '&';
		})
		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
        }
        url = HttpUtil.URL + url;
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");  
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                let response = xhr.responseText;
                if (xhr.status >= 200 && xhr.status < 300) {
                    let httpStatus = xhr.statusText;
                    callback(true, JSON.parse(response));
                }else{
                    callback(false, response);
                }
            }
        };
        xhr.send();
    }
    //Post请求
    public static post(url,param: any = {},callback){
        url = HttpUtil.URL + url;
        var xhr = cc.loader.getXMLHttpRequest();  
        let dataStr = ''; 
        Object.keys(param).forEach(key => {
            dataStr += key + '=' + param[key] + '&';
        })
        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  
        xhr.onreadystatechange = function () {  
            if (xhr.readyState === 4) {
                let response = xhr.responseText;
                if (xhr.status >= 200 && xhr.status < 300) {
                    let httpStatus = xhr.statusText;
                    callback(true, JSON.parse(response));
                }else{
                    callback(false, response);
                }
            }
        };
        xhr.send(dataStr);  
    }
}
  