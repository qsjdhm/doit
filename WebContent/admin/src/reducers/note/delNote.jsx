import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    // 页面所使用的数据
    SET_SORT_LIST,
	SET_TAG_LIST,
	SET_SELECTED_SORT,
	SET_NOTE_COUNT,
	SET_SELECTED_PAGE,
	SET_NOTE_LIST,
    SET_SELECTED_ROW_KEYS,
	SET_HAS_SELECTED,
	SET_LOADING
} from '../../actions/note/delNote';


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
    selectedSort: cr('', {
        [SET_SELECTED_SORT](state, {data}){return data}
    }),
    // 设置笔记总数
    noteCount: cr(0, {
        [SET_NOTE_COUNT](state, {data}){return data}
    }),
    // 设置当前选中的页数
    selectedPage: cr(1, {
        [SET_SELECTED_PAGE](state, {data}){return data}
    }),
    // 设置笔记列表
    noteList: cr([], {
        [SET_NOTE_LIST](state, {data}){
			let noteArray = [];
			for( let item of data ){
				item.key = item.Article_ID;
				noteArray.push(item);
			}
			return noteArray;
		}
    }),
    // 设置当前选中笔记的key
    selectedRowKeys: cr([], {
        [SET_SELECTED_ROW_KEYS](state, {data}){
            return data;
        }
    }),
	// 设置当前表格是否有选中
	hasSelected : cr(false, {
		[SET_HAS_SELECTED](state, {data}){
			return data;
		}
	}),
	// 删除按钮是否等待
	loading : cr(false, {
		[SET_LOADING](state, {data}){
			return data;
		}
	}),
});
