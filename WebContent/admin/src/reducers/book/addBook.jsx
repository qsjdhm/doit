import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    // 页面所使用的数据
    SET_SORT_LIST,
    SET_SELECTED_SORT_ID,
    SET_SELECTED_SORT_NAME,
    SET_TITLE,
    SET_HEIGHT,
    SET_COVER,
    SET_PATH,
	SET_LOADING
} from '../../actions/book/addBook';


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
    // 设置当前选中的分类ID
    selectedSortId: cr('', {
        [SET_SELECTED_SORT_ID](state, {data}){return data}
    }),
    // 设置当前选中的分类NAME
    selectedSortName: cr('', {
        [SET_SELECTED_SORT_NAME](state, {data}){return data}
    }),
    // 设置图书标题
    title: cr('', {
        [SET_TITLE](state, {data}){return data}
    }),
    // 设置图书高度
    height: cr('', {
        [SET_HEIGHT](state, {data}){return data}
    }),
    // 设置图书封面
    cover: cr('', {
        [SET_COVER](state, {data}){return data}
    }),
    // 设置图书下载路径
    path: cr('', {
        [SET_PATH](state, {data}){return data}
    }),
    // 新增按钮是否等待
    loading: cr(false, {
        [SET_LOADING](state, {data}){return data;}
    })
});
