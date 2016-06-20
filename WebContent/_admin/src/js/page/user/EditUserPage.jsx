/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

import { Modal, Form, Input, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';


export default class EditUserPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nowPage   : 1,              // 当前页ID
			pageSize  : 10,             // 当前页个数
			loading   : false,          // 按钮是否在请求过程中

			visible   : false,          // 弹出框是否显示
			mId       : "",             // 弹出框中的用户ID
			mName     : "",             // 弹出框中的用户名称
			mPassword : "",             // 弹出框中的用户密码
			mEmail    : "",             // 弹出框中的用户邮箱

			paginationDOM : null,
			tableDOM : null
		};

		this.paginationClick  = this.paginationClick.bind(this);
		this.operationClick   = this.operationClick.bind(this);
		this.handleOk         = this.handleOk.bind(this);
		this.handleCancel     = this.handleCancel.bind(this);

		this.mNameChange      = this.mNameChange.bind(this);
		this.mPasswordChange  = this.mPasswordChange.bind(this);
		this.mEmailChange     = this.mEmailChange.bind(this);
	}

	componentWillMount() {
		// 获取用户的总个数
		this.getUserCount();
	}


	// 设置state中和页面数据相关的值
	settingState(nowPage,
	             pageSize,
	             loading,
	             selectedRowKeys,
	             hasSelected,
	             visible,
	             mId,
				 mName,
				 mPassword,
				 mEmail) {
		if(nowPage === "no") {
			nowPage = this.state.nowPage;
		}
		if(pageSize === "no") {
			pageSize = this.state.pageSize;
		}
		if(loading === "no") {
			loading = this.state.loading;
		}
		if(selectedRowKeys === "no") {
			selectedRowKeys = this.state.selectedRowKeys;
		}
		if(hasSelected === "no") {
			hasSelected = this.state.hasSelected;
		}

		if(visible === "no") {
			visible = this.state.visible;
		}
		if(mId === "no") {
			mId = this.state.mId;
		}
		if(mName === "no") {
			mName = this.state.mName;
		}
		if(mPassword === "no") {
			mPassword = this.state.mPassword;
		}
		if(mEmail === "no") {
			mEmail = this.state.mEmail;
		}

		this.setState({
			nowPage          : nowPage,
			pageSize         : pageSize,
			loading          : loading,
			selectedRowKeys  : selectedRowKeys,
			hasSelected      : hasSelected,

			visible          : visible,
			mId              : mId,
			mName            : mName,
			mPassword        : mPassword,
			mEmail           : mEmail
		});
	}

	/******************************事件响应方法--开始***********************************/

	// 翻页按钮点击
	paginationClick(nowPage){
		this.settingState(nowPage, "no", "no", "no", false, "no", "no", "no", "no", "no");
		// 根据当前分类加载第一页用户数据
		this.getUserList(nowPage);
	}

	// 操作列点击
	operationClick(index, item){
		this.settingState("no", "no", "no", "no", "no", true, "no", "no", "no", "no");
		// 根据ID获取用户全部信息
		this.getUser(item.User_ID);
	}

	// 弹出框确认点击
	handleOk(index, item){
		// 更新用户信息
		this.updateUser();
	}

	// 弹出框取消点击
	handleCancel(index, item){
		this.settingState("no", "no", "no", "no", false, "", "", "", "");
	}

	mNameChange(e) {
		const name = e.target.value;
		this.settingState("no", "no", "no", "no", "no", "no", "no", name, "no", "no");
	}

	mPasswordChange(e) {
		const password = e.target.value;
		this.settingState("no", "no", "no", "no", "no", "no", "no", "no", password, "no");
	}

	mEmailChange(e) {
		const email = e.target.value;
		this.settingState("no", "no", "no", "no", "no", "no", "no", "no", "no", email);
	}


	/******************************事件响应方法--结束***********************************/

	// 获取用户列表
	getUserCount() {
		const self = this;
		jQuery.ajax({
			type : "POST",
			url : "/doit/userAction/getUserCount",
			data : {},
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success : function(cbData) {
				if(cbData.success === "1"){
					// paginationDOM--因为ajax之后select的默认数据不会自动设置
					self.setState({
						paginationDOM : <PaginationComponent
							count={cbData.data}
							pageSize={self.state.pageSize}
							pageed={self.paginationClick}/>
					});

					// 根据当前分类加载第一页用户数据
					self.getUserList(1);
				}
			},error :function(){
				message.error("请求用户个数连接出错！");
			}
		});
	}

	// 根据当前分类加载第一页用户数据
	getUserList(nowPage) {
		const self = this;
		jQuery.ajax({
			type : "POST",
			url : "/doit/userAction/getUserList",
			data : {
				"page" : nowPage,
				"size" : self.state.pageSize
			},
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success : function(cbData) {
				if(cbData.success === "1"){
					console.info(cbData);
					// 组织表格数据
					self.dealTableData(cbData);
				}
			},error :function(){
				message.error("请求用户列表连接出错！");
			}
		});
	}

	// 组织表格数据
	dealTableData(cbData) {
		const totalWidth = document.getElementById("user_page").offsetWidth - 25;
		const idWidth        = totalWidth * 0.0749;
		const titleWidth     = totalWidth * 0.3537;
		const urlWidth       = totalWidth * 0.4705;
		const operationWidth = totalWidth * 0.0656;

		const self = this;
		let tableColumns = [
			{ title: 'ID', width: idWidth, dataIndex: 'User_ID', key: 'User_ID' },
			{ title: '名称', width: titleWidth, dataIndex: 'User_Account', key: 'User_Account' },
			{ title: '邮箱', width: urlWidth, dataIndex: 'User_Email', key: 'User_Email' },
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
			item.key = item.User_ID;
			tableData.push(item);
		}

		const expandedRowRender = record => <p>{record.User_Account}</p>;
		const scroll = { y: 385, x: totalWidth };

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

	// 根据ID获取用户全部信息
	getUser(id) {
		// 保存用户id
		this.settingState("no", "no", "no", "no", "no", true, id, "no", "no", "no");
		const self = this;
		jQuery.ajax({
			type : "POST",
			url : "/doit/userAction/getUser",
			data : {
				"selectId" : id
			},
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success : function(cbData) {
				if(cbData.success === "1"){
					self.settingState("no", "no", "no", "no", "no", "no", id, cbData.name, "no", cbData.email);
				}
			},error :function(){
				message.error("请求用户信息连接出错！");
			}
		});
	}

	// 更新用户信息
	updateUser() {
		const self     = this;
		const id       = this.state.mId;
		const name     = encodeURI(encodeURI(this.state.mName));
		const password = encodeURI(encodeURI(this.state.mPassword));
		const email    = encodeURI(encodeURI(this.state.mEmail));
		jQuery.ajax({
			type : "POST",
			url : "/doit/userAction/updateUser",
			data : {
				"id" : id,
				"name" : name,
				"password" : password,
				"email" : email
			},
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success : function(cbData) {
				self.settingState("no", "no", "no", "no", false, "", "", "", "");
				if(cbData.success === "1") {
					// 重新获取当前页数据
					self.getUserList(self.state.nowPage);
                    message.success(cbData.msg+"！", 3);
				} else {
                    message.error(cbData.msg+"！", 3);
				}
			},error :function(){
				message.error("更新用户信息连接出错！");
			}
		});
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
							<div id="user_page" className="page edit-user-page">
								{this.state.tableDOM}
								{this.state.paginationDOM}
							</div>

							<Modal title="修改用户信息"
							       visible={this.state.visible}
							       onOk={this.handleOk}
							       onCancel={this.handleCancel}>
								<Form horizontal>
									<FormItem
										label="用户名称 : ">
										<Input value={this.state.mName} onChange={this.mNameChange} placeholder="" size="large"/>
									</FormItem>
									<FormItem
										label="用户密码 : ">
										<Input value={this.state.mPassword} onChange={this.mPasswordChange} placeholder="" size="large"/>
									</FormItem>
									<FormItem
										label="用户邮箱 : ">
										<Input value={this.state.mEmail} onChange={this.mEmailChange} placeholder="" size="large"/>
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





