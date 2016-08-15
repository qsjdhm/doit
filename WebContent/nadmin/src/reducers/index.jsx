
import note from './note';
import editNote from './editNote';
import { combineReducers } from 'redux';

const reducers = {
	note,
    editNote
};

module.exports = combineReducers(reducers);
