/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_COMMENT_COUNT = 'SET_COMMENT_COUNT';
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
export const SET_COMMENT_LIST = 'SET_COMMENT_LIST';
export const SET_SELECTED_ROW_KEYS = 'SET_SELECTED_ROW_KEYS';
export const SET_HAS_SELECTED = 'SET_HAS_SELECTED';
export const SET_LOADING = 'SET_LOADING';

const setCommentCount = cac(SET_COMMENT_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setCommentList = cac(SET_COMMENT_LIST, 'data');
const setSelectedRowKeys = cac(SET_SELECTED_ROW_KEYS, 'data');
const setHasSelected = cac(SET_HAS_SELECTED, 'data');
const setLoading = cac(SET_LOADING, 'data');


// 获取评论总数
export function getCommentCount () {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/commentAction/getCommentCount";
		const method = "POST";
		const body = {};
		const errInfo = "请求评论总个数连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setCommentCount(data.data));
			dispatch(selectedPageChange(1));
		});
	}
}

// 分页切换事件
export function selectedPageChange (pageId) {
	return (dispatch, getState) => {
		dispatch(setSelectedPage(pageId));
		dispatch(getCommentList());
	}
}

// 获取评论列表
export function getCommentList () {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/commentAction/getCommentList";
		const method = "POST";
		const body = {
			"page" : getState().delComment.selectedPage,
			"size" : 10
		};
		const errInfo = "请求评论列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setCommentList(data.data));
		});
	}
}

// 是否有选中评论切换事件
export function hasSelectedChange (has) {
	return (dispatch, getState) => {
		dispatch(setHasSelected(has));
	}
}

// 选中评论切换事件
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

// 删除评论
export function delCommentList (selectStr) {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/commentAction/delComment";
		const method = "POST";
		const body = {
			"selectId" : selectStr
		};
		const errInfo = "删除评论列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			message.success(data.msg+"！", 3);
			dispatch(getCommentList());
			dispatch(loadingChange(false));
			dispatch(setSelectedRowKeys([]));
			dispatch(setHasSelected(false));
		});
	}
}


