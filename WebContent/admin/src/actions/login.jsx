/* Populated by react-webpack-redux:action */

import fetchComponent      from '../components/fetch/js/fetchComponent';
import { cac }             from "../utils/index";
import { message }         from 'antd';

export const CHANGE_USERNAME = "CHANGE_USERNAME";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";


export const changeUserName = cac( CHANGE_USERNAME, "value" );
export const changePassword = cac( CHANGE_PASSWORD, "value" );


export function loginSystem () {
	return ( dispatch, getState ) => {
        const url = ENV.baseUrl + "/loginAction";
        const method = "POST";
        const body = {
            "name"     : getState().login.username,
            "password" : getState().login.password
        };
        const errInfo = "登录连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(cbData){
            if(cbData.success === "1"){
                localStorage["doitToken"] = "luanxiede";
                window.location.href = ENV.baseUrl + "/admin/#/home";
            } else {
                message.error(cbData.msg);
            }
        });
	}
}

