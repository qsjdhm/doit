/* Populated by react-webpack-redux:action */

import fetchComponent      from '../components/fetch/js/fetchComponent';
import { cac } from "../utils/index";

export const CHANGE_USERNAME = "CHANGE_USERNAME";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";


export const changeUserName = cac( CHANGE_USERNAME, "value" );
export const changePassword = cac( CHANGE_PASSWORD, "value" );


export function byTypeGetSort () {
    return (dispatch, getState) => {
        const url = "/doit/sortAction/byTypeGetSort";
        const method = "POST";
        const body = {
            "type" : "note"
        };
        const errInfo = "请求笔记分类连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
            console.info("action--------------");
            console.info(data);
        });
    }
}



