import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    // 页面所使用的数据
	SET_SELECTED_SORT,
	SET_SORT_COUNT,
	SET_SELECTED_PAGE,
    SET_SORT_LIST,
    SET_SELECTED_ROW_KEYS,
	SET_HAS_SELECTED,
	SET_LOADING
} from '../../actions/sort/delSort';


export default combineReducers({
    // 设置当前选中的分类ID
    selectedSortId: cr('', {
        [SET_SELECTED_SORT](state, {data}){return data}
    }),
    // 设置分类总数
    sortCount: cr(0, {
        [SET_SORT_COUNT](state, {data}){return data}
    }),
    // 设置当前选中的页数
    selectedPage: cr(1, {
        [SET_SELECTED_PAGE](state, {data}){return data}
    }),
    // 设置分类列表
    sortList: cr([], {
        [SET_SORT_LIST](state, {data}){
            let sortArray = [];
            for( let item of data ){
                item.key = item.Sort_ID;
                sortArray.push(item);
            }
            return sortArray;
        }
    }),
    // 设置当前选中分类的key
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
