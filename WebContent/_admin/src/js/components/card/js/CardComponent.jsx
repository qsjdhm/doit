/**
 * Created by zhangyan on 2016/1/12.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import '../css/card.less';

export default class CardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card-package">
                <div className="m-function-list">
                    <ul>
                        <li className="m-function-item">
                            <div>
                                <div className="m-f-menu-header">
                                    <span className="m-f-menu-tip">文章管理</span>
                                </div>
                                <div className="m-f-menu-list">
                                    <ul className="block__list block__list_words">
                                        <li>
                                            <Link to="/addArticle">新增文章</Link>
                                        </li>
                                        <li>
                                            <Link to="/editArticle">编辑文章</Link>
                                        </li>
                                        <li>
                                            <Link to="/delArticle">删除文章</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className="m-function-item">
                            <div>
                                <div className="m-f-menu-header">
                                    <span className="m-f-menu-tip">笔记管理</span>
                                </div>
                                <div className="m-f-menu-list">
                                    <ul className="block__list block__list_words">
                                        <li>
                                            <Link to="/addNote">新增笔记</Link>
                                        </li>
                                        <li>
                                            <Link to="/editNote">编辑笔记</Link>
                                        </li>
                                        <li>
                                            <Link to="/delNote">删除笔记</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className="m-function-item">
                            <div>
                                <div className="m-f-menu-header">
                                    <span className="m-f-menu-tip">图书管理</span>
                                </div>
                                <div className="m-f-menu-list">
                                    <ul className="block__list block__list_words">
                                        <li>
                                            <Link to="/addBook">新增图书</Link>
                                        </li>
                                        <li>
                                            <Link to="/editBook">编辑图书</Link>
                                        </li>
                                        <li>
                                            <Link to="/delBook">删除图书</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className="m-function-item">
                            <div>
                                <div className="m-f-menu-header">
                                    <span className="m-f-menu-tip">评论管理</span>
                                </div>
                                <div className="m-f-menu-list">
                                    <ul className="block__list block__list_words">
                                        <li>
                                            <Link to="/editComment">编辑评论</Link>
                                        </li>
                                        <li>
                                            <Link to="/delComment">删除评论</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className="m-function-item">
                            <div>
                                <div className="m-f-menu-header">
                                    <span className="m-f-menu-tip">外链管理</span>
                                </div>
                                <div className="m-f-menu-list">
                                    <ul className="block__list block__list_words">
                                        <li>
                                            <Link to="/addLink">新增外链</Link>
                                        </li>
                                        <li>
                                            <Link to="/editLink">编辑外链</Link>
                                        </li>
                                        <li>
                                            <Link to="/delLink">删除外链</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className="m-function-item">
                            <div>
                                <div className="m-f-menu-header">
                                    <span className="m-f-menu-tip">分类管理</span>
                                </div>
                                <div className="m-f-menu-list">
                                    <ul className="block__list block__list_words">
                                        <li>
                                            <Link to="/addSort">新增分类</Link>
                                        </li>
                                        <li>
                                            <Link to="/editSort">编辑分类</Link>
                                        </li>
                                        <li>
                                            <Link to="/delSort">删除分类</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className="m-function-item">
                            <div>
                                <div className="m-f-menu-header">
                                    <span className="m-f-menu-tip">推荐管理</span>
                                </div>
                                <div className="m-f-menu-list">
                                    <ul className="block__list block__list_words">
                                        <li>
                                            <Link to="/articleRecom">推荐文章</Link>
                                        </li>
                                        <li>
                                            <Link to="/noteRecom">推荐笔记</Link>
                                        </li>
                                        <li>
                                            <Link to="/bookRecom">推荐图书</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className="m-function-item">
                            <div>
                                <div className="m-f-menu-header">
                                    <span className="m-f-menu-tip">用户管理</span>
                                </div>
                                <div className="m-f-menu-list">
                                    <ul className="block__list block__list_words">
                                        <li>
                                            <Link to="/addUser">新增用户</Link>
                                        </li>
                                        <li>
                                            <Link to="/editUser">编辑用户</Link>
                                        </li>
                                        <li>
                                            <Link to="/delUser">删除用户</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
};
