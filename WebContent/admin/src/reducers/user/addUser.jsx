import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    // 页面所使用的数据
    SET_NAME,
    SET_PASSWORD,
    SET_EMAIL,
	SET_LOADING
} from '../../actions/user/addUser';


export default combineReducers({
    // 设置用户名称
    name: cr('', {
        [SET_NAME](state, {data}){return data}
    }),
    // 设置用户密码
    password: cr('', {
        [SET_PASSWORD](state, {data}){return data}
    }),
    // 设置用户邮箱
    email: cr('', {
        [SET_EMAIL](state, {data}){return data}
    }),
    // 新增按钮是否等待
    loading: cr(false, {
        [SET_LOADING](state, {data}){return data;}
    })
});
