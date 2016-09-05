/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_USER_COUNT = 'SET_USER_COUNT';
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
export const SET_USER_LIST = 'SET_USER_LIST';

// 给弹出层中的组件设置默认数据的事件
export const SET_MODEL_VISIBLE = 'SET_MODEL_VISIBLE';
export const SET_MODEL_DEFAULT_NAME = 'SET_MODEL_DEFAULT_NAME';
export const SET_MODEL_DEFAULT_PASSWORD = 'SET_MODEL_DEFAULT_PASSWORD';
export const SET_MODEL_DEFAULT_EMAIL = 'SET_MODEL_DEFAULT_EMAIL';

// 弹出层中的组件切换数据保存到后台的事件
export const SET_MODEL_SAVE_ID = 'SET_MODEL_SAVE_ID';
export const SET_MODEL_SAVE_NAME = 'SET_MODEL_SAVE_NAME';
export const SET_MODEL_SAVE_PASSWORD = 'SET_MODEL_SAVE_PASSWORD';
export const SET_MODEL_SAVE_EMAIL = 'SET_MODEL_SAVE_EMAIL';


const setUserCount = cac(SET_USER_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setUserList = cac(SET_USER_LIST, 'data');

const setModelVisible = cac(SET_MODEL_VISIBLE, 'data');
const setModelDefaultName = cac(SET_MODEL_DEFAULT_NAME, 'data');
const setModelDefaultPassword = cac(SET_MODEL_DEFAULT_PASSWORD, 'data');
const setModelDefaultEmail = cac(SET_MODEL_DEFAULT_EMAIL, 'data');

const setModelSaveId = cac(SET_MODEL_SAVE_ID, 'data');
const setModelSaveName = cac(SET_MODEL_SAVE_NAME, 'data');
const setModelSavePassword = cac(SET_MODEL_SAVE_PASSWORD, 'data');
const setModelSaveEmail = cac(SET_MODEL_SAVE_EMAIL, 'data');




// 获取用户总数
export function getUserCount () {
    return (dispatch, getState) => {
        const url = ENV.baseUrl + "/userAction/getUserCount";
        const method = "POST";
        const body = {};
        const errInfo = "请求用户总个数连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
            dispatch(setUserCount(data.data));
            dispatch(selectedPageChange(1));
        });
    }
}

// 分页切换事件
export function selectedPageChange (pageId) {
    return (dispatch, getState) => {
        dispatch(setSelectedPage(pageId));
        dispatch(getUserList());
    }
}

// 获取用户列表
export function getUserList () {
    return (dispatch, getState) => {
        const url = ENV.baseUrl + "/userAction/getUserList";
        const method = "POST";
        const body = {
            "page" : getState().editUser.selectedPage,
            "size" : 10
        };
        const errInfo = "请求用户列表连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
            dispatch(setUserList(data.data));
        });
    }
}

// 获取单个用户
export function getUser (userId) {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/userAction/getUser";
		const method = "POST";
		const body = {
			"selectId" : userId
		};
		const errInfo = "请求用户信息连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(modelVisibleChange(true));

            // 给弹出层的组件设置初始化数据
            dispatch(setModelDefaultName(data.name));
            dispatch(setModelDefaultEmail(data.email));

            // 设置弹出层的组件的保存数据
            dispatch(setModelSaveId(data.id));
            dispatch(modelSaveNameChange(data.name));
            dispatch(modelSaveEmailChange(data.email));
		});
	}
}

// 设置弹出层是否显示事件
export function modelVisibleChange (visible) {
	return (dispatch, getState) => {
		dispatch(setModelVisible(visible));
	}
}

// 设置弹出层中用户名称改变事件
export function modelSaveNameChange (name) {
    return (dispatch, getState) => {
        dispatch(setModelSaveName(name));
    }
}

// 设置弹出层中用户密码改变事件
export function modelSavePasswordChange (password) {
    return (dispatch, getState) => {
        dispatch(setModelSavePassword(password));
    }
}

// 设置弹出层中用户邮箱改变事件
export function modelSaveEmailChange (email) {
	return (dispatch, getState) => {
		dispatch(setModelSaveEmail(email));
	}
}

// 更新外链
export function updateUser () {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/userAction/updateUser";
		const method = "POST";
		const body = {
			"id"       : getState().editUser.modelSaveId,
			"name"     : encodeURI(encodeURI(getState().editUser.modelSaveName)),
            "password" : encodeURI(encodeURI(getState().editUser.modelSavePassword)),
			"email"    : encodeURI(encodeURI(getState().editUser.modelSaveEmail))
		};
		const errInfo = "修改外链连接出错！";
		fetchComponent.send(self, url, method, body, errInfo, function(data){
			message.success(data.msg+"！", 3);
			dispatch(getUserList());
			dispatch(setModelVisible(false));
		});
	}
}