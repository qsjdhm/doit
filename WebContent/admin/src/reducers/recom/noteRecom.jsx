import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    SET_SORT_LIST,
	SET_SELECTED_SORT,
	SET_NOTE_COUNT,
	SET_SELECTED_PAGE,
	SET_NOTE_LIST,

	SET_MODEL_VISIBLE,
    SET_MODEL_DEFAULT_RECOM,
    SET_MODEL_DEFAULT_READ,

    SET_MODEL_SAVE_ID,
	SET_MODEL_SAVE_RECOM,
    SET_MODEL_SAVE_READ
} from '../../actions/recom/noteRecom';


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

    // 设置弹出层显示状态
    modelVisible: cr(false, {
        [SET_MODEL_VISIBLE](state, {data}){return data}
    }),
    // 设置弹出层中默认的笔记推荐量
    modelDefaultRecom: cr('', {
        [SET_MODEL_DEFAULT_RECOM](state, {data}){return data}
    }),
    // 设置弹出层中默认的笔记点击量
    modelDefaultRead: cr('', {
        [SET_MODEL_DEFAULT_READ](state, {data}){return data}
    }),

    // 设置弹出层中用于保存给后台的笔记ID
    modelSaveId: cr(0, {
        [SET_MODEL_SAVE_ID](state, {data}){return data}
    }),
    // 设置弹出层中用于保存给后台的推荐量
    modelSaveRecom: cr('', {
        [SET_MODEL_SAVE_RECOM](state, {data}){return data}
    }),
    // 设置弹出层中用于保存给后台的阅读量
    modelSaveRead: cr('', {
        [SET_MODEL_SAVE_READ](state, {data}){return data}
    })
});
