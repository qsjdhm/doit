/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_SORT_LIST = 'SET_SORT_LIST';
export const SET_SELECTED_SORT = 'SET_SELECTED_SORT';
export const SET_BOOK_COUNT = 'SET_BOOK_COUNT';
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
export const SET_BOOK_LIST = 'SET_BOOK_LIST';

// 给弹出层中的组件设置默认数据的事件
export const SET_MODEL_VISIBLE = 'SET_MODEL_VISIBLE';
export const SET_MODEL_DEFAULT_RECOM = 'SET_MODEL_DEFAULT_RECOM';
export const SET_MODEL_DEFAULT_READ = 'SET_MODEL_DEFAULT_READ';

// 弹出层中的组件切换数据保存到后台的事件
export const SET_MODEL_SAVE_ID = 'SET_MODEL_SAVE_ID';
export const SET_MODEL_SAVE_RECOM = 'SET_MODEL_SAVE_RECOM';
export const SET_MODEL_SAVE_READ = 'SET_MODEL_SAVE_READ';


const setSortList = cac(SET_SORT_LIST, 'data');
const setSelectedSort = cac(SET_SELECTED_SORT, 'data');
const setBookCount = cac(SET_BOOK_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setBookList = cac(SET_BOOK_LIST, 'data');

const setModelVisible = cac(SET_MODEL_VISIBLE, 'data');
const setModelDefaultRecom = cac(SET_MODEL_DEFAULT_RECOM, 'data');
const setModelDefaultRead = cac(SET_MODEL_DEFAULT_READ, 'data');

const setModelSaveId = cac(SET_MODEL_SAVE_ID, 'data');
const setModelSaveRecom = cac(SET_MODEL_SAVE_RECOM, 'data');
const setModelSaveRead = cac(SET_MODEL_SAVE_READ, 'data');


// 获取图书分类列表
export function getSortList () {
    return (dispatch, getState) => {
        const url = ENV.baseUrl + "/sortAction/byTypeGetSort";
        const method = 'POST';
        const body = {
            'type' : 'book'
        };
        const errInfo = '请求图书分类连接出错！';
        fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setSortList(data.data));
			dispatch(selectedSortChange(data.data[0].Sort_ID));
        });
    }
}

// 分类切换事件
export function selectedSortChange (sortId) {
	return (dispatch, getState) => {
		dispatch(setSelectedSort(sortId));
		dispatch(getBookCount());
	}
}

// 获取图书总数
export function getBookCount () {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/bookAction/getBookCount";
		const method = "POST";
		const body = {
			"sort" : getState().bookRecom.selectedSort
		};
		const errInfo = "请求图书总个数连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setBookCount(data.data));
			dispatch(selectedPageChange(1));
		});
	}
}

// 分页切换事件
export function selectedPageChange (pageId) {
	return (dispatch, getState) => {
		dispatch(setSelectedPage(pageId));
		dispatch(getBookList());
	}
}

// 获取图书列表
export function getBookList () {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/bookAction/getBookList";
		const method = "POST";
		const body = {
			"sort" : getState().bookRecom.selectedSort,
			"page" : getState().bookRecom.selectedPage,
			"size" : 10
		};
		const errInfo = "请求图书列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setBookList(data.data));
		});
	}
}

// 获取单个图书
export function getBook (bookId) {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/recommendAction/getBook";
		const method = "POST";
		const body = {
			"selectId" : bookId
		};
		const errInfo = "请求图书信息连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(modelVisibleChange(true));
            // 给弹出层的组件设置初始化数据
            dispatch(setModelDefaultRecom(data.recommendNum));
            dispatch(setModelDefaultRead(data.downNum));

            // 设置弹出层的组件的保存数据
            dispatch(setModelSaveId(data.id));
            dispatch(modelSaveRecomChange(data.recommendNum));
            dispatch(modelSaveReadChange(data.downNum));
		});
	}
}

// 设置弹出层是否显示事件
export function modelVisibleChange (visible) {
	return (dispatch, getState) => {
		dispatch(setModelVisible(visible));
	}
}

// 设置弹出层中分类ID改变事件
export function modelSaveRecomChange (recommendNum) {
	return (dispatch, getState) => {
		dispatch(setModelSaveRecom(recommendNum));
	}
}

// 设置弹出层中分类NAME改变事件
export function modelSaveReadChange (downNum) {
	return (dispatch, getState) => {
		dispatch(setModelSaveRead(downNum));
	}
}


// 更新图书
export function updateBook () {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/recommendAction/recommendBook";
		const method = "POST";
		const body = {
			"id"           : getState().bookRecom.modelSaveId,
			"recommendNum" : getState().bookRecom.modelSaveRecom,
			"downNum"      : getState().bookRecom.modelSaveRead
		};
		const errInfo = "修改图书连接出错！";
		fetchComponent.send(self, url, method, body, errInfo, function(data){
			message.success(data.msg+"！", 3);
			dispatch(getBookList());
			dispatch(setModelVisible(false));
		});
	}
}