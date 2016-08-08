/* Populated by react-webpack-redux:action */
import jQuery from 'jquery';

import {cac} from '../utils/index';

export const RECEIVE_NEWS_LIST = 'RECEIVE_NEWS_LIST';
export const SET_KEYWORD = 'SET_KEYWORD';
export const PAGE_SIZE = 10;
export const SET_CURRENT_NEWS = 'SET_CURRENT_NEWS';
export const CHANGE_KEYWORD = 'CHANGE_KEYWORD';

const receiveList = cac(RECEIVE_NEWS_LIST, 'data', 'page');
const setKeyword = cac(SET_KEYWORD, 'value');
const setCurrent = cac(SET_CURRENT_NEWS, 'news');

export const changeKeyword = cac(CHANGE_KEYWORD, 'keyword');

export function fetchList (keyword, page=1){
	return (dispatch, getState) => {
		if(!keyword){
			keyword = getState().news.keyword
		}else{
			dispatch(setKeyword(keyword))
		}
		jQuery.ajax({
			url: 'http://www.tngou.net/api/search',
			data: { keyword, name: 'topword', page, rows:PAGE_SIZE },
			dataType: 'jsonp',
			success: (data)=>{
				if(data.status){
          dispatch(receiveList(data, page))
        }

			}
		})
	}
}


export const chooseNews = index => (dispatch, getState) => {
	let current = getState().news.list[index];
	dispatch(setCurrent(current));
}

export const fetchNewsDetail = id => dispatch => jQuery.ajax({
	url: 'http://www.tngou.net/api/top/show',
	data: {id},
	dataType: 'jsonp',
	success: data => data.status && dispatch(setCurrent(data))
})
