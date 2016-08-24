
import note from './note';
import editArticle from './article/editArticle';
import editNote from './note/editNote';
import delNote from './note/delNote';
import { combineReducers } from 'redux';

const reducers = {
	note,
    editNote,
	delNote,
    editArticle
};

module.exports = combineReducers(reducers);
