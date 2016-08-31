import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    // 页面所使用的数据
	SET_SELECTED_SORT_ID,
	SET_SORT_COUNT,
	SET_SELECTED_PAGE,
    SET_SORT_LIST,

    // 弹出层所使用的初始数据
	SET_MODEL_VISIBLE,
    SET_MODEL_DEFAULT_SORT_ID,
    SET_MODEL_DEFAULT_NAME,

    // 弹出层所使用的保存到后台的数据
    SET_MODEL_SAVE_ID,
    SET_MODEL_SAVE_SORT_ID,
    SET_MODEL_SAVE_NAME
} from '../../actions/sort/editSort';


export default combineReducers({
    // 设置当前选中的父分类ID
    selectedSortId: cr('', {
        [SET_SELECTED_SORT_ID](state, {data}){return data}
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

    // 设置弹出层显示状态
    modelVisible: cr(false, {
        [SET_MODEL_VISIBLE](state, {data}){return data}
    }),
    // 设置弹出层中默认的父分类
    modelDefaultSortId: cr('', {
        [SET_MODEL_DEFAULT_SORT_ID](state, {data}){return data}
    }),
    // 设置弹出层中默认的分类名称
    modelDefaultName: cr('', {
        [SET_MODEL_DEFAULT_NAME](state, {data}){return data}
    }),

    // 设置弹出层中用于保存给后台的分类ID
    modelSaveId: cr(0, {
        [SET_MODEL_SAVE_ID](state, {data}){return data}
    }),
    // 设置弹出层中用于保存给后台的父分类ID
    modelSaveSortId: cr('', {
        [SET_MODEL_SAVE_SORT_ID](state, {data}){return data}
    }),
    // 设置弹出层中用于保存给后台的分类名称
    modelSaveName: cr('', {
        [SET_MODEL_SAVE_NAME](state, {data}){return data}
    }),
});
