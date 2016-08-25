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
export const SET_SELECTED_ROW_KEYS = 'SET_SELECTED_ROW_KEYS';
export const SET_HAS_SELECTED = 'SET_HAS_SELECTED';
export const SET_LOADING = 'SET_LOADING';

const setSortList = cac(SET_SORT_LIST, 'data');
const setSelectedSort = cac(SET_SELECTED_SORT, 'data');
const setBookCount = cac(SET_BOOK_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setBookList = cac(SET_BOOK_LIST, 'data');
const setSelectedRowKeys = cac(SET_SELECTED_ROW_KEYS, 'data');
const setHasSelected = cac(SET_HAS_SELECTED, 'data');
const setLoading = cac(SET_LOADING, 'data');


// 获取图书分类列表
export function getSortList () {
    return (dispatch, getState) => {
        const url = '/doit/sortAction/byTypeGetSort';
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
		const url = "/doit/bookAction/getBookCount";
		const method = "POST";
		const body = {
			"sort" : getState().delBook.selectedSort
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
		const url = "/doit/bookAction/getBookList";
		const method = "POST";
		const body = {
			"sort" : getState().delBook.selectedSort,
			"page" : getState().delBook.selectedPage,
			"size" : 10
		};
		const errInfo = "请求图书列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setBookList(data.data));
		});
	}
}

// 是否有选中图书切换事件
export function hasSelectedChange (has) {
	return (dispatch, getState) => {
		dispatch(setHasSelected(has));
	}
}

// 选中图书切换事件
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

// 删除图书
export function delBookList (selectStr) {
	return (dispatch, getState) => {
		const url = "/doit/bookAction/delBook";
		const method = "POST";
		const body = {
			"selectId" : selectStr
		};
		const errInfo = "删除图书列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			message.success(data.msg+"！", 3);
			dispatch(getBookList());
			dispatch(loadingChange(false));
			dispatch(setSelectedRowKeys([]));
			dispatch(setHasSelected(false));
		});
	}
}


