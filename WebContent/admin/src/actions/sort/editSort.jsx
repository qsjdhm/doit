/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_SELECTED_SORT_ID = 'SET_SELECTED_SORT_ID';
export const SET_SORT_COUNT = 'SET_SORT_COUNT';
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
export const SET_SORT_LIST = 'SET_SORT_LIST';

// 给弹出层中的组件设置默认数据的事件
export const SET_MODEL_VISIBLE = 'SET_MODEL_VISIBLE';
export const SET_MODEL_DEFAULT_SORT_ID = 'SET_MODEL_DEFAULT_SORT_ID';
export const SET_MODEL_DEFAULT_NAME = 'SET_MODEL_DEFAULT_NAME';

// 弹出层中的组件切换数据保存到后台的事件
export const SET_MODEL_SAVE_ID = 'SET_MODEL_SAVE_ID';
export const SET_MODEL_SAVE_SORT_ID = 'SET_MODEL_SAVE_SORT_ID';
export const SET_MODEL_SAVE_NAME = 'SET_MODEL_SAVE_NAME';


const setSelectedSortId = cac(SET_SELECTED_SORT_ID, 'data');
const setSortCount = cac(SET_SORT_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setSortList = cac(SET_SORT_LIST, 'data');

const setModelVisible = cac(SET_MODEL_VISIBLE, 'data');
const setModelDefaultSortId = cac(SET_MODEL_DEFAULT_SORT_ID, 'data');
const setModelDefaultName = cac(SET_MODEL_DEFAULT_NAME, 'data');

const setModelSaveId = cac(SET_MODEL_SAVE_ID, 'data');
const setModelSaveSortId = cac(SET_MODEL_SAVE_SORT_ID, 'data');
const setModelSaveName = cac(SET_MODEL_SAVE_NAME, 'data');



// 分类切换事件
export function selectedSortIdChange (sortId) {
	return (dispatch, getState) => {
		dispatch(setSelectedSortId(sortId));
		dispatch(getSortCount());
	}
}


// 获取分类总数
export function getSortCount () {
	return (dispatch, getState) => {
		const url = "/doit/sortAction/getSortCount";
		const method = "POST";
		const body = {
			"fSort" : getState().editSort.selectedSortId
		};
		const errInfo = "请求分类总个数连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setSortCount(data.data));
			dispatch(selectedPageChange(1));
		});
	}
}

// 分页切换事件
export function selectedPageChange (pageId) {
	return (dispatch, getState) => {
		dispatch(setSelectedPage(pageId));
		dispatch(getSortList());
	}
}

// 获取分类列表
export function getSortList () {
	return (dispatch, getState) => {
		const url = "/doit/sortAction/getSortList";
		const method = "POST";
		const body = {
			"fSort" : getState().editSort.selectedSortId,
			"page" : getState().editSort.selectedPage,
			"size" : 10
		};
		const errInfo = "请求分类列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setSortList(data.data));
		});
	}
}

// 获取单个分类
export function getSort (sortId) {
	return (dispatch, getState) => {
		const url = "/doit/sortAction/getSort";
		const method = "POST";
		const body = {
			"selectId" : sortId
		};
		const errInfo = "请求分类信息连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(modelVisibleChange(true));

            // 给弹出层的组件设置初始化数据
			dispatch(setModelDefaultSortId(data.fId));
            dispatch(setModelDefaultName(data.name));

            // 设置弹出层的组件的保存数据
            dispatch(setModelSaveId(data.id));
			dispatch(modelSaveSortIdChange(data.fId));
			dispatch(modelSaveNameChange(data.name));
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
export function modelSaveSortIdChange (sortId) {
	return (dispatch, getState) => {
		dispatch(setModelSaveSortId(sortId));
	}
}

// 设置弹出层中分类名称改变事件
export function modelSaveNameChange (name) {
    return (dispatch, getState) => {
        dispatch(setModelSaveName(name));
    }
}


// 更新分类
export function updateSort () {
	return (dispatch, getState) => {
		const url = "/doit/sortAction/updateSort";
		const method = "POST";
		const body = {
			"id"       : getState().editSort.modelSaveId,
			"fId"      : getState().editSort.modelSaveSortId,
			"name"     : encodeURI(encodeURI(getState().editSort.modelSaveName))
		};
		const errInfo = "修改分类连接出错！";
		fetchComponent.send(self, url, method, body, errInfo, function(data){
			message.success(data.msg+"！", 3);
			dispatch(getSortList());
			dispatch(setModelVisible(false));
		});
	}
}