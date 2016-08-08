/* Combine all available reducers to a single root reducer.
 *
 * CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import {combineReducers} from 'redux';
import {cr} from '../utils/index';
import {RECEIVE_NEWS_LIST, CHANGE_KEYWORD, PAGE_SIZE, SET_CURRENT_NEWS} from '../actions/news';


export default combineReducers({
	list: cr([], {
		[RECEIVE_NEWS_LIST](state, {data}){return data.tngou}
	}),
	totalPage: cr(0, {
		[RECEIVE_NEWS_LIST](state, {data}){return Math.ceil(data.total/PAGE_SIZE)}
	}),
	page: cr(1, {
		[RECEIVE_NEWS_LIST](state, {page}){return page}
	}),
	keyword: cr('', {
		[CHANGE_KEYWORD](state, {keyword}){return keyword}
	}),
	current: cr({}, {
		[SET_CURRENT_NEWS](state, {news}){return news}
	})
})
