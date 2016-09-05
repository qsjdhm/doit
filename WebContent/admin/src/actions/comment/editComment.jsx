/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_COMMENT_COUNT = 'SET_COMMENT_COUNT';
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
export const SET_COMMENT_LIST = 'SET_COMMENT_LIST';

// 给弹出层中的组件设置默认数据的事件
export const SET_MODEL_VISIBLE = 'SET_MODEL_VISIBLE';
export const SET_MODEL_DEFAULT_USER = 'SET_MODEL_DEFAULT_USER';
export const SET_MODEL_DEFAULT_CONTENT = 'SET_MODEL_DEFAULT_CONTENT';

// 弹出层中的组件切换数据保存到后台的事件
export const SET_MODEL_SAVE_ID = 'SET_MODEL_SAVE_ID';
export const SET_MODEL_SAVE_USER = 'SET_MODEL_SAVE_USER';
export const SET_MODEL_SAVE_CONTENT = 'SET_MODEL_SAVE_CONTENT';


const setCommentCount = cac(SET_COMMENT_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setCommentList = cac(SET_COMMENT_LIST, 'data');

const setModelVisible = cac(SET_MODEL_VISIBLE, 'data');
const setModelDefaultUser = cac(SET_MODEL_DEFAULT_USER, 'data');
const setModelDefaultContent = cac(SET_MODEL_DEFAULT_CONTENT, 'data');

const setModelSaveId = cac(SET_MODEL_SAVE_ID, 'data');
const setModelSaveUser = cac(SET_MODEL_SAVE_USER, 'data');
const setModelSaveContent = cac(SET_MODEL_SAVE_CONTENT, 'data');




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
            "page" : getState().editComment.selectedPage,
            "size" : 10
        };
        const errInfo = "请求评论列表连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
            dispatch(setCommentList(data.data));
        });
    }
}

// 获取单个评论
export function getComment (commentId) {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/commentAction/getComment";
		const method = "POST";
		const body = {
			"selectId" : commentId
		};
		const errInfo = "请求评论信息连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(modelVisibleChange(true));

            // 给弹出层的组件设置初始化数据
            dispatch(setModelDefaultUser(data.userName));
            dispatch(setModelDefaultContent(data.content));

            // 设置弹出层的组件的保存数据
            dispatch(setModelSaveId(data.id));
            dispatch(modelSaveUserChange(data.userName));
            dispatch(modelSaveContentChange(data.content));
		});
	}
}

// 设置弹出层是否显示事件
export function modelVisibleChange (visible) {
	return (dispatch, getState) => {
		dispatch(setModelVisible(visible));
	}
}

// 设置弹出层中评论人改变事件
export function modelSaveUserChange (user) {
    return (dispatch, getState) => {
        dispatch(setModelSaveUser(user));
    }
}

// 设置弹出层中评论内容改变事件
export function modelSaveContentChange (content) {
	return (dispatch, getState) => {
		dispatch(setModelSaveContent(content));
	}
}

// 更新评论
export function updateComment () {
	return (dispatch, getState) => {
		const url = ENV.baseUrl + "/commentAction/updateComment";
		const method = "POST";
		const body = {
			"id"       : getState().editComment.modelSaveId,
			"userName" : encodeURI(encodeURI(getState().editComment.modelSaveUser)),
			"content"  : encodeURI(encodeURI(getState().editComment.modelSaveContent))
		};
		const errInfo = "修改评论连接出错！";
		fetchComponent.send(self, url, method, body, errInfo, function(data){
			message.success(data.msg+"！", 3);
			dispatch(getCommentList());
			dispatch(setModelVisible(false));
		});
	}
}