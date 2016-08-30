import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    // 页面所使用的数据
	SET_COMMENT_COUNT,
	SET_SELECTED_PAGE,
	SET_COMMENT_LIST,

    // 弹出层所使用的初始数据
	SET_MODEL_VISIBLE,
    SET_MODEL_DEFAULT_USER,
    SET_MODEL_DEFAULT_CONTENT,

    // 弹出层所使用的保存到后台的数据
    SET_MODEL_SAVE_ID,
    SET_MODEL_SAVE_USER,
    SET_MODEL_SAVE_CONTENT
} from '../../actions/comment/editComment';


export default combineReducers({
    // 设置评论总数
    commentCount: cr(0, {
        [SET_COMMENT_COUNT](state, {data}){return data}
    }),
    // 设置当前选中的页数
    selectedPage: cr(1, {
        [SET_SELECTED_PAGE](state, {data}){return data}
    }),
    // 设置评论列表
    commentList: cr([], {
        [SET_COMMENT_LIST](state, {data}){
			let commentArray = [];
			for( let item of data ){
				item.key = item.Comment_ID;
                commentArray.push(item);
			}
			return commentArray;
		}
    }),

    // 设置弹出层显示状态
    modelVisible: cr(false, {
        [SET_MODEL_VISIBLE](state, {data}){return data}
    }),
    // 设置弹出层中默认的评论人
    modelDefaultUser: cr('', {
        [SET_MODEL_DEFAULT_USER](state, {data}){return data}
    }),
    // 设置弹出层中默认的评论内容
    modelDefaultContent: cr('', {
        [SET_MODEL_DEFAULT_CONTENT](state, {data}){return data}
    }),

    // 设置弹出层中用于保存给后台的评论ID
    modelSaveId: cr(0, {
        [SET_MODEL_SAVE_ID](state, {data}){return data}
    }),
    // 设置弹出层中用于保存给后台人
    modelSaveUser: cr('', {
        [SET_MODEL_SAVE_USER](state, {data}){return data}
    }),
    // 设置弹出层中用于保存给后台内容
    modelSaveContent: cr('', {
        [SET_MODEL_SAVE_CONTENT](state, {data}){return data}
    }),
});
