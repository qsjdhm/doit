import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    // 页面所使用的数据
    SET_SELECTED_SORT_ID,
    SET_NAME,
	SET_LOADING
} from '../../actions/sort/addSort';


export default combineReducers({
    // 设置当前选中的分类ID
    selectedSortId: cr('', {
        [SET_SELECTED_SORT_ID](state, {data}){return data}
    }),
    // 设置分类名称
    name: cr('', {
        [SET_NAME](state, {data}){return data}
    }),
    // 新增按钮是否等待
    loading: cr(false, {
        [SET_LOADING](state, {data}){return data;}
    })
});
