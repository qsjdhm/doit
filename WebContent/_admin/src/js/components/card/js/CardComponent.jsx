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
                                            <Link to="/home/addArticle">新增文章</Link>
                                        </li>
                                        <li>
                                            <Link to="/home/editArticle">编辑文章</Link>
                                        </li>
                                        <li>
                                            <Link to="/home/delArticle">删除文章</Link>
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
                                            <Link to="/home/addNote">新增笔记</Link>
                                        </li>
                                        <li>
                                            <Link to="/home/editNote">编辑笔记</Link>
                                        </li>
                                        <li>
                                            <Link to="/home/delNote">删除笔记</Link>
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
                                            <Link to="/home/addBook">新增图书</Link>
                                        </li>
                                        <li>
                                            <Link to="/home/editBook">编辑图书</Link>
                                        </li>
                                        <li>
                                            <Link to="/home/delBook">删除图书</Link>
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
                                            <Link to="/home/editComment">编辑评论</Link>
                                        </li>
                                        <li>
                                            <Link to="/home/delComment">删除评论</Link>
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
                                            <Link to="/home/addLink">新增外链</Link>
                                        </li>
                                        <li>
                                            <Link to="/home/editLink">编辑外链</Link>
                                        </li>
                                        <li>
                                            <Link to="/home/delLink">删除外链</Link>
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
                                            <Link to="/home/addSort">新增分类</Link>
                                        </li>
                                        <li>
                                            <Link to="/home/editSort">编辑分类</Link>
                                        </li>
                                        <li>
                                            <Link to="/home/delSort">删除分类</Link>
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
                                            <Link to="/home/articleRecom">推荐文章</Link>
                                        </li>
                                        <li>
                                            <Link to="/home/noteRecom">推荐笔记</Link>
                                        </li>
                                        <li>
                                            <Link to="/home/bookRecom">推荐图书</Link>
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
                                            <Link to="/home/addUser">新增用户</Link>
                                        </li>
                                        <li>
                                            <Link to="/home/editUser">编辑用户</Link>
                                        </li>
                                        <li>
                                            <Link to="/home/delUser">删除用户</Link>
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
