import {combineReducers} from 'redux';
import {cr} from '../utils/index';
import {
    SET_SORT_LIST
} from '../actions/editNote';


export default combineReducers({
    // 设置分类列表
    sortList: cr([], {
        [SET_SORT_LIST](state, {data}){
            let sortArray = [];
            for ( let item of data ) {
                sortArray.push( {'id' : item.Sort_ID, 'name' : item.Sort_Name} );
            }
            return sortArray;
        }
    }),
    //// 设置当前选中的分类ID
    //selectedSort: cr('', {
    //    [SET_SELECTED_SORT](state, {data}){return data}
    //}),
    //// 设置笔记总数
    //noteCount: cr(0, {
    //    [SET_NOTE_COUNT](state, {data}){return data}
    //}),
    //// 设置当前选中的页数
    //selectedPage: cr(1, {
    //    [SET_SELECTED_PAGE](state, {data}){return data}
    //}),
    //// 设置笔记列表
    //noteList: cr([], {
    //    [SET_NOTE_LIST](state, {data}){return data}
    //}),
    //// 设置弹出层显示状态
    //modelVisible: cr(false, {
    //    [SET_MODEL_VISIBLE](state, {data}){return data}
    //}),
    //// 设置所有笔记的标签列表
    //modelTagList: cr([], {
    //    [SET_MODEL_TAG_LIST](state, {data}){return data}
    //}),
    //// 设置弹出层中的笔记分类ID
    //modelNoteId: cr(0, {
    //    [SET_MODEL_NOTE_ID](state, {data}){return data}
    //}),
    //// 设置弹出层中的笔记分类ID
    //modelNoteSort: cr('', {
    //    [SET_MODEL_NOTE_SORT](state, {data}){return data}
    //}),
    //// 设置弹出层中的笔记名称
    //modelNoteTitle: cr('', {
    //    [SET_MODEL_NOTE_TITLE](state, {data}){return data}
    //}),
    //// 设置弹出层中的笔记内容
    //modelNoteContent: cr('', {
    //    [SET_MODEL_NOTE_CONTENT](state, {data}){return data}
    //}),
    //// 设置弹出层中的笔记标签
    //modelNoteTag: cr('', {
    //    [SET_MODEL_NOTE_TAG](state, {data}){return data}
    //})
});
