/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_LINK_COUNT = 'SET_LINK_COUNT';
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
export const SET_LINK_LIST = 'SET_LINK_LIST';
export const SET_SELECTED_ROW_KEYS = 'SET_SELECTED_ROW_KEYS';
export const SET_HAS_SELECTED = 'SET_HAS_SELECTED';
export const SET_LOADING = 'SET_LOADING';

const setLinkCount = cac(SET_LINK_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setLinkList = cac(SET_LINK_LIST, 'data');
const setSelectedRowKeys = cac(SET_SELECTED_ROW_KEYS, 'data');
const setHasSelected = cac(SET_HAS_SELECTED, 'data');
const setLoading = cac(SET_LOADING, 'data');


// 获取外链总数
export function getLinkCount () {
	return (dispatch, getState) => {
		const url = "/doit/linkAction/getLinkCount";
		const method = "POST";
		const body = {};
		const errInfo = "请求外链总个数连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setLinkCount(data.data));
			dispatch(selectedPageChange(1));
		});
	}
}

// 分页切换事件
export function selectedPageChange (pageId) {
	return (dispatch, getState) => {
		dispatch(setSelectedPage(pageId));
		dispatch(getLinkList());
	}
}

// 获取外链列表
export function getLinkList () {
	return (dispatch, getState) => {
		const url = "/doit/linkAction/getLinkList";
		const method = "POST";
		const body = {
			"page" : getState().delLink.selectedPage,
			"size" : 10
		};
		const errInfo = "请求外链列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setLinkList(data.data));
		});
	}
}

// 是否有选中外链切换事件
export function hasSelectedChange (has) {
	return (dispatch, getState) => {
		dispatch(setHasSelected(has));
	}
}

// 选中外链切换事件
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

// 删除外链
export function delLinkList (selectStr) {
	return (dispatch, getState) => {
		const url = "/doit/linkAction/delLink";
		const method = "POST";
		const body = {
			"selectId" : selectStr
		};
		const errInfo = "删除外链列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			message.success(data.msg+"！", 3);
			dispatch(getLinkList());
			dispatch(loadingChange(false));
			dispatch(setSelectedRowKeys([]));
			dispatch(setHasSelected(false));
		});
	}
}


