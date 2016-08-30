import {combineReducers} from 'redux';
import {cr} from '../../utils/index';
import {
    // 页面所使用的数据
	SET_USER_COUNT,
	SET_SELECTED_PAGE,
	SET_USER_LIST,
    SET_SELECTED_ROW_KEYS,
	SET_HAS_SELECTED,
	SET_LOADING
} from '../../actions/user/delUser';


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
    // 设置当前选中用户的key
    selectedRowKeys: cr([], {
        [SET_SELECTED_ROW_KEYS](state, {data}){
            return data;
        }
    }),
	// 设置当前表格是否有选中
	hasSelected : cr(false, {
		[SET_HAS_SELECTED](state, {data}){
			return data;
		}
	}),
	// 删除按钮是否等待
	loading : cr(false, {
		[SET_LOADING](state, {data}){
			return data;
		}
	}),
});
