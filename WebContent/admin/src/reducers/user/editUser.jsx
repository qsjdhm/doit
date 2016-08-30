import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    // 页面所使用的数据
	SET_USER_COUNT,
	SET_SELECTED_PAGE,
	SET_USER_LIST,

    // 弹出层所使用的初始数据
	SET_MODEL_VISIBLE,
    SET_MODEL_DEFAULT_NAME,
    SET_MODEL_DEFAULT_PASSWORD,
    SET_MODEL_DEFAULT_EMAIL,

    // 弹出层所使用的保存到后台的数据
    SET_MODEL_SAVE_ID,
    SET_MODEL_SAVE_NAME,
    SET_MODEL_SAVE_PASSWORD,
    SET_MODEL_SAVE_EMAIL
} from '../../actions/user/editUser';


export default combineReducers({
    // 设置用户总数
    userCount: cr(0, {
        [SET_USER_COUNT](state, {data}){return data}
    }),
    // 设置当前选中的页数
    selectedPage: cr(1, {
        [SET_SELECTED_PAGE](state, {data}){return data}
    }),
    // 设置用户列表
    userList: cr([], {
        [SET_USER_LIST](state, {data}){
			let userArray = [];
			for( let item of data ){
				item.key = item.User_ID;
                userArray.push(item);
			}
			return userArray;
		}
    }),

    // 设置弹出层显示状态
    modelVisible: cr(false, {
        [SET_MODEL_VISIBLE](state, {data}){return data}
    }),
    // 设置弹出层中默认的用户名称
    modelDefaultName: cr('', {
        [SET_MODEL_DEFAULT_NAME](state, {data}){return data}
    }),
    // 设置弹出层中默认的用户密码
    modelDefaultPassword: cr('', {
        [SET_MODEL_DEFAULT_PASSWORD](state, {data}){return data}
    }),
    // 设置弹出层中默认的用户邮箱
    modelDefaultEmail: cr('', {
        [SET_MODEL_DEFAULT_EMAIL](state, {data}){return data}
    }),

    // 设置弹出层中用于保存给后台的用户ID
    modelSaveId: cr(0, {
        [SET_MODEL_SAVE_ID](state, {data}){return data}
    }),
    // 设置弹出层中用于保存给后台名称
    modelSaveName: cr('', {
        [SET_MODEL_SAVE_NAME](state, {data}){return data}
    }),
    // 设置弹出层中用于保存给后台用户密码
    modelSavePassword: cr('', {
        [SET_MODEL_SAVE_PASSWORD](state, {data}){return data}
    }),
    // 设置弹出层中用于保存给后台用户邮箱
    modelSaveEmail: cr('', {
        [SET_MODEL_SAVE_EMAIL](state, {data}){return data}
    }),
});
