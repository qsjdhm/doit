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

// 给弹出层中的组件设置默认数据的事件
export const SET_MODEL_VISIBLE = 'SET_MODEL_VISIBLE';
export const SET_MODEL_DEFAULT_SORT_ID = 'SET_MODEL_DEFAULT_SORT_ID';
export const SET_MODEL_DEFAULT_TITLE = 'SET_MODEL_DEFAULT_TITLE';
export const SET_MODEL_DEFAULT_CONTENT = 'SET_MODEL_DEFAULT_CONTENT';
export const SET_MODEL_DEFAULT_TAG = 'SET_MODEL_DEFAULT_TAG';

// 弹出层中的组件切换数据保存到后台的事件
export const SET_MODEL_SAVE_ID = 'SET_MODEL_SAVE_ID';
export const SET_MODEL_SAVE_SORT_ID = 'SET_MODEL_SAVE_SORT_ID';
export const SET_MODEL_SAVE_SORT_NAME = 'SET_MODEL_SAVE_SORT_NAME';
export const SET_MODEL_SAVE_TITLE = 'SET_MODEL_SAVE_TITLE';
export const SET_MODEL_SAVE_CONTENT = 'SET_MODEL_SAVE_CONTENT';
export const SET_MODEL_SAVE_TAG = 'SET_MODEL_SAVE_TAG';


const setSortList = cac(SET_SORT_LIST, 'data');
const setTagList = cac(SET_TAG_LIST, 'data');
const setSelectedSort = cac(SET_SELECTED_SORT, 'data');
const setArticleCount = cac(SET_ARTICLE_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setArticleList = cac(SET_ARTICLE_LIST, 'data');

const setModelVisible = cac(SET_MODEL_VISIBLE, 'data');
const setModelDefaultSortId = cac(SET_MODEL_DEFAULT_SORT_ID, 'data');
const setModelDefaultTitle = cac(SET_MODEL_DEFAULT_TITLE, 'data');
const setModelDefaultContent = cac(SET_MODEL_DEFAULT_CONTENT, 'data');
const setModelDefaultTag = cac(SET_MODEL_DEFAULT_TAG, 'data');

const setModelSaveId = cac(SET_MODEL_SAVE_ID, 'data');
const setModelSaveSortId = cac(SET_MODEL_SAVE_SORT_ID, 'data');
const setModelSaveSortName = cac(SET_MODEL_SAVE_SORT_NAME, 'data');
const setModelSaveTitle = cac(SET_MODEL_SAVE_TITLE, 'data');
const setModelSaveContent = cac(SET_MODEL_SAVE_CONTENT, 'data');
const setModelSaveTag = cac(SET_MODEL_SAVE_TAG, 'data');


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
		const url = ENV.baseUrl + "/sortAction/byTypeGetSort";
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
		const url = ENV.baseUrl + "/articleAction/getArticleCount";
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
		const url = ENV.baseUrl + "/articleAction/getArticleList";
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

// 获取单个文章
export function getArticle (articleId) {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/articleAction/getArticle";
		const method = "POST";
		const body = {
			"selectId" : articleId
		};
		const errInfo = "请求文章信息连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(modelVisibleChange(true));
            // 给弹出层的组件设置初始化数据
			dispatch(setModelDefaultSortId(data.sortId));
            dispatch(setModelDefaultTitle(data.title));
            dispatch(setModelDefaultContent(data.content));
            dispatch(setModelDefaultTag(data.tag.split(",")));

            // 设置弹出层的组件的保存数据
            dispatch(setModelSaveId(data.id));
			dispatch(modelSaveSortIdChange(data.sortId));
			dispatch(modelSaveSortNameChange(data.sortName));
            dispatch(modelSaveTitleChange(data.title));
            dispatch(modelSaveContentChange(data.content));
            dispatch(modelSaveTagChange(data.tag.split(",")));
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

// 设置弹出层中分类NAME改变事件
export function modelSaveSortNameChange (sortName) {
	return (dispatch, getState) => {
		console.info(sortName);
		dispatch(setModelSaveSortName(sortName));
	}
}

// 设置弹出层中文章名称改变事件
export function modelSaveTitleChange (title) {
    return (dispatch, getState) => {
        dispatch(setModelSaveTitle(title));
    }
}

// 设置弹出层中文章内容改变事件
export function modelSaveContentChange (content) {
    return (dispatch, getState) => {
        dispatch(setModelSaveContent(content));
    }
}

// 设置弹出层中文章标签改变事件
export function modelSaveTagChange (tag) {
    return (dispatch, getState) => {
        dispatch(setModelSaveTag(tag));
    }
}

// 更新文章
export function updateArticle () {
	return (dispatch, getState) => {

		console.info(getState().editArticle);
		const url = ENV.baseUrl + "/articleAction/updateArticle";
		const method = "POST";
		const body = {
			"id"       : getState().editArticle.modelSaveId,
			"sortId"   : getState().editArticle.modelSaveSortId,
			"sortName" : encodeURI(encodeURI(getState().editArticle.modelSaveSortName)),
			"title"    : encodeURI(encodeURI(getState().editArticle.modelSaveTitle)),
			"content"  : getState().editArticle.modelSaveContent,
			"tags"     : encodeURI(encodeURI(getState().editArticle.modelSaveTag))
		};
		const errInfo = "修改文章连接出错！";
		fetchComponent.send(self, url, method, body, errInfo, function(data){
			message.success(data.msg+"！", 3);
			dispatch(getArticleList());
			dispatch(setModelVisible(false));
		});
	}
}