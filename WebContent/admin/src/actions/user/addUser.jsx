/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_NAME = 'SET_NAME';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_LOADING = 'SET_LOADING';

const setName = cac(SET_NAME, 'data');
const setPassword = cac(SET_PASSWORD, 'data');
const setEmail = cac(SET_EMAIL, 'data');
const setLoading = cac(SET_LOADING, 'data');


// 用户名称改变事件
export function nameChange (name) {
    return (dispatch, getState) => {
        dispatch(setName(name));
    }
}

// 用户密码改变事件
export function passwordChange (password) {
    return (dispatch, getState) => {
        dispatch(setPassword(password));
    }
}

// 用户邮箱改变事件
export function emailChange (email) {
    return (dispatch, getState) => {
        dispatch(setEmail(email));
    }
}

// 新增用户
export function addUser () {
    return (dispatch, getState) => {
        dispatch(loadingChange(true));
        const url = "/doit/userAction/addUser";
        const method = "POST";
        const body = {
            "name"      : encodeURI(encodeURI(getState().addUser.name)),
            "password"  : encodeURI(encodeURI(getState().addUser.password)),
            "email"     : encodeURI(encodeURI(getState().addUser.email))
        };
        const errInfo = "新增用户连接出错！";
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




