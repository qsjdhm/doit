
import note from './note';
import editArticle from './article/editArticle';
import editNote from './note/editNote';
import { combineReducers } from 'redux';

const reducers = {
	note,
    editNote,
    editArticle
};

module.exports = combineReducers(reducers);
