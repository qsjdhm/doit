/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_USER_COUNT = 'SET_USER_COUNT';
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
export const SET_USER_LIST = 'SET_USER_LIST';
export const SET_SELECTED_ROW_KEYS = 'SET_SELECTED_ROW_KEYS';
export const SET_HAS_SELECTED = 'SET_HAS_SELECTED';
export const SET_LOADING = 'SET_LOADING';

const setUserCount = cac(SET_USER_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setUserList = cac(SET_USER_LIST, 'data');
const setSelectedRowKeys = cac(SET_SELECTED_ROW_KEYS, 'data');
const setHasSelected = cac(SET_HAS_SELECTED, 'data');
const setLoading = cac(SET_LOADING, 'data');


// 获取用户总数
export function getUserCount () {
	return (dispatch, getState) => {
		const url = "/doit/userAction/getUserCount";
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
		const url = "/doit/userAction/getUserList";
		const method = "POST";
		const body = {
			"page" : getState().delUser.selectedPage,
			"size" : 10
		};
		const errInfo = "请求用户列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setUserList(data.data));
		});
	}
}

// 是否有选中用户切换事件
export function hasSelectedChange (has) {
	return (dispatch, getState) => {
		dispatch(setHasSelected(has));
	}
}

// 选中用户切换事件
export function selectedRowKeysChange (selectList) {
	return (dispatch, getState) => {
		dispatch(setSelectedRowKeys(selectList));
	}
}

// 设置删除按钮的等待事件
export function loadingChange (loading) {
	return (dispatch, getState) => {
		dispatch(setLoading(loading));
	}
}

// 删除用户
export function delUserList (selectStr) {
	return (dispatch, getState) => {
		const url = "/doit/userAction/delUser";
		const method = "POST";
		const body = {
			"selectId" : selectStr
		};
		const errInfo = "删除用户列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			message.success(data.msg+"！", 3);
			dispatch(getUserList());
			dispatch(loadingChange(false));
			dispatch(setSelectedRowKeys([]));
			dispatch(setHasSelected(false));
		});
	}
}


