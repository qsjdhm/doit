import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    // 页面所使用的数据
    SET_NAME,
    SET_URL,
	SET_LOADING
} from '../../actions/link/addLink';


export default combineReducers({
    // 设置外链名称
    name: cr('', {
        [SET_NAME](state, {data}){return data}
    }),
    // 设置外链链接
    url: cr('', {
        [SET_URL](state, {data}){return data}
    }),
    // 新增按钮是否等待
    loading: cr(false, {
        [SET_LOADING](state, {data}){return data;}
    })
});
