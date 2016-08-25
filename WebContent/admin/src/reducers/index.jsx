
import editArticle         from './article/editArticle';
import delArticle          from './article/delArticle';
import addNote             from './note/addNote';
import editNote            from './note/editNote';
import delNote             from './note/delNote';
import { combineReducers } from 'redux';

const reducers = {
    editArticle,
    delArticle,
    addNote,
    editNote,
    delNote
};

module.exports = combineReducers(reducers);
