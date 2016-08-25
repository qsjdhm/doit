/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_SORT_LIST = 'SET_SORT_LIST';
export const SET_TAG_LIST = 'SET_TAG_LIST';
export const SET_SELECTED_SORT = 'SET_SELECTED_SORT';
export const SET_ARTICLE_COUNT = 'SET_ARTICLE_COUNT';
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
export const SET_ARTICLE_LIST = 'SET_ARTICLE_LIST';
export const SET_SELECTED_ROW_KEYS = 'SET_SELECTED_ROW_KEYS';
export const SET_HAS_SELECTED = 'SET_HAS_SELECTED';
export const SET_LOADING = 'SET_LOADING';

const setSortList = cac(SET_SORT_LIST, 'data');
const setTagList = cac(SET_TAG_LIST, 'data');
const setSelectedSort = cac(SET_SELECTED_SORT, 'data');
const setArticleCount = cac(SET_ARTICLE_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setArticleList = cac(SET_ARTICLE_LIST, 'data');
const setSelectedRowKeys = cac(SET_SELECTED_ROW_KEYS, 'data');
const setHasSelected = cac(SET_HAS_SELECTED, 'data');
const setLoading = cac(SET_LOADING, 'data');


// 获取文章分类列表
export function getSortList () {
    return (dispatch, getState) => {
        const url = '/doit/sortAction/byTypeGetSort';
        const method = 'POST';
        const body = {
            'type' : 'article'
        };
        const errInfo = '请求文章分类连接出错！';
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
		dispatch(getArticleCount());
	}
}

// 获取标签列表
export function getTagList () {
	return (dispatch, getState) => {
		const url = "/doit/sortAction/byTypeGetSort";
		const method = "POST";
		const body = {
			"type" : "tag"
		};
		const errInfo = "请求文章标签连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setTagList(data.data));
		});
	}
}

// 获取文章总数
export function getArticleCount () {
	return (dispatch, getState) => {
		const url = "/doit/articleAction/getArticleCount";
		const method = "POST";
		const body = {
			"sort" : getState().editArticle.selectedSort
		};
		const errInfo = "请求文章总个数连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setArticleCount(data.data));
			dispatch(selectedPageChange(1));
		});
	}
}

// 分页切换事件
export function selectedPageChange (pageId) {
	return (dispatch, getState) => {
		dispatch(setSelectedPage(pageId));
		dispatch(getArticleList());
	}
}

// 获取文章列表
export function getArticleList () {
	return (dispatch, getState) => {
		const url = "/doit/articleAction/getArticleList";
		const method = "POST";
		const body = {
			"sort" : getState().editArticle.selectedSort,
			"page" : getState().editArticle.selectedPage,
			"size" : 10
		};
		const errInfo = "请求文章列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setArticleList(data.data));
		});
	}
}

// 是否有选中文章切换事件
export function hasSelectedChange (has) {
	return (dispatch, getState) => {
		dispatch(setHasSelected(has));
	}
}

// 选中文章切换事件
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

// 删除文章
export function delArticleList (selectStr) {
	return (dispatch, getState) => {
		const url = "/doit/articleAction/delArticle";
		const method = "POST";
		const body = {
			"selectId" : selectStr
		};
		const errInfo = "删除文章列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			message.success(data.msg+"！", 3);
			dispatch(getArticleList());
			dispatch(loadingChange(false));
			dispatch(setSelectedRowKeys([]));
			dispatch(setHasSelected(false));
		});
	}
}


