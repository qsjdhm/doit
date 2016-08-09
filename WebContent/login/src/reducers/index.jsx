

import { combineReducers } from 'redux';
import login from './login';
import list from './news';

const reducers = {
	list,
	login
};

module.exports = combineReducers(reducers);
