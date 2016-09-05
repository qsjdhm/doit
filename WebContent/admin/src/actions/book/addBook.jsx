/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_SORT_LIST = 'SET_SORT_LIST';
export const SET_SELECTED_SORT_ID = 'SET_SELECTED_SORT_ID';
export const SET_SELECTED_SORT_NAME = 'SET_SELECTED_SORT_NAME';
export const SET_TITLE = 'SET_TITLE';
export const SET_HEIGHT = 'SET_HEIGHT';
export const SET_COVER = 'SET_COVER';
export const SET_PATH = 'SET_PATH';
export const SET_LOADING = 'SET_LOADING';

const setSortList = cac(SET_SORT_LIST, 'data');
const setSelectedSortId = cac(SET_SELECTED_SORT_ID, 'data');
const setSelectedSortName = cac(SET_SELECTED_SORT_NAME, 'data');
const setTitle = cac(SET_TITLE, 'data');
const setHeight = cac(SET_HEIGHT, 'data');
const setCover = cac(SET_COVER, 'data');
const setPath = cac(SET_PATH, 'data');
const setLoading = cac(SET_LOADING, 'data');


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
			dispatch(selectedSortIdChange(data.data[0].Sort_ID));
            dispatch(selectedSortNameChange(data.data[0].Sort_Name));
        });
    }
}

// 分类ID切换事件
export function selectedSortIdChange (sortId) {
	return (dispatch, getState) => {
		dispatch(setSelectedSortId(sortId));
	}
}

// 分类NAME切换事件
export function selectedSortNameChange (sortName) {
    return (dispatch, getState) => {
        dispatch(setSelectedSortName(sortName));
    }
}

// 图书封面改变事件
export function coverChange (cover) {
    return (dispatch, getState) => {
        dispatch(setCover(cover));
    }
}

// 图书名称改变事件
export function titleChange (title) {
    return (dispatch, getState) => {
        dispatch(setTitle(title));
    }
}

// 图书高度改变事件
export function heightChange (height) {
    return (dispatch, getState) => {
        dispatch(setHeight(height));
    }
}

// 图书下载路径改变事件
export function pathChange (path) {
    return (dispatch, getState) => {
        dispatch(setPath(path));
    }
}

// 新增图书
export function addBook () {
    return (dispatch, getState) => {
        dispatch(loadingChange(true));
        const url = ENV.baseUrl + "/bookAction/addBook";
        const method = "POST";
        const body = {
            "name"     : encodeURI(encodeURI(getState().addBook.title)),
            "sortId"   : getState().addBook.selectedSortId,
            "sortName" : encodeURI(encodeURI(getState().addBook.selectedSortName)),
            "height"   : getState().addBook.height,
            "cover"    : getState().addBook.cover,
            "link"     : getState().addBook.path.replace(/&/g, "*")
        };
        const errInfo = "新增图书连接出错！";
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




