import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    // 页面所使用的数据
	SET_LINK_COUNT,
	SET_SELECTED_PAGE,
	SET_LINK_LIST,

    // 弹出层所使用的初始数据
	SET_MODEL_VISIBLE,
    SET_MODEL_DEFAULT_NAME,
    SET_MODEL_DEFAULT_URL,

    // 弹出层所使用的保存到后台的数据
    SET_MODEL_SAVE_ID,
    SET_MODEL_SAVE_NAME,
    SET_MODEL_SAVE_URL
} from '../../actions/link/editLink';


export default combineReducers({
    // 设置外链总数
    linkCount: cr(0, {
        [SET_LINK_COUNT](state, {data}){return data}
    }),
    // 设置当前选中的页数
    selectedPage: cr(1, {
        [SET_SELECTED_PAGE](state, {data}){return data}
    }),
    // 设置外链列表
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

    // 设置弹出层显示状态
    modelVisible: cr(false, {
        [SET_MODEL_VISIBLE](state, {data}){return data}
    }),
    // 设置弹出层中默认的外链人
    modelDefaultName: cr('', {
        [SET_MODEL_DEFAULT_NAME](state, {data}){return data}
    }),
    // 设置弹出层中默认的外链内容
    modelDefaultUrl: cr('', {
        [SET_MODEL_DEFAULT_URL](state, {data}){return data}
    }),

    // 设置弹出层中用于保存给后台的外链ID
    modelSaveId: cr(0, {
        [SET_MODEL_SAVE_ID](state, {data}){return data}
    }),
    // 设置弹出层中用于保存给后台人
    modelSaveName: cr('', {
        [SET_MODEL_SAVE_NAME](state, {data}){return data}
    }),
    // 设置弹出层中用于保存给后台内容
    modelSaveUrl: cr('', {
        [SET_MODEL_SAVE_URL](state, {data}){return data}
    }),
});
