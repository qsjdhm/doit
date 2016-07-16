/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { Modal, Form, Input, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';


export default class EditCommentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowPage       : 1,              // 当前页ID
            pageSize      : 10,             // 当前页个数

            visible       : false,          // 弹出框是否显示
            mId           : "",             // 弹出框中的评论ID
            mCommContent  : "",             // 弹出框中的评论内容
            mCommUser     : "",             // 弹出框中的评论人

            paginationDOM : null,
            tableDOM : null
        };

        this.paginationClick  = this.paginationClick.bind(this);
        this.operationClick   = this.operationClick.bind(this);

        this.handleOk         = this.handleOk.bind(this);
        this.handleCancel     = this.handleCancel.bind(this);
        this.mContentChange   = this.mContentChange.bind(this);
        this.mUserChange      = this.mUserChange.bind(this);
    }

    componentWillMount() {
        // 获取评论的总个数
        this.getCommentCount();
    }


    // 设置state中和页面数据相关的值
    settingState(nowPage, pageSize, visible, mId, mCommContent, mCommUser) {
        if(nowPage === "no") {
            nowPage = this.state.nowPage;
        }
        if(pageSize === "no") {
            pageSize = this.state.pageSize;
        }

        if(visible === "no") {
            visible = this.state.visible;
        }
        if(mId === "no") {
            mId = this.state.mId;
        }
        if(mCommContent === "no") {
            mCommContent = this.state.mCommContent;
        }
        if(mCommUser === "no") {
            mCommUser = this.state.mCommUser;
        }


        this.setState({
            nowPage      : nowPage,
            pageSize     : pageSize,

            visible      : visible,
            mId          : mId,
            mCommContent : mCommContent,
            mCommUser    : mCommUser
        });

    }

    /******************************事件响应方法--开始***********************************/

    // 翻页按钮点击
    paginationClick(nowPage){
        this.settingState(nowPage, "no", "no", "no", "no", "no");
        // 根据当前分类加载第一页评论数据
        this.getCommentList(nowPage);
    }

    // 操作列点击
    operationClick(index, item){
		const self = this;
		setTimeout(function(){
			self.settingState("no", "no", true, item.Comment_ID, item.Comment_Content, item.Comment_Person_Name);
		}, 0);
    }

    // 弹出框确认点击
    handleOk(index, item){
        // 更新文章信息
        this.updateComment();
    }

    // 弹出框取消点击
    handleCancel(index, item){
        this.settingState("no", "no", false, "", "", "");
    }

    mContentChange(e) {
        const content = e.target.value;
        this.settingState("no", "no", "no", "no", content, "no");
    }

    mUserChange(e) {
        const user = e.target.value;
        this.settingState("no", "no", "no", "no", "no", user);
    }


    /******************************事件响应方法--结束***********************************/

    // 获取评论列表
    getCommentCount() {
		const url = "/doit/commentAction/getCommentCount";
		const method = "POST";
		const body = {};
		const errInfo = "请求评论个数连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, this.requestCountCallback);
    }

	// 请求评论总个数的回调方法
	requestCountCallback(cbData) {

		if(cbData.success === "1"){
			// paginationDOM--因为ajax之后select的默认数据不会自动设置
			this.setState({
				paginationDOM : <PaginationComponent
					count={cbData.data}
					pageSize={this.state.pageSize}
					pageed={this.paginationClick}/>
			});

			// 根据当前分类加载第一页评论数据
			this.getCommentList(1);
		}
	}

    // 根据当前分类加载第一页评论数据
    getCommentList(nowPage) {
		const url = "/doit/commentAction/getCommentList";
		const method = "POST";
		const body = {
			"page" : nowPage,
			"size" : this.state.pageSize
		};
		const errInfo = "请求评论列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, this.requestCommentListCallback);
    }

	// 请求评论列表的回调方法
	requestCommentListCallback(cbData) {

		if(cbData.success === "1"){
			// 组织表格数据
			this.dealTableData(cbData);
		}
	}

    // 组织表格数据
    dealTableData(cbData) {
        const totalWidth = document.getElementById("comment_page").offsetWidth - 25;
        const idWidth        = totalWidth * 0.0749;
        const contentWidth   = totalWidth * 0.3465;
        const articleWidth   = totalWidth * 0.3037;
        const userWidth      = totalWidth * 0.1740;
        const operationWidth = totalWidth * 0.0656;

        const self = this;
        let tableColumns = [
            { title: 'ID', width: idWidth, dataIndex: 'Comment_ID', key: 'Comment_ID' },
            { title: '内容', width: contentWidth, dataIndex: 'Comment_Content', key: 'Comment_Content' },
            { title: '对应文章', width: articleWidth, dataIndex: 'Comment_ArticleTitle', key: 'Comment_ArticleTitle' },
            { title: '评论用户', width: userWidth, dataIndex: 'Comment_Person_Name', key: 'Comment_Person_Name' },
            //, { title: '操作', width: operationWidth, dataIndex: '', key: 'operation', render: (index, item) => <a href='javascript:void(0)' onClick={self.openEditModel.bind(null, index, item)}>修改</a> },
        ];

        // 设置表格操作列配置
        tableColumns.push({
            title: '操作',
            width: operationWidth,
            dataIndex: 'operation',
            key: 'operation',
            render(index, item) {
                return <a href='javascript:void(0)' onClick={self.operationClick.bind(null, index, item)}>修改</a>
            }
        });

        let tableData = [];
        for(let item of cbData.data){
            item.key = item.Comment_ID;
            tableData.push(item);
        }

        const expandedRowRender = record => <p>{record.Comment_Content}</p>;
        const scroll = { y: 380, x: totalWidth };

        this.setState({
            tableDOM : <TableComponent
                tableColumns={tableColumns}
                tableData={tableData}
                expandedRowRender={expandedRowRender}
                selectedRowKeys={false}
                rowSelection={null}
                checkboxSelected={false}
                scroll={scroll}/>
        });
    }

    // 更新评论信息
    updateComment() {
		const url = "/doit/commentAction/updateComment";
		const method = "POST";
		const body = {
			"id"       : this.state.mId,
			"userName" : encodeURI(encodeURI(this.state.mCommUser)),
			"content"  : encodeURI(encodeURI(this.state.mCommContent))
		};
		const errInfo = "更新评论信息连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, this.requestUpdateCallback);
    }

	// 更新评论的回调方法
	requestUpdateCallback(cbData) {

		this.settingState("no", "no", false, "", "", "", "");
		if(cbData.success === "1") {
			// 重新获取当前页数据
			this.getCommentList(this.state.nowPage);
			message.success(cbData.msg+"！", 3);
		} else {
			message.error(cbData.msg+"！", 3);
		}
	}


    render() {
        const FormItem = Form.Item;
        return (
            <div>
                <MenuComponent openSubMenu={this.props.route.sort} selectedMenu={this.props.route.bpath} />
                <div className="ant-layout-main">
                    <div className="ant-layout-header">
                        <Row>
                            <Col span={4}>
                                <SearchComponent
                                    placeholder="快速菜单入口"
                                    style={{ width: 230 }}
                                />
                            </Col>
                            <Col span={12} offset={8}>
                                <ToolBarComponent
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className="ant-layout-container">
                        <div className="ant-layout-content">
                            <BreadcrumbComponent
                                data={this.props.routes}
                            />
                            <div id="comment_page" className="page edit-comment-page">
                                {this.state.tableDOM}
                                {this.state.paginationDOM}
                            </div>

                            <Modal title="修改评论详细信息"
                                   visible={this.state.visible}
                                   onOk={this.handleOk}
                                   onCancel={this.handleCancel}>
                                <Form horizontal>
                                    <FormItem
                                        label="评论用户">
                                        <Input value={this.state.mCommUser} onChange={this.mUserChange} placeholder="" size="large"/>
                                    </FormItem>
                                    <FormItem
                                        label="评论内容">
                                        <Input value={this.state.mCommContent} onChange={this.mContentChange} type="textarea" rows="3" placeholder="" size="large"/>
                                    </FormItem>
                                </Form>
                            </Modal>
                        </div>
                    </div>
                    <div className="ant-layout-footer">
                        52DOIT 版权所有 © 2016 由不拽注定被甩~技术支持
                    </div>
                </div>
            </div>
        );
    }
};





