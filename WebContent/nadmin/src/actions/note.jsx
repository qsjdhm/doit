/* Populated by react-webpack-redux:action */

import fetchComponent      from '../components/fetch/js/fetchComponent';
import { cac } from "../utils/index";

export const SET_SORT_LIST = "SET_SORT_LIST";
export const SORT_CHANGE = "SORT_CHANGE";
export const SET_NOTE_COUNT = "SET_NOTE_COUNT";
export const SET_NOTE_LIST = "SET_NOTE_LIST";
export const PAGE_CHANGE = "PAGE_CHANGE";
export const SET_VISIBLE = "SET_VISIBLE";
export const SET_SELECTED_NODE_TITLE = "SET_SELECTED_NODE_TITLE";
export const SET_SELECTED_NODE_SORE = "SET_SELECTED_NODE_SORE";
export const SET_SELECTED_NODE_SORE2 = "SET_SELECTED_NODE_SORE2";
export const SET_MODEL_NOTE = "SET_MODEL_NOTE";


const setSortList = cac(SET_SORT_LIST, 'data');
const setNoteCount = cac(SET_NOTE_COUNT, 'data');
const setNoteList = cac(SET_NOTE_LIST, 'data');
const setSortId = cac(SORT_CHANGE, 'data');
const setPageId = cac(PAGE_CHANGE, 'data');
const setVisible = cac(SET_VISIBLE, 'data');
const setSelectedNodeTitle = cac(SET_SELECTED_NODE_TITLE, 'data');
const setSelectedNodeSort = cac(SET_SELECTED_NODE_SORE, 'data');
const setSelectedNodeSort2 = cac(SET_SELECTED_NODE_SORE2, 'data');
const setModelNote = cac(SET_MODEL_NOTE, 'data');


export function byTypeGetSort () {
    return (dispatch, getState) => {
        const url = "/doit/sortAction/byTypeGetSort";
        const method = "POST";
        const body = {
            "type" : "note"
        };
        const errInfo = "请求笔记分类连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(sortSelectChange(data.data[0].Sort_ID));
			dispatch(pageSelectChange(1));
			dispatch(setSortList(data.data));
			dispatch(getNoteCount());
			dispatch(getNoteList());
        });
    }
}

export function sortSelectChange (sortId) {
	return (dispatch, getState) => {
			dispatch(setSortId(sortId));
			dispatch(pageSelectChange(1));
			dispatch(getNoteCount());
			dispatch(getNoteList());
	}
}

export function pageSelectChange (pageId) {
	return (dispatch, getState) => {
		dispatch(setPageId(pageId));
		dispatch(getNoteList());
	}
}

export function modelChange (visible) {
	return (dispatch, getState) => {
		dispatch(setVisible(visible));
	}
}


export function modelTitleChange (title) {
	return (dispatch, getState) => {
		dispatch(setSelectedNodeTitle(title));
	}
}


export function modelSortChange (sortId) {
	return (dispatch, getState) => {
		dispatch(setSelectedNodeSort(sortId));
	}
}

export function setModelSort (sortId) {
	return (dispatch, getState) => {
		dispatch(setSelectedNodeSort2(sortId));
	}
}


export function getNote (id) {
	return (dispatch, getState) => {
		const url = "/doit/noteAction/getNote";
		const method = "POST";
		const body = {
			"selectId" : id
		};
		const errInfo = "请求笔记信息连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			console.info(data);
			dispatch(setModelNote(data));
			dispatch(setSelectedNodeSort(data.sortId));
		});
	}
}

export function getNoteCount () {
	return (dispatch, getState) => {
		const url = "/doit/noteAction/getNoteCount";
		const method = "POST";
		const body = {
			"sort" : getState().note.selectedSort
		};
		const errInfo = "请求笔记总个数连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setNoteCount(data.data));
		});
	}

}


export function getNoteList () {
	return (dispatch, getState) => {
		const url = "/doit/noteAction/getNoteList";
		const method = "POST";
		const body = {
			"sort" : getState().note.selectedSort,
			"page" : getState().note.selectedPage,
			"size" : 10
		};
		const errInfo = "请求笔记列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, function(data){
			dispatch(setNoteList(data.data));
		});
	}
}



