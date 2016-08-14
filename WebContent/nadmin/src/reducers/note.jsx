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
import {SET_MODEL_NOTE, SET_SELECTED_NODE_SORE, SET_SELECTED_NODE_TITLE, SET_VISIBLE, SET_SORT_LIST, SET_NOTE_COUNT, SET_NOTE_LIST, SORT_CHANGE, PAGE_CHANGE, RESET_PAGE_DOM} from '../actions/note';


export default combineReducers({
	sortArray: cr([], {
		[SET_SORT_LIST](state, {data}){return data}
	}),
	selectedSort: cr('', {
		[SORT_CHANGE](state, {data}){return data}
	}),
	selectedPage: cr(1, {
		[PAGE_CHANGE](state, {data}){return data}
	}),
	noteCount: cr([], {
		[SET_NOTE_COUNT](state, {data}){return data}
	}),
	noteList: cr([], {
		[SET_NOTE_LIST](state, {data}){return data}
	}),
	visible: cr(false, {
		[SET_VISIBLE](state, {data}){return data}
	}),
	selectedNoteTitle: cr('', {
		[SET_SELECTED_NODE_TITLE](state, {data}){return data}
	}),
	selectedNoteSort: cr('', {
		[SET_SELECTED_NODE_SORE](state, {data}){return data}
	}),
	modelNote: cr({}, {
		[SET_MODEL_NOTE](state, {data}){return data}
	}),
});
