/**
 * Created by a1 on 2016/5/5.
 */


import 'antd/dist/antd.css';
import '../css/layout.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import LoginPage         from './page/LoginPage';
import MainPage          from './page/MainPage';
import HomePage          from './page/HomePage';
import NotFoundPage      from './page/NotFoundPage';

import AddArticlePage    from './page/article/AddArticlePage';
import EditArticlePage   from './page/article/EditArticlePage';
import DelArticlePage    from './page/article/DelArticlePage';
import AddNotePage       from './page/note/AddNotePage';
import EditNotePage      from './page/note/EditNotePage';
import DelNotePage       from './page/note/DelNotePage';
import AddBookPage       from './page/book/AddBookPage';
import EditBookPage      from './page/book/EditBookPage';
import DelBookPage       from './page/book/DelBookPage';
import EditCommentPage   from './page/comment/EditCommentPage';
import DelCommentPage    from './page/comment/DelCommentPage';
import AddLinkPage       from './page/link/AddLinkPage';
import EditLinkPage      from './page/link/EditLinkPage';
import DelLinkPage       from './page/link/DelLinkPage';
import AddSortPage       from './page/sort/AddSortPage';
import EditSortPage      from './page/sort/EditSortPage';
import DelSortPage       from './page/sort/DelSortPage';
import ArticleRecomPage  from './page/recom/ArticleRecomPage';
import NoteRecomPage     from './page/recom/NoteRecomPage';
import BookRecomPage     from './page/recom/BookRecomPage';
import AddUserPage       from './page/user/AddUserPage';
import EditUserPage      from './page/user/EditUserPage';
import DelUserPage       from './page/user/DelUserPage';


const routes = (
	<Router history={hashHistory}>
        <Route path="/" component={LoginPage}/>
		<Route path="/home" component={MainPage}>
			<IndexRoute name="home" component={HomePage}/>
			<Route name="addArticle"    path="addArticle"    component={AddArticlePage}/>
			<Route name="editArticle"   path="editArticle"   component={EditArticlePage}/>
            <Route name="delArticle"    path="delArticle"    component={DelArticlePage}/>
            <Route name="addNote"       path="addNote"       component={AddNotePage}/>
            <Route name="editNote"      path="editNote"      component={EditNotePage}/>
            <Route name="delNote"       path="delNote"       component={DelNotePage}/>
            <Route name="addBook"       path="addBook"       component={AddBookPage}/>
            <Route name="editBook"      path="editBook"      component={EditBookPage}/>
            <Route name="delBook"       path="delBook"       component={DelBookPage}/>
            <Route name="editComment"   path="editComment"   component={EditCommentPage}/>
            <Route name="delComment"    path="delComment"    component={DelCommentPage}/>
            <Route name="addLink"       path="addLink"       component={AddLinkPage}/>
            <Route name="editLink"      path="editLink"      component={EditLinkPage}/>
            <Route name="delLink"       path="delLink"       component={DelLinkPage}/>
            <Route name="addSort"       path="addSort"       component={AddSortPage}/>
            <Route name="editSort"      path="editSort"      component={EditSortPage}/>
            <Route name="delSort"       path="delSort"       component={DelSortPage}/>
            <Route name="articleRecom"  path="articleRecom"  component={ArticleRecomPage}/>
            <Route name="noteRecom"     path="noteRecom"     component={NoteRecomPage}/>
            <Route name="bookRecom"     path="bookRecom"     component={BookRecomPage}/>
            <Route name="addUser"       path="addUser"       component={AddUserPage}/>
            <Route name="editUser"      path="editUser"      component={EditUserPage}/>
            <Route name="delUser"       path="delUser"       component={DelUserPage}/>
		</Route>
		<Route path="*" component={NotFoundPage}/>
	</Router>
);

ReactDOM.render(routes, document.getElementById("root_page"));









