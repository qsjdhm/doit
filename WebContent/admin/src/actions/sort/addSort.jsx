/* Populated by react-webpack-redux:action */

import fetchComponent      from '../../components/fetch/js/fetchComponent';
import { cac }             from '../../utils/index';
import { message }         from 'antd';

// 页面所使用的事件
export const SET_SELECTED_SORT_ID = 'SET_SELECTED_SORT_ID';
export const SET_NAME = 'SET_NAME';
export const SET_LOADING = 'SET_LOADING';

const setSelectedSortId = cac(SET_SELECTED_SORT_ID, 'data');
const setName = cac(SET_NAME, 'data');
const setLoading = cac(SET_LOADING, 'data');



// 分类ID切换事件
export function selectedSortIdChange (sortId) {
	return (dispatch, getState) => {
		dispatch(setSelectedSortId(sortId));
	}
}

// 分类名称改变事件
export function nameChange (name) {
    return (dispatch, getState) => {
        dispatch(setName(name));
    }
}

// 新增分类
export function addSort () {
    return (dispatch, getState) => {
        dispatch(loadingChange(true));
        const url = ENV.baseUrl + "/sortAction/addSort";
        const method = "POST";
        const body = {
            "fSortId"  : getState().addSort.selectedSortId,
            "sortName" : encodeURI(encodeURI(getState().addSort.name))
        };
        const errInfo = "新增分类连接出错！";
        fetchComponent.send(self, url, method, body, errInfo, function(data){
            message.success(data.msg+"！", 3);
            dispatch(loadingChange(false));
        });
    }
}

// 设置删除按钮的等待事件
export function loadingChange (loading) {
	return (dispatch, getState) => {
		dispatch(setLoading(loading));
	}
}




