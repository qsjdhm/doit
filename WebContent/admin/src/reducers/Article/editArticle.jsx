import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    SET_SORT_LIST,
	SET_TAG_LIST,
	SET_SELECTED_SORT,
	SET_ARTICLE_COUNT,
	SET_SELECTED_PAGE,
	SET_ARTICLE_LIST,

	SET_MODEL_VISIBLE,
    SET_MODEL_DEFAULT_SORT_ID,
    SET_MODEL_DEFAULT_TITLE,
    SET_MODEL_DEFAULT_CONTENT,
    SET_MODEL_DEFAULT_TAG,

    SET_MODEL_SAVE_ID,
    SET_MODEL_SAVE_SORT_ID,
	SET_MODEL_SAVE_SORT_NAME,
    SET_MODEL_SAVE_TITLE,
    SET_MODEL_SAVE_CONTENT,
    SET_MODEL_SAVE_TAG
} from '../../actions/article/editArticle';


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
	// 设置所有文章的标签列表
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
    // 设置文章总数
    articleCount: cr(0, {
        [SET_ARTICLE_COUNT](state, {data}){return data}
    }),
    // 设置当前选中的页数
    selectedPage: cr(1, {
        [SET_SELECTED_PAGE](state, {data}){return data}
    }),
    // 设置文章列表
    articleList: cr([], {
        [SET_ARTICLE_LIST](state, {data}){
			let articleArray = [];
			for( let item of data ){
				item.key = item.Article_ID;
                articleArray.push(item);
			}
			return articleArray;
		}
    }),

    // 设置弹出层显示状态
    modelVisible: cr(false, {
        [SET_MODEL_VISIBLE](state, {data}){return data}
    }),
    // 设置弹出层中默认的文章分类
    modelDefaultSortId: cr('', {
        [SET_MODEL_DEFAULT_SORT_ID](state, {data}){return data}
    }),
    // 设置弹出层中默认的文章名称
    modelDefaultTitle: cr('', {
        [SET_MODEL_DEFAULT_TITLE](state, {data}){return data}
    }),
    // 设置弹出层中默认的文章内容
    modelDefaultContent: cr('', {
        [SET_MODEL_DEFAULT_CONTENT](state, {data}){return data}
    }),
    // 设置弹出层中默认的文章标签
    modelDefaultTag: cr('', {
        [SET_MODEL_DEFAULT_TAG](state, {data}){return data}
    }),

    // 设置弹出层中用于保存给后台的文章ID
    modelSaveId: cr(0, {
        [SET_MODEL_SAVE_ID](state, {data}){return data}
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
    // 设置弹出层中用于保存给后台的内容
    modelSaveContent: cr('', {
        [SET_MODEL_SAVE_CONTENT](state, {data}){return data}
    }),
    // 设置弹出层中用于保存给后台的标签
    modelSaveTag: cr('', {
        [SET_MODEL_SAVE_TAG](state, {data}){return data}
    }),
});
