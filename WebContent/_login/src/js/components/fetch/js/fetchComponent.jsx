/**
 * Created by zhangyan on 2016/1/12.
 */

'use strict';

import { message } from 'antd';

// 初始化
function init(self, url, method, body, errorInfo, callback) {
    fetch(url, {
        method: method,
		credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        body: dealBodyFormat(body)
    }).then(function(res) {
        if (res.ok) {
            return res.json();
        } else {
            message.error(errorInfo);
        }
    }).then(function(data) {
        if(typeof callback === "function") {
            callback.call(self, data);
        } else {
            message.error("callback必须是一个function");
        }
    });
}

// 解析body数据格式
function dealBodyFormat(body){
    let bodyStr = "";
    for(var key in body) {
        bodyStr += key+"="+body[key]+"&";
    }
    return bodyStr.substr(0, bodyStr.length-1);
}

// 封装的fetch本身
var fetchComponent = {
    /**
     * @param self            外部传来的本身this对象
     * @param url             发送的url地址
     * @param method          异步或者同步
     * @param body            传递的数据
     * @param errInfo         当错误时的提示信息
     * @param callback        当成功时的回调方法
     */
    send : function(self, url, method, body, errInfo, callback) {
        return init(self, url, method, body, errInfo, callback);
    }
};


export default fetchComponent;






