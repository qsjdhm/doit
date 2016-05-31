/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Breadcrumb } from 'antd';

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


export default class MRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route name="登录页"                                             path="/"             component={LoginPage}/>
                <Route name="首页"               bpath="#/home"                  path="/home"         component={MainPage}>
                    <IndexRoute name="首页"                                                           component={HomePage}/>
                    <Route name="新增文章"       bpath="#/home/addArticle"       path="addArticle"    component={AddArticlePage}/>
                    <Route name="编辑文章"       bpath="#/home/editArticle"      path="editArticle"   component={EditArticlePage}/>
                    <Route name="删除文章"       bpath="#/home/delArticle"       path="delArticle"    component={DelArticlePage}/>
                    <Route name="新增笔记"       bpath="#/home/addNote"          path="addNote"       component={AddNotePage}/>
                    <Route name="编辑笔记"       bpath="#/home/editNote"         path="editNote"      component={EditNotePage}/>
                    <Route name="删除笔记"       bpath="#/home/delNote"          path="delNote"       component={DelNotePage}/>
                    <Route name="新增图书"       bpath="#/home/addBook"          path="addBook"       component={AddBookPage}/>
                    <Route name="编辑图书"       bpath="#/home/editBook"         path="editBook"      component={EditBookPage}/>
                    <Route name="删除图书"       bpath="#/home/delBook"          path="delBook"       component={DelBookPage}/>
                    <Route name="编辑评论"       bpath="#/home/editComment"      path="editComment"   component={EditCommentPage}/>
                    <Route name="删除评论"       bpath="#/home/delComment"       path="delComment"    component={DelCommentPage}/>
                    <Route name="新增外链"       bpath="#/home/addLink"          path="addLink"       component={AddLinkPage}/>
                    <Route name="编辑外链"       bpath="#/home/editLink"         path="editLink"      component={EditLinkPage}/>
                    <Route name="删除外链"       bpath="#/home/delLink"          path="delLink"       component={DelLinkPage}/>
                    <Route name="新增分类"       bpath="#/home/addSort"          path="addSort"       component={AddSortPage}/>
                    <Route name="编辑分类"       bpath="#/home/editSort"         path="editSort"      component={EditSortPage}/>
                    <Route name="删除分类"       bpath="#/home/delSort"          path="delSort"       component={DelSortPage}/>
                    <Route name="文章推荐量"     bpath="#/home/articleRecom"     path="articleRecom"  component={ArticleRecomPage}/>
                    <Route name="笔记推荐量"     bpath="#/home/noteRecom"        path="noteRecom"     component={NoteRecomPage}/>
                    <Route name="图书推荐量"     bpath="#/home/bookRecom"        path="bookRecom"     component={BookRecomPage}/>
                    <Route name="新增用户"       bpath="#/home/addUser"          path="addUser"       component={AddUserPage}/>
                    <Route name="编辑用户"       bpath="#/home/editUser"         path="editUser"      component={EditUserPage}/>
                    <Route name="删除用户"       bpath="#/home/delUser"          path="delUser"       component={DelUserPage}/>
                </Route>
                <Route path="*" component={NotFoundPage}/>
            </Router>
        );
    }
};











