/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_SORT_LIST = 'SET_SORT_LIST';
export const SET_TAG_LIST = 'SET_TAG_LIST';
export const SET_SELECTED_SORT = 'SET_SELECTED_SORT';
export const SET_NOTE_COUNT = 'SET_NOTE_COUNT';
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
export const SET_NOTE_LIST = 'SET_NOTE_LIST';
export const SET_SELECTED_ROW_KEYS = 'SET_SELECTED_ROW_KEYS';
export const SET_HAS_SELECTED = 'SET_HAS_SELECTED';
export const SET_LOADING = 'SET_LOADING';

const setSortList = cac(SET_SORT_LIST, 'data');
const setTagList = cac(SET_TAG_LIST, 'data');
const setSelectedSort = cac(SET_SELECTED_SORT, 'data');
const setNoteCount = cac(SET_NOTE_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setNoteList = cac(SET_NOTE_LIST, 'data');
const setSelectedRowKeys = cac(SET_SELECTED_ROW_KEYS, 'data');
const setHasSelected = cac(SET_HAS_SELECTED, 'data');
const setLoading = cac(SET_LOADING, 'data');


// 获取笔记分类列表
export function getSortList () {
    return (dispatch, getState) => {
        const url = ENV.baseUrl + "/sortAction/byTypeGetSort";
        const method = 'POST';
        const body = {
            'type' : 'note'
        };
        const errInfo = '请求笔记分类连接出错！';
        fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(getTagList());
			dispatch(setSortList(data.data));
			dispatch(selectedSortChange(data.data[0].Sort_ID));
        });
    }
}

// 分类切换事件
export function selectedSortChange (sortId) {
	return (dispatch, getState) => {
		dispatch(setSelectedSort(sortId));
		dispatch(getNoteCount());
	}
}

// 获取标签列表
export function getTagList () {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/sortAction/byTypeGetSort";
		const method = "POST";
		const body = {
			"type" : "tag"
		};
		const errInfo = "请求笔记标签连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setTagList(data.data));
		});
	}
}

// 获取笔记总数
export function getNoteCount () {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/noteAction/getNoteCount";
		const method = "POST";
		const body = {
			"sort" : getState().delNote.selectedSort
		};
		const errInfo = "请求笔记总个数连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setNoteCount(data.data));
			dispatch(selectedPageChange(1));
		});
	}
}

// 分页切换事件
export function selectedPageChange (pageId) {
	return (dispatch, getState) => {
		dispatch(setSelectedPage(pageId));
		dispatch(getNoteList());
	}
}

// 获取笔记列表
export function getNoteList () {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/noteAction/getNoteList";
		const method = "POST";
		const body = {
			"sort" : getState().delNote.selectedSort,
			"page" : getState().delNote.selectedPage,
			"size" : 10
		};
		const errInfo = "请求笔记列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setNoteList(data.data));
		});
	}
}

// 是否有选中笔记切换事件
export function hasSelectedChange (has) {
	return (dispatch, getState) => {
		dispatch(setHasSelected(has));
	}
}

// 选中笔记切换事件
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

// 删除笔记
export function delNoteList (selectStr) {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/noteAction/delNote";
		const method = "POST";
		const body = {
			"selectId" : selectStr
		};
		const errInfo = "删除笔记列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			message.success(data.msg+"！", 3);
			dispatch(getNoteList());
			dispatch(loadingChange(false));
			dispatch(setSelectedRowKeys([]));
			dispatch(setHasSelected(false));
		});
	}
}


