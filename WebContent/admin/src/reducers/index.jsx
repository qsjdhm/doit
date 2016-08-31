
import addArticle          from './article/addArticle';
import editArticle         from './article/editArticle';
import delArticle          from './article/delArticle';

import addNote             from './note/addNote';
import editNote            from './note/editNote';
import delNote             from './note/delNote';

import addBook             from './book/addBook';
import editBook            from './book/editBook';
import delBook             from './book/delBook';

import editComment         from './comment/editComment';
import delComment          from './comment/delComment';

import addLink             from './link/addLink';
import editLink            from './link/editLink';
import delLink             from './link/delLink';

import addSort             from './sort/addSort';
import editSort            from './sort/editSort';
import delSort             from './sort/delSort';

import addUser             from './user/addUser';
import editUser            from './user/editUser';
import delUser             from './user/delUser';

import { combineReducers } from 'redux';

const reducers = {
    addArticle,
    editArticle,
    delArticle,

    addNote,
    editNote,
    delNote,

    addBook,
    editBook,
    delBook,

    editComment,
    delComment,

    addLink,
    editLink,
    delLink,

    addSort,
    editSort,
    delSort,

    addUser,
    editUser,
    delUser
};

module.exports = combineReducers(reducers);
