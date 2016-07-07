/**
 * Created by a1 on 2016/5/5.
 */


import React from 'react';
import ReactDOM from 'react-dom';

import jQuery from 'jquery';


import { message } from 'antd';

import '../../css/login.less';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name         : "",             // 用户名称
            password     : ""              // 用户密码
        };

        this.nameChange     = this.nameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.submitClick    = this.submitClick.bind(this);
    }

    // 设置state中和页面数据相关的值
    settingState(name, password) {
        if(name === "no") {
            name = this.state.name;
        }
        if(password === "no") {
            password = this.state.password;
        }

        this.setState({
            name       : name,
            password   : password
        });
    }

    /******************************事件响应方法--开始***********************************/

    // 用户名变化
    nameChange(e) {
        const name = e.target.value;
        this.settingState(name, "no");
    }

    // 密码变化
    passwordChange(e) {
        const password = e.target.value;
        this.settingState("no", password);
    }

    // 提交按钮点击
    submitClick() {
        // 登录
        this.login();
    }

    /******************************事件响应方法--结束***********************************/


    login() {
        jQuery.ajax({
            type : "POST",
            url : "/doit/loginAction",
            data : {
                "name" : this.state.name,
                "password" : this.state.password
            },
            dataType:"json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success : function(cbData) {
                if(cbData.success === "1"){
                    window.location.href = "/doit/_admin/#/home";
                } else {
					message.error(cbData.msg);
				}
            },error :function(){
                message.error("登录连接出错！");
            }
        });
    }



    render() {
        return (
            <div className="htmleaf-container">
                <div className="wrapper">
                    <div className="container">
                        <h1>Welcome</h1>
                        <form className="form">
                            <input onChange={this.nameChange} type="text" placeholder="Username" />
                            <input onChange={this.passwordChange} type="password" placeholder="Password" />
                            <button onClick={this.submitClick} >Login</button>
                        </form>
                    </div>
                    <ul className="bg-bubbles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        );
    }
};





