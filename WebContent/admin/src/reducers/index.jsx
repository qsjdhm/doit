
import addArticle          from './article/addArticle';
import editArticle         from './article/editArticle';
import delArticle          from './article/delArticle';

import addNote             from './note/addNote';
import editNote            from './note/editNote';
import delNote             from './note/delNote';

import addBook             from './book/addBook';
import delBook             from './book/delBook';

import { combineReducers } from 'redux';

const reducers = {
    addArticle,
    editArticle,
    delArticle,

    addNote,
    editNote,
    delNote,

    addBook,
    delBook
};

module.exports = combineReducers(reducers);
