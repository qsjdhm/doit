/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_SORT_LIST = 'SET_SORT_LIST';
export const SET_TAG_LIST = 'SET_TAG_LIST';
export const SET_SELECTED_SORT_ID = 'SET_SELECTED_SORT_ID';
export const SET_BOOK_COUNT = 'SET_BOOK_COUNT';
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
export const SET_BOOK_LIST = 'SET_BOOK_LIST';

// 给弹出层中的组件设置默认数据的事件
export const SET_MODEL_VISIBLE = 'SET_MODEL_VISIBLE';
export const SET_MODEL_DEFAULT_SORT_ID = 'SET_MODEL_DEFAULT_SORT_ID';
export const SET_MODEL_DEFAULT_TITLE = 'SET_MODEL_DEFAULT_TITLE';
export const SET_MODEL_DEFAULT_HEIGHT = 'SET_MODEL_DEFAULT_HEIGHT';
export const SET_MODEL_DEFAULT_PATH = 'SET_MODEL_DEFAULT_PATH';

// 弹出层中的组件切换数据保存到后台的事件
export const SET_MODEL_SAVE_ID = 'SET_MODEL_SAVE_ID';
export const SET_MODEL_SAVE_COVER = 'SET_MODEL_SAVE_COVER';
export const SET_MODEL_SAVE_SORT_ID = 'SET_MODEL_SAVE_SORT_ID';
export const SET_MODEL_SAVE_SORT_NAME = 'SET_MODEL_SAVE_SORT_NAME';
export const SET_MODEL_SAVE_TITLE = 'SET_MODEL_SAVE_TITLE';
export const SET_MODEL_SAVE_HEIGHT = 'SET_MODEL_SAVE_HEIGHT';
export const SET_MODEL_SAVE_PATH = 'SET_MODEL_SAVE_PATH';


const setSortList = cac(SET_SORT_LIST, 'data');
const setTagList = cac(SET_TAG_LIST, 'data');
const setSelectedSortId = cac(SET_SELECTED_SORT_ID, 'data');
const setBookCount = cac(SET_BOOK_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setBookList = cac(SET_BOOK_LIST, 'data');

const setModelVisible = cac(SET_MODEL_VISIBLE, 'data');
const setModelDefaultSortId = cac(SET_MODEL_DEFAULT_SORT_ID, 'data');
const setModelDefaultTitle = cac(SET_MODEL_DEFAULT_TITLE, 'data');
const setModelDefaultHeight = cac(SET_MODEL_DEFAULT_HEIGHT, 'data');
const setModelDefaultPath = cac(SET_MODEL_DEFAULT_PATH, 'data');

const setModelSaveId = cac(SET_MODEL_SAVE_ID, 'data');
const setModelSaveCover = cac(SET_MODEL_SAVE_COVER, 'data');
const setModelSaveSortId = cac(SET_MODEL_SAVE_SORT_ID, 'data');
const setModelSaveSortName = cac(SET_MODEL_SAVE_SORT_NAME, 'data');
const setModelSaveTitle = cac(SET_MODEL_SAVE_TITLE, 'data');
const setModelSaveHeight = cac(SET_MODEL_SAVE_HEIGHT, 'data');
const setModelSavePath = cac(SET_MODEL_SAVE_PATH, 'data');


// 获取笔记分类列表
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
			dispatch(selectedSortIdChange(data.data[0].Sort_ID));
        });
    }
}

// 分类切换事件
export function selectedSortIdChange (sortId) {
	return (dispatch, getState) => {
		dispatch(setSelectedSortId(sortId));
		dispatch(getBookCount());
	}
}


// 获取图书总数
export function getBookCount () {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/bookAction/getBookCount";
		const method = "POST";
		const body = {
			"sort" : getState().editBook.selectedSortId
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
			"sort" : getState().editBook.selectedSortId,
			"page" : getState().editBook.selectedPage,
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
		const url = ENV.baseUrl + "/bookAction/getBook";
		const method = "POST";
		const body = {
			"selectId" : bookId
		};
		const errInfo = "请求图书信息连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(modelVisibleChange(true));

            // 给弹出层的组件设置初始化数据
			dispatch(setModelDefaultSortId(data.sortId));
            dispatch(setModelDefaultTitle(data.name));
            dispatch(setModelDefaultHeight(data.height));
            dispatch(setModelDefaultPath(data.link));

            // 设置弹出层的组件的保存数据
            dispatch(setModelSaveId(data.id));
			dispatch(modelSaveSortIdChange(data.sortId));
			dispatch(modelSaveSortNameChange(data.sortName));
            dispatch(modelSaveTitleChange(data.name));
            dispatch(modelSaveHeightChange(data.height));
            dispatch(modelSavePathChange(data.link));
		});
	}
}

// 设置弹出层是否显示事件
export function modelVisibleChange (visible) {
	return (dispatch, getState) => {
		dispatch(setModelVisible(visible));
	}
}

// 设置弹出层中图书封面变事件
export function modelSaveCoverChange (cover) {
    return (dispatch, getState) => {
        dispatch(setModelSaveCover(cover));
    }
}

// 设置弹出层中分类ID改变事件
export function modelSaveSortIdChange (sortId) {
	return (dispatch, getState) => {
		dispatch(setModelSaveSortId(sortId));
	}
}

// 设置弹出层中分类NAME改变事件
export function modelSaveSortNameChange (sortName) {
	return (dispatch, getState) => {
		dispatch(setModelSaveSortName(sortName));
	}
}

// 设置弹出层中图书名称改变事件
export function modelSaveTitleChange (title) {
    return (dispatch, getState) => {
        dispatch(setModelSaveTitle(title));
    }
}

// 设置弹出层中图书高度改变事件
export function modelSaveHeightChange (height) {
    return (dispatch, getState) => {
        dispatch(setModelSaveHeight(height));
    }
}

// 设置弹出层中图书下载路径改变事件
export function modelSavePathChange (path) {
    return (dispatch, getState) => {
        dispatch(setModelSavePath(path));
    }
}

// 更新图书
export function updateBook () {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/bookAction/updateBook";
		const method = "POST";
		const body = {
			"id"       : getState().editBook.modelSaveId,
			"sortId"   : getState().editBook.modelSaveSortId,
			"sortName" : encodeURI(encodeURI(getState().editBook.modelSaveSortName)),
			"name"     : encodeURI(encodeURI(getState().editBook.modelSaveTitle)),
			"height"   : getState().editBook.modelSaveHeight,
			"cover"    : getState().editBook.modelSaveCover,
			"link"     : getState().editBook.modelSavePath
		};
		const errInfo = "修改图书连接出错！";
		fetchComponent.send(self, url, method, body, errInfo, function(data){
			message.success(data.msg+"！", 3);
			dispatch(getBookList());
			dispatch(setModelVisible(false));
		});
	}
}