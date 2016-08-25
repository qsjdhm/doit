import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    // 页面所使用的数据
    SET_SORT_LIST,
	SET_SELECTED_SORT_ID,
	SET_BOOK_COUNT,
	SET_SELECTED_PAGE,
	SET_BOOK_LIST,

    // 弹出层所使用的初始数据
	SET_MODEL_VISIBLE,
    SET_MODEL_DEFAULT_SORT_ID,
    SET_MODEL_DEFAULT_TITLE,
    SET_MODEL_DEFAULT_HEIGHT,
    SET_MODEL_DEFAULT_PATH,

    // 弹出层所使用的保存到后台的数据
    SET_MODEL_SAVE_ID,
    SET_MODEL_SAVE_COVER,
    SET_MODEL_SAVE_SORT_ID,
	SET_MODEL_SAVE_SORT_NAME,
    SET_MODEL_SAVE_TITLE,
    SET_MODEL_SAVE_HEIGHT,
    SET_MODEL_SAVE_PATH
} from '../../actions/book/editBook';


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
    // 设置图书总数
    bookCount: cr(0, {
        [SET_BOOK_COUNT](state, {data}){return data}
    }),
    // 设置当前选中的页数
    selectedPage: cr(1, {
        [SET_SELECTED_PAGE](state, {data}){return data}
    }),
    // 设置图书列表
    bookList: cr([], {
        [SET_BOOK_LIST](state, {data}){
			let bookArray = [];
			for( let item of data ){
				item.key = item.Book_ID;
				bookArray.push(item);
			}
			return bookArray;
		}
    }),

    // 设置弹出层显示状态
    modelVisible: cr(false, {
        [SET_MODEL_VISIBLE](state, {data}){return data}
    }),
    // 设置弹出层中默认的图书分类
    modelDefaultSortId: cr('', {
        [SET_MODEL_DEFAULT_SORT_ID](state, {data}){return data}
    }),
    // 设置弹出层中默认的图书名称
    modelDefaultTitle: cr('', {
        [SET_MODEL_DEFAULT_TITLE](state, {data}){return data}
    }),
    // 设置弹出层中默认的图书高度
    modelDefaultHeight: cr('', {
        [SET_MODEL_DEFAULT_HEIGHT](state, {data}){return data}
    }),
    // 设置弹出层中默认的图书下载路径 
    modelDefaultPath: cr('', {
        [SET_MODEL_DEFAULT_PATH](state, {data}){return data}
    }),

    // 设置弹出层中用于保存给后台的图书ID
    modelSaveId: cr(0, {
        [SET_MODEL_SAVE_ID](state, {data}){return data}
    }),
    // 设置弹出层中用于保存给后台的图书封面
    modelSaveCover: cr('', {
        [SET_MODEL_SAVE_COVER](state, {data}){return data}
    }),
	// 设置弹出层中用于保存给后台的分类ID
	modelSaveSortId: cr('', {
		[SET_MODEL_SAVE_SORT_ID](state, {data}){return data}
	}),
	// 设置弹出层中用于保存给后台的分类NAME
	modelSaveSortName: cr('', {
		[SET_MODEL_SAVE_SORT_NAME](state, {data}){return data}
	}),
    // 设置弹出层中用于保存给后台的名称
    modelSaveTitle: cr('', {
        [SET_MODEL_SAVE_TITLE](state, {data}){return data}
    }),
    // 设置弹出层中用于保存给后台的高度
    modelSaveHeight: cr('', {
        [SET_MODEL_SAVE_HEIGHT](state, {data}){return data}
    }),
    // 设置弹出层中用于保存给后台的下载路径
    modelSavePath: cr('', {
        [SET_MODEL_SAVE_PATH](state, {data}){return data}
    }),
});
