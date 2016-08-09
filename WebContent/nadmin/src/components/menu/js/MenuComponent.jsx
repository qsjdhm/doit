/**
 * Created by zhangyan on 2016/1/12.
 */

import 'antd/dist/antd.css';
import '../css/menu.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';


export default class MenuComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ant-layout-aside">
                <aside className="ant-layout-sider">
                    <div className="ant-layout-logo">
                        <img src={require("../img/logo.png")} />
                    </div>
                    <Menu
	                    mode="inline"
	                    theme="dark"
	                    defaultOpenKeys={[this.props.openSubMenu]}
	                    defaultSelectedKeys={[this.props.selectedMenu]}>
                        <Menu.Item key="#/"><Icon type="desktop" /><Link style={{display: "inline-block",width: "100%"}} to="/">系统首页</Link></Menu.Item>
                        <Menu.SubMenu key="Article" title={<span><Icon type="file-text" />文章管理</span>}>
                            <Menu.Item key="#/addArticle"><Link to="/addArticle">新增文章</Link></Menu.Item>
                            <Menu.Item key="#/editArticle"><Link to="/editArticle">编辑文章</Link></Menu.Item>
                            <Menu.Item key="#/delArticle"><Link to="/delArticle">删除文章</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Note" title={<span><Icon type="copy" />笔记管理</span>}>
                            <Menu.Item key="#/addNote"><Link to="/addNote">新增笔记</Link></Menu.Item>
                            <Menu.Item key="#/editNote"><Link to="/editNote">编辑笔记</Link></Menu.Item>
                            <Menu.Item key="#/delNote"><Link to="/delNote">删除笔记</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Book" title={<span><Icon type="book" />图书管理</span>}>
                            <Menu.Item key="#/addBook"><Link to="/addBook">新增图书</Link></Menu.Item>
                            <Menu.Item key="#/editBook"><Link to="/editBook">编辑图书</Link></Menu.Item>
                            <Menu.Item key="#/delBook"><Link to="/delBook">删除图书</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Comment" title={<span><Icon type="message" />评论管理</span>}>
                            <Menu.Item key="#/editComment"><Link to="/editComment">编辑评论</Link></Menu.Item>
                            <Menu.Item key="#/delComment"><Link to="/delComment">删除评论</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Link" title={<span><Icon type="export" />外链管理</span>}>
                            <Menu.Item key="#/addLink"><Link to="/addLink">新增外链</Link></Menu.Item>
                            <Menu.Item key="#/editLink"><Link to="/editLink">编辑外链</Link></Menu.Item>
                            <Menu.Item key="#/delLink"><Link to="/delLink">删除外链</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Sort" title={<span><Icon type="appstore-o" />分类管理</span>}>
                            <Menu.Item key="#/addSort"><Link to="/addSort">新增分类</Link></Menu.Item>
                            <Menu.Item key="#/editSort"><Link to="/editSort">编辑分类</Link></Menu.Item>
                            <Menu.Item key="#/delSort"><Link to="/delSort">删除分类</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Recom" title={<span><Icon type="like" />推荐管理</span>}>
                            <Menu.Item key="#/articleRecom"><Link to="/articleRecom">文章推荐量</Link></Menu.Item>
                            <Menu.Item key="#/noteRecom"><Link to="/noteRecom">笔记推荐量</Link></Menu.Item>
                            <Menu.Item key="#/bookRecom"><Link to="/bookRecom">图书推荐量</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="User" title={<span><Icon type="user" />用户管理</span>}>
                            <Menu.Item key="#/addUser"><Link to="/addUser">新增用户</Link></Menu.Item>
                            <Menu.Item key="#/editUser"><Link to="/editUser">编辑用户</Link></Menu.Item>
                            <Menu.Item key="#/delUser"><Link to="/delUser">删除用户</Link></Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </aside>
            </div>
        );
    }
};
