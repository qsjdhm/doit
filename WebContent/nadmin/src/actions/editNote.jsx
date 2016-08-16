/* Populated by react-webpack-redux:action */

import fetchComponent      from '../components/fetch/js/fetchComponent';
import { cac }             from '../utils/index';

export const SET_SORT_LIST = 'SET_SORT_LIST';
export const SET_TAG_LIST = 'SET_TAG_LIST';
export const SET_SELECTED_SORT = 'SET_SELECTED_SORT';
export const SET_NOTE_COUNT = 'SET_NOTE_COUNT';
export const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE';
export const SET_NOTE_LIST = 'SET_NOTE_LIST';

export const SET_MODEL_VISIBLE = 'SET_MODEL_VISIBLE';
export const SET_MODEL_DEFAULT_SORT_ID = 'SET_MODEL_DEFAULT_SORT_ID';
export const SET_MODEL_DEFAULT_TITLE = 'SET_MODEL_DEFAULT_TITLE';
export const SET_MODEL_DEFAULT_CONTENT = 'SET_MODEL_DEFAULT_CONTENT';
export const SET_MODEL_DEFAULT_TAG = 'SET_MODEL_DEFAULT_TAG';

export const SET_MODEL_SAVE_ID = 'SET_MODEL_SAVE_ID';
export const SET_MODEL_SAVE_SORT_ID = 'SET_MODEL_SAVE_SORT_ID';
export const SET_MODEL_SAVE_TITLE = 'SET_MODEL_SAVE_TITLE';
export const SET_MODEL_SAVE_CONTENT = 'SET_MODEL_SAVE_CONTENT';
export const SET_MODEL_SAVE_TAG = 'SET_MODEL_SAVE_TAG';



const setSortList = cac(SET_SORT_LIST, 'data');
const setTagList = cac(SET_TAG_LIST, 'data');
const setSelectedSort = cac(SET_SELECTED_SORT, 'data');
const setNoteCount = cac(SET_NOTE_COUNT, 'data');
const setSelectedPage = cac(SET_SELECTED_PAGE, 'data');
const setNoteList = cac(SET_NOTE_LIST, 'data');

const setModelVisible = cac(SET_MODEL_VISIBLE, 'data');
const setModelDefaultSortId = cac(SET_MODEL_DEFAULT_SORT_ID, 'data');
const setModelDefaultTitle = cac(SET_MODEL_DEFAULT_TITLE, 'data');
const setModelDefaultContent = cac(SET_MODEL_DEFAULT_CONTENT, 'data');
const setModelDefaultTag = cac(SET_MODEL_DEFAULT_TAG, 'data');

const setModelSaveId = cac(SET_MODEL_SAVE_ID, 'data');
const setModelSaveSortId = cac(SET_MODEL_SAVE_SORT_ID, 'data');
const setModelSaveTitle = cac(SET_MODEL_SAVE_TITLE, 'data');
const setModelSaveContent = cac(SET_MODEL_SAVE_CONTENT, 'data');
const setModelSaveTag = cac(SET_MODEL_SAVE_TAG, 'data');


export function getSortList () {
    return (dispatch, getState) => {
        const url = '/doit/sortAction/byTypeGetSort';
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

export function selectedSortChange (sortId) {
	return (dispatch, getState) => {
		dispatch(setSelectedSort(sortId));
		dispatch(getNoteCount());
	}
}

export function getTagList () {
	return (dispatch, getState) => {
		const url = "/doit/sortAction/byTypeGetSort";
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


export function getNoteCount () {
	return (dispatch, getState) => {
		const url = "/doit/noteAction/getNoteCount";
		const method = "POST";
		const body = {
			"sort" : getState().editNote.selectedSort
		};
		const errInfo = "请求笔记总个数连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setNoteCount(data.data));
			dispatch(selectedPageChange(1));
		});
	}
}

export function selectedPageChange (pageId) {
	return (dispatch, getState) => {
		dispatch(setSelectedPage(pageId));
		dispatch(getNoteList());
	}
}

export function getNoteList () {
	return (dispatch, getState) => {
		const url = "/doit/noteAction/getNoteList";
		const method = "POST";
		const body = {
			"sort" : getState().editNote.selectedSort,
			"page" : getState().editNote.selectedPage,
			"size" : 10
		};
		const errInfo = "请求笔记列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setNoteList(data.data));
		});
	}
}

export function getNote (noteId) {
	return (dispatch, getState) => {
		const url = "/doit/noteAction/getNote";
		const method = "POST";
		const body = {
			"selectId" : noteId
		};
		const errInfo = "请求笔记信息连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(modelVisibleChange(true));
			dispatch(setModelDefaultSortId(data.sortId));
            dispatch(setModelDefaultTitle(data.title));
            dispatch(setModelDefaultContent(data.content));
            dispatch(setModelDefaultTag(data.tag));

            dispatch(setModelSaveId(data.id));
			dispatch(modelSaveSortIdChange(data.sortId));
            dispatch(modelSaveTitleChange(data.title));
            dispatch(modelSaveContentChange(data.content));
            dispatch(modelSaveTagChange(data.tag.split(",")));
		});
	}
}

export function modelVisibleChange (visible) {
	return (dispatch, getState) => {
		dispatch(setModelVisible(visible));
	}
}

export function modelSaveSortIdChange (sortId) {
	return (dispatch, getState) => {
		dispatch(setModelSaveSortId(sortId));
	}
}

export function modelSaveTitleChange (title) {
    return (dispatch, getState) => {
        dispatch(setModelSaveTitle(title));
    }
}

export function modelSaveContentChange (content) {
    return (dispatch, getState) => {
        dispatch(setModelSaveContent(content));
    }
}

export function modelSaveTagChange (tag) {
    return (dispatch, getState) => {
        console.info(tag);
        dispatch(setModelSaveTag(tag));
    }
}
