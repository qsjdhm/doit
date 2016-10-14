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
                        <Menu.Item key="#/home"><Icon type="desktop" /><Link style={{display: "inline-block",width: "100%"}} to="/home">系统首页</Link></Menu.Item>
                        <Menu.SubMenu key="Article" title={<span><Icon type="file-text" />文章管理</span>}>
                            <Menu.Item key="#/addArticle"><Link to="/home/addArticle">新增文章</Link></Menu.Item>
                            <Menu.Item key="#/editArticle"><Link to="/home/editArticle">编辑文章</Link></Menu.Item>
                            <Menu.Item key="#/delArticle"><Link to="/home/delArticle">删除文章</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Note" title={<span><Icon type="copy" />笔记管理</span>}>
                            <Menu.Item key="#/addNote"><Link to="/home/addNote">新增笔记</Link></Menu.Item>
                            <Menu.Item key="#/editNote"><Link to="/home/editNote">编辑笔记</Link></Menu.Item>
                            <Menu.Item key="#/delNote"><Link to="/home/delNote">删除笔记</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Book" title={<span><Icon type="book" />图书管理</span>}>
                            <Menu.Item key="#/addBook"><Link to="/home/addBook">新增图书</Link></Menu.Item>
                            <Menu.Item key="#/editBook"><Link to="/home/editBook">编辑图书</Link></Menu.Item>
                            <Menu.Item key="#/delBook"><Link to="/home/delBook">删除图书</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Comment" title={<span><Icon type="message" />评论管理</span>}>
                            <Menu.Item key="#/editComment"><Link to="/home/editComment">编辑评论</Link></Menu.Item>
                            <Menu.Item key="#/delComment"><Link to="/home/delComment">删除评论</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Link" title={<span><Icon type="export" />外链管理</span>}>
                            <Menu.Item key="#/addLink"><Link to="/home/addLink">新增外链</Link></Menu.Item>
                            <Menu.Item key="#/editLink"><Link to="/home/editLink">编辑外链</Link></Menu.Item>
                            <Menu.Item key="#/delLink"><Link to="/home/delLink">删除外链</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Sort" title={<span><Icon type="appstore-o" />分类管理</span>}>
                            <Menu.Item key="#/addSort"><Link to="/home/addSort">新增分类</Link></Menu.Item>
                            <Menu.Item key="#/editSort"><Link to="/home/editSort">编辑分类</Link></Menu.Item>
                            <Menu.Item key="#/delSort"><Link to="/home/delSort">删除分类</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Recom" title={<span><Icon type="like" />推荐管理</span>}>
                            <Menu.Item key="#/articleRecom"><Link to="/home/articleRecom">文章推荐量</Link></Menu.Item>
                            <Menu.Item key="#/noteRecom"><Link to="/home/noteRecom">笔记推荐量</Link></Menu.Item>
                            <Menu.Item key="#/bookRecom"><Link to="/home/bookRecom">图书推荐量</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="User" title={<span><Icon type="user" />用户管理</span>}>
                            <Menu.Item key="#/addUser"><Link to="/home/addUser">新增用户</Link></Menu.Item>
                            <Menu.Item key="#/editUser"><Link to="/home/editUser">编辑用户</Link></Menu.Item>
                            <Menu.Item key="#/delUser"><Link to="/home/delUser">删除用户</Link></Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </aside>
            </div>
        );
    }
};
