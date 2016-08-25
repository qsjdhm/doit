import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    // 页面所使用的数据
    SET_SORT_LIST,
	SET_TAG_LIST,
    SET_SELECTED_SORT_ID,
    SET_SELECTED_SORT_NAME,
    SET_TITLE,
    SET_CONTENT,
    SET_SELECTED_TAG,
	SET_LOADING
} from '../../actions/note/addNote';


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
	// 设置所有笔记的标签列表
	tagList: cr([], {
		[SET_TAG_LIST](state, {data}){
            let tagArray = [];
            for(let item of data){
                tagArray.push( {'id' : item.Sort_ID, 'name' : item.Sort_Name} );
            }
            return tagArray;
        }
	}),
    // 设置当前选中的分类ID
    selectedSortId: cr('', {
        [SET_SELECTED_SORT_ID](state, {data}){return data}
    }),
    // 设置当前选中的分类NAME
    selectedSortName: cr('', {
        [SET_SELECTED_SORT_NAME](state, {data}){return data}
    }),
    // 设置笔记标题
    title: cr('', {
        [SET_TITLE](state, {data}){return data}
    }),
    // 设置笔记内容
    content: cr('', {
        [SET_CONTENT](state, {data}){return data}
    }),
    // 设置笔记选中的标签
    selectedTag: cr([], {
        [SET_SELECTED_TAG](state, {data}){return data}
    }),
    // 新增按钮是否等待
    loading: cr(false, {
        [SET_LOADING](state, {data}){return data;}
    })
});
