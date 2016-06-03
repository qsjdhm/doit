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
                    <Menu mode="inline" theme="dark" defaultOpenKeys={[this.props.openSubMenu]} defaultSelectedKeys={[this.props.selectedMenu]}>
                        <Menu.Item key="#/home"><Icon type="desktop" /><Link style={{display: "inline-block",width: "100%"}} to="/home">系统首页</Link></Menu.Item>
                        <Menu.SubMenu key="Article" title={<span><Icon type="file-text" />文章管理</span>}>
                            <Menu.Item key="#/home/addArticle"><Link to="/home/addArticle">新增文章</Link></Menu.Item>
                            <Menu.Item key="#/home/editArticle/:id"><Link to="/home/editArticle/1">编辑文章</Link></Menu.Item>
                            <Menu.Item key="#/home/delArticle/:id"><Link to="/home/delArticle/1">删除文章</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Note" title={<span><Icon type="copy" />笔记管理</span>}>
                            <Menu.Item key="#/home/addNote"><Link to="/home/addNote">新增笔记</Link></Menu.Item>
                            <Menu.Item key="#/home/editNote/:id"><Link to="/home/editNote/1">编辑笔记</Link></Menu.Item>
                            <Menu.Item key="#/home/delNote/:id"><Link to="/home/delNote/1">删除笔记</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Book" title={<span><Icon type="book" />图书管理</span>}>
                            <Menu.Item key="#/home/addBook"><Link to="/home/addBook">新增图书</Link></Menu.Item>
                            <Menu.Item key="#/home/editBook/:id"><Link to="/home/editBook/1">编辑图书</Link></Menu.Item>
                            <Menu.Item key="#/home/delBook/:id"><Link to="/home/delBook/1">删除图书</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Comment" title={<span><Icon type="message" />评论管理</span>}>
                            <Menu.Item key="#/home/editComment/:id"><Link to="/home/editComment/1">编辑评论</Link></Menu.Item>
                            <Menu.Item key="#/home/delComment/:id"><Link to="/home/delComment/1">删除评论</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Link" title={<span><Icon type="export" />外链管理</span>}>
                            <Menu.Item key="#/home/addLink"><Link to="/home/addLink">新增外链</Link></Menu.Item>
                            <Menu.Item key="#/home/editLink/:id"><Link to="/home/editLink/1">编辑外链</Link></Menu.Item>
                            <Menu.Item key="#/home/delLink/:id"><Link to="/home/delLink/1">删除外链</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Sort" title={<span><Icon type="appstore-o" />分类管理</span>}>
                            <Menu.Item key="#/home/addSort"><Link to="/home/addSort">新增分类</Link></Menu.Item>
                            <Menu.Item key="#/home/editSort/:id"><Link to="/home/editSort/1">编辑分类</Link></Menu.Item>
                            <Menu.Item key="#/home/delSort/:id"><Link to="/home/delSort/1">删除分类</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="Recom" title={<span><Icon type="like" />推荐管理</span>}>
                            <Menu.Item key="#/home/articleRecom/:id"><Link to="/home/articleRecom/1">文章推荐量</Link></Menu.Item>
                            <Menu.Item key="#/home/noteRecom/:id"><Link to="/home/noteRecom/1">笔记推荐量</Link></Menu.Item>
                            <Menu.Item key="#/home/bookRecom/:id"><Link to="/home/bookRecom/1">图书推荐量</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="User" title={<span><Icon type="user" />用户管理</span>}>
                            <Menu.Item key="#/home/addUser"><Link to="/home/addUser">新增用户</Link></Menu.Item>
                            <Menu.Item key="#/home/editUser/:id"><Link to="/home/editUser/1">编辑用户</Link></Menu.Item>
                            <Menu.Item key="#/home/delUser/:id"><Link to="/home/delUser/1">删除用户</Link></Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </aside>
            </div>
        );
    }
};
