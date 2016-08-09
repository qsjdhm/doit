/* Populated by react-webpack-redux:action */

import { cac } from "../utils/index";

export const CHANGE_USERNAME = "CHANGE_USERNAME";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";


export const changeUserName = cac( CHANGE_USERNAME, "value" );
export const changePassword = cac( CHANGE_PASSWORD, "value" );


export function loginSystem () {

	return ( dispatch, getState ) => {
		console.info( getState().login.username );
		console.info( getState().login.password );
	}
};


//导出减一的方法
export function decrement() {
	return {
		type: DECREMENT_COUNTER
	}
}