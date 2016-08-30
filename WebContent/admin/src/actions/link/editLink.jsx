/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_LINK_COUNT = 'SET_LINK_COUNT';
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
export const SET_LINK_LIST = 'SET_LINK_LIST';

// 给弹出层中的组件设置默认数据的事件
export const SET_MODEL_VISIBLE = 'SET_MODEL_VISIBLE';
export const SET_MODEL_DEFAULT_NAME = 'SET_MODEL_DEFAULT_NAME';
export const SET_MODEL_DEFAULT_URL = 'SET_MODEL_DEFAULT_URL';

// 弹出层中的组件切换数据保存到后台的事件
export const SET_MODEL_SAVE_ID = 'SET_MODEL_SAVE_ID';
export const SET_MODEL_SAVE_NAME = 'SET_MODEL_SAVE_NAME';
export const SET_MODEL_SAVE_URL = 'SET_MODEL_SAVE_URL';


const setLinkCount = cac(SET_LINK_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setLinkList = cac(SET_LINK_LIST, 'data');

const setModelVisible = cac(SET_MODEL_VISIBLE, 'data');
const setModelDefaultName = cac(SET_MODEL_DEFAULT_NAME, 'data');
const setModelDefaultUrl = cac(SET_MODEL_DEFAULT_URL, 'data');

const setModelSaveId = cac(SET_MODEL_SAVE_ID, 'data');
const setModelSaveName = cac(SET_MODEL_SAVE_NAME, 'data');
const setModelSaveUrl = cac(SET_MODEL_SAVE_URL, 'data');




// 获取外链总数
export function getLinkCount () {
    return (dispatch, getState) => {
        const url = "/doit/linkAction/getLinkCount";
        const method = "POST";
        const body = {};
        const errInfo = "请求外链总个数连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
            dispatch(setLinkCount(data.data));
            dispatch(selectedPageChange(1));
        });
    }
}

// 分页切换事件
export function selectedPageChange (pageId) {
    return (dispatch, getState) => {
        dispatch(setSelectedPage(pageId));
        dispatch(getLinkList());
    }
}

// 获取外链列表
export function getLinkList () {
    return (dispatch, getState) => {
        const url = "/doit/linkAction/getLinkList";
        const method = "POST";
        const body = {
            "page" : getState().editLink.selectedPage,
            "size" : 10
        };
        const errInfo = "请求外链列表连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
            dispatch(setLinkList(data.data));
        });
    }
}

// 获取单个外链
export function getLink (linkId) {
	return (dispatch, getState) => {
		const url = "/doit/linkAction/getLink";
		const method = "POST";
		const body = {
			"selectId" : linkId
		};
		const errInfo = "请求外链信息连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(modelVisibleChange(true));

            // 给弹出层的组件设置初始化数据
            dispatch(setModelDefaultName(data.name));
            dispatch(setModelDefaultUrl(data.url));

            // 设置弹出层的组件的保存数据
            dispatch(setModelSaveId(data.id));
            dispatch(modelSaveNameChange(data.name));
            dispatch(modelSaveUrlChange(data.url));
		});
	}
}

// 设置弹出层是否显示事件
export function modelVisibleChange (visible) {
	return (dispatch, getState) => {
		dispatch(setModelVisible(visible));
	}
}

// 设置弹出层中外链人改变事件
export function modelSaveNameChange (name) {
    return (dispatch, getState) => {
        dispatch(setModelSaveName(name));
    }
}

// 设置弹出层中外链内容改变事件
export function modelSaveUrlChange (url) {
	return (dispatch, getState) => {
		dispatch(setModelSaveUrl(url));
	}
}

// 更新外链
export function updateLink () {
	return (dispatch, getState) => {
		const url = "/doit/linkAction/updateLink";
		const method = "POST";
		const body = {
			"id"   : getState().editLink.modelSaveId,
			"name" : encodeURI(encodeURI(getState().editLink.modelSaveName)),
			"url"  : encodeURI(encodeURI(getState().editLink.modelSaveUrl))
		};
		const errInfo = "修改外链连接出错！";
		fetchComponent.send(self, url, method, body, errInfo, function(data){
			message.success(data.msg+"！", 3);
			dispatch(getLinkList());
			dispatch(setModelVisible(false));
		});
	}
}