/* Populated by react-webpack-redux:action */

import fetchComponent      from '../components/fetch/js/fetchComponent';
import { cac } from "../utils/index";

export const SET_SORT_LIST = "SET_SORT_LIST";



const setSortList = cac(SET_SORT_LIST, 'data');

export function byTypeGetSort () {
    return (dispatch, getState) => {
        const url = "/doit/sortAction/byTypeGetSort";
        const method = "POST";
        const body = {
            "type" : "note"
        };
        const errInfo = "请求笔记分类连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
			console.info(data.data);
			dispatch(setSortList(data.data));
        });
    }
}



