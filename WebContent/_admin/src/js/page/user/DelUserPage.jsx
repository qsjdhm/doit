/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

import { Popconfirm, Button, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';

import '../../../css/user.less';

export default class DelUserPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nowPage  : 1,              // 当前页ID
			pageSize : 10,             // 当前页个数
			loading  : false,          // 按钮是否在请求过程中
			selectedRowKeys : [],      // 选中数据的ID数组
			hasSelected : false,       // 按钮是否可点击

			paginationDOM : null,
			tableDOM : null
		};

		this.paginationClick  = this.paginationClick.bind(this);
		this.operationClick   = this.operationClick.bind(this);
		this.deleteClick      = this.deleteClick.bind(this);
		this.checkboxSelected = this.checkboxSelected.bind(this);
	}

	componentWillMount() {
		// 获取用户的总个数
		this.getUserCount();
	}


	// 设置state中和页面数据相关的值
	settingState(nowPage, pageSize, loading, selectedRowKeys, hasSelected) {
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

		this.setState({
			nowPage          : nowPage,
			pageSize         : pageSize,
			loading          : loading,
			selectedRowKeys  : selectedRowKeys,
			hasSelected      : hasSelected
		});

	}

	/******************************事件响应方法--开始***********************************/



	// 翻页按钮点击
	paginationClick(nowPage){
		this.settingState(nowPage, "no", "no", "no", false);
		// 根据当前分类加载第一页用户数据
		this.getUserList(nowPage);
	}

	// 操作列点击
	operationClick(index, item){
		console.info(index);
		console.info(item);
		// 删除用户
		this.delUserList(item.User_ID.toString());
	}

	// 选中用户
	checkboxSelected(selectedRowKeys) {
		const hasSelected = selectedRowKeys.length > 0;
		this.settingState("no", "no", "no", selectedRowKeys, hasSelected);
	}

	// 删除点击
	deleteClick() {
		this.settingState("no", "no", true, "no", true);
		const selectStr = this.state.selectedRowKeys.join(";");
		// 删除用户
		this.delUserList(selectStr);
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
				return (
					<Popconfirm
						title="确定要删除当前用户吗？"
						placement="topRight"
						onConfirm={self.operationClick.bind(null, index, item)}>

						<a href='javascript:void(0)'>删除</a>
					</Popconfirm>
				);
			}
		});

		let tableData = [];
		for(let item of cbData.data){
			item.key = item.User_ID;
			tableData.push(item);
		}

		// 表格的配置
		const scroll = { y: 350, x: totalWidth };

		this.setState({
			tableDOM : <TableComponent
				tableColumns={tableColumns}
				tableData={tableData}
				selectedRowKeys={this.state.selectedRowKeys}
				checkboxSelected={this.checkboxSelected}
				expandedRowRender={false}
				scroll={scroll}/>
		});
	}

	// 删除用户
	delUserList(selectStr) {
		const self = this;
		jQuery.ajax({
			type : "POST",
			url : "/doit/userAction/delUser",
			data : {
				"selectId" : selectStr
			},
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success : function(cbData) {
				if(cbData.success === "1"){
					console.info(cbData);
					self.settingState("no", "no", false, "no", false);
					// 获取用户列表
					self.getUserCount();
				}
			},error :function(){
				message.error("删除用户列表连接出错！");
			}
		});
	}



	render() {

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
							<div id="user_page" className="page del-user-page">
								<div className="del-button">
									<span>{this.state.hasSelected ? `选择了 ${this.state.selectedRowKeys.length} 篇用户` : ''}</span>
									<Popconfirm title="确定要删除选中的用户吗？" placement="topRight" onConfirm={this.deleteClick}>
										<Button type="primary"
										        disabled={!this.state.hasSelected}
										        loading={this.state.loading}
										        icon="delete"
										        size="large">
											删除用户
										</Button>
									</Popconfirm>
								</div>
								{this.state.tableDOM}
								{this.state.paginationDOM}
							</div>
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





