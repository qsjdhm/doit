/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_SORT_LIST = 'SET_SORT_LIST';
export const SET_SELECTED_SORT = 'SET_SELECTED_SORT';
export const SET_ARTICLE_COUNT = 'SET_ARTICLE_COUNT';
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
export const SET_ARTICLE_LIST = 'SET_ARTICLE_LIST';

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
const setArticleCount = cac(SET_ARTICLE_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setArticleList = cac(SET_ARTICLE_LIST, 'data');

const setModelVisible = cac(SET_MODEL_VISIBLE, 'data');
const setModelDefaultRecom = cac(SET_MODEL_DEFAULT_RECOM, 'data');
const setModelDefaultRead = cac(SET_MODEL_DEFAULT_READ, 'data');

const setModelSaveId = cac(SET_MODEL_SAVE_ID, 'data');
const setModelSaveRecom = cac(SET_MODEL_SAVE_RECOM, 'data');
const setModelSaveRead = cac(SET_MODEL_SAVE_READ, 'data');


// 获取文章分类列表
export function getSortList () {
    return (dispatch, getState) => {
        const url = ENV.baseUrl + "/sortAction/byTypeGetSort";
        const method = 'POST';
        const body = {
            'type' : 'article'
        };
        const errInfo = '请求文章分类连接出错！';
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
		dispatch(getArticleCount());
	}
}

// 获取文章总数
export function getArticleCount () {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/articleAction/getArticleCount";
		const method = "POST";
		const body = {
			"sort" : getState().articleRecom.selectedSort
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
		const url = ENV.baseUrl + "/articleAction/getArticleList";
		const method = "POST";
		const body = {
			"sort" : getState().articleRecom.selectedSort,
			"page" : getState().articleRecom.selectedPage,
			"size" : 10
		};
		const errInfo = "请求文章列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setArticleList(data.data));
		});
	}
}

// 获取单个文章
export function getArticle (articleId) {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/recommendAction/getArticle";
		const method = "POST";
		const body = {
			"selectId" : articleId
		};
		const errInfo = "请求文章信息连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(modelVisibleChange(true));
            // 给弹出层的组件设置初始化数据
            dispatch(setModelDefaultRecom(data.recommendNum));
            dispatch(setModelDefaultRead(data.readNum));

            // 设置弹出层的组件的保存数据
            dispatch(setModelSaveId(data.id));
            dispatch(modelSaveRecomChange(data.recommendNum));
            dispatch(modelSaveReadChange(data.readNum));
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
export function modelSaveReadChange (readNum) {
	return (dispatch, getState) => {
		dispatch(setModelSaveRead(readNum));
	}
}


// 更新文章
export function updateArticle () {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/recommendAction/recommendArticle";
		const method = "POST";
		const body = {
			"id"           : getState().articleRecom.modelSaveId,
			"recommendNum" : getState().articleRecom.modelSaveRecom,
			"readNum"      : getState().articleRecom.modelSaveRead
		};
		const errInfo = "修改文章连接出错！";
		fetchComponent.send(self, url, method, body, errInfo, function(data){
			message.success(data.msg+"！", 3);
			dispatch(getArticleList());
			dispatch(setModelVisible(false));
		});
	}
}