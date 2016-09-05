/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_NAME = 'SET_NAME';
export const SET_URL = 'SET_URL';
export const SET_LOADING = 'SET_LOADING';

const setName = cac(SET_NAME, 'data');
const setUrl = cac(SET_URL, 'data');
const setLoading = cac(SET_LOADING, 'data');


// 外链名称改变事件
export function nameChange (name) {
    return (dispatch, getState) => {
        dispatch(setName(name));
    }
}

// 外链内容改变事件
export function urlChange (url) {
    return (dispatch, getState) => {
        dispatch(setUrl(url));
    }
}

// 新增外链
export function addLink () {
    return (dispatch, getState) => {
        dispatch(loadingChange(true));
        const url = ENV.baseUrl + "/linkAction/addLink";
        const method = "POST";
        const body = {
            "name" : encodeURI(encodeURI(getState().addLink.name)),
            "url"  : encodeURI(encodeURI(getState().addLink.url))
        };
        const errInfo = "新增外链连接出错！";
        fetchComponent.send(self, url, method, body, errInfo, function(data){
            message.success(data.msg+"！", 3);
            dispatch(loadingChange(false));
        });
    }
}

// 设置删除按钮的等待事件
export function loadingChange (loading) {
	return (dispatch, getState) => {
		dispatch(setLoading(loading));
	}
}




