/**
 * Created by zhangyan on 2016/1/12.
 */


'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

import React from 'react';

import { message } from 'antd';


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function init(self, url, method, body, errorInfo, callback) {
	fetch(url, {
		method: method,
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
	let keyArray = Object.keys(body);  // 这样转换可以获取一个object键值对的长度
	let bodyLength = keyArray.length;
	let lastKey = keyArray[bodyLength-1];

	let bodyStr = "";
	for(var key in body) {
		if (key === lastKey){
			bodyStr += key+"="+body[key];
		} else {
			bodyStr += key+"="+body[key]+"&";
		}
	}
	return bodyStr;
}

exports["default"] = {
	send: function send(self, url, method, body, errInfo, callback) {
		return init(self, url, method, body, errInfo, callback);
	}
};
module.exports = exports['default'];