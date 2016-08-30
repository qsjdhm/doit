import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    // 页面所使用的数据
	SET_LINK_COUNT,
	SET_SELECTED_PAGE,
	SET_LINK_LIST,
    SET_SELECTED_ROW_KEYS,
	SET_HAS_SELECTED,
	SET_LOADING
} from '../../actions/link/delLink';


export default combineReducers({
    // 设置评论总数
    linkCount: cr(0, {
        [SET_LINK_COUNT](state, {data}){return data}
    }),
    // 设置当前选中的页数
    selectedPage: cr(1, {
        [SET_SELECTED_PAGE](state, {data}){return data}
    }),
    // 设置评论列表
    linkList: cr([], {
        [SET_LINK_LIST](state, {data}){
			let linkArray = [];
			for( let item of data ){
				item.key = item.Link_ID;
                linkArray.push(item);
			}
			return linkArray;
		}
    }),
    // 设置当前选中评论的key
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
