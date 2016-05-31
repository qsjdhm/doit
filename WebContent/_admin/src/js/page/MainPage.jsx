/**
 * Created by a1 on 2016/5/5.
 */




import { Menu, Breadcrumb, Icon } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
	        <div className="ant-layout-aside">
		        <aside className="ant-layout-sider">
			        <div className="ant-layout-logo">
                        <img src={require("../../i/logo.png")} />
                    </div>
			        <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1"><Icon type="desktop" /><Link style={{display: "inline-block",width: "100%"}} to="/home">系统首页</Link></Menu.Item>
                        <Menu.SubMenu key="sub1" title={<span><Icon type="file-text" />文章管理</span>}>
					        <Menu.Item key="2"><Link to="/home/addArticle">新增文章</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/home/editArticle">编辑文章</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/home/delArticle">删除文章</Link></Menu.Item>
				        </Menu.SubMenu>
                        <Menu.SubMenu key="sub2" title={<span><Icon type="copy" />笔记管理</span>}>
                            <Menu.Item key="5"><Link to="/home/addNote">新增笔记</Link></Menu.Item>
                            <Menu.Item key="6"><Link to="/home/editNote">编辑笔记</Link></Menu.Item>
                            <Menu.Item key="7"><Link to="/home/delNote">删除笔记</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub3" title={<span><Icon type="book" />图书管理</span>}>
                            <Menu.Item key="8"><Link to="/home/addBook">新增图书</Link></Menu.Item>
                            <Menu.Item key="9"><Link to="/home/editBook">编辑图书</Link></Menu.Item>
                            <Menu.Item key="10"><Link to="/home/delBook">删除图书</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub4" title={<span><Icon type="message" />评论管理</span>}>
                            <Menu.Item key="11"><Link to="/home/editComment">编辑评论</Link></Menu.Item>
                            <Menu.Item key="12"><Link to="/home/delComment">删除评论</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub5" title={<span><Icon type="export" />外链管理</span>}>
                            <Menu.Item key="13"><Link to="/home/addLink">新增外链</Link></Menu.Item>
                            <Menu.Item key="14"><Link to="/home/editLink">编辑外链</Link></Menu.Item>
                            <Menu.Item key="15"><Link to="/home/delLink">删除外链</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub6" title={<span><Icon type="appstore-o" />分类管理</span>}>
                            <Menu.Item key="16"><Link to="/home/addSort">新增分类</Link></Menu.Item>
                            <Menu.Item key="17"><Link to="/home/editSort">编辑分类</Link></Menu.Item>
                            <Menu.Item key="18"><Link to="/home/delSort">删除分类</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub7" title={<span><Icon type="like" />推荐管理</span>}>
                            <Menu.Item key="19"><Link to="/home/articleRecom">文章推荐量</Link></Menu.Item>
                            <Menu.Item key="20"><Link to="/home/noteRecom">笔记推荐量</Link></Menu.Item>
                            <Menu.Item key="21"><Link to="/home/bookRecom">图书推荐量</Link></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub8" title={<span><Icon type="user" />用户管理</span>}>
                            <Menu.Item key="22"><Link to="/home/addUser">新增用户</Link></Menu.Item>
                            <Menu.Item key="23"><Link to="/home/editUser">编辑用户</Link></Menu.Item>
                            <Menu.Item key="24"><Link to="/home/delUser">删除用户</Link></Menu.Item>
                        </Menu.SubMenu>
			        </Menu>
		        </aside>
		        <div className="ant-layout-main">
			        <div className="ant-layout-header"></div>
			        <div className="ant-layout-container">
				        <div className="ant-layout-content">
					        <div>
						        <div>
							        {/* 渲染子组件 */}
							        {this.props.children}
						        </div>
					        </div>
				        </div>
			        </div>
			        <div className="ant-layout-footer">
				        Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
			        </div>
		        </div>
	        </div>
        );
    }
};





