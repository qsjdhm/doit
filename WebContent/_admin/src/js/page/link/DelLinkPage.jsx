/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { Popconfirm, Button, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';

import '../../../css/link.less';

export default class DelLinkPage extends React.Component {
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
		// 获取链接的总个数
		this.getLinkCount();
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
		// 根据当前分类加载第一页链接数据
		this.getLinkList(nowPage);
	}

	// 操作列点击
	operationClick(index, item){
		const self = this;
		setTimeout(function(){
			// 删除链接
			self.delLinkList(item.Link_ID.toString());
		}, 0);
	}

	// 选中链接
	checkboxSelected(selectedRowKeys) {
		const hasSelected = selectedRowKeys.length > 0;
		this.settingState("no", "no", "no", selectedRowKeys, hasSelected);
	}

	// 删除点击
	deleteClick() {
		this.settingState("no", "no", true, "no", true);
		const selectStr = this.state.selectedRowKeys.join(";");
		// 删除链接
		this.delLinkList(selectStr);
	}


	/******************************事件响应方法--结束***********************************/



	// 获取链接列表
	getLinkCount() {
		const url = "/doit/linkAction/getLinkCount";
		const method = "POST";
		const body = {};
		const errInfo = "请求链接个数连接出错！";
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

			// 根据当前分类加载第一页链接数据
			this.getLinkList(1);
		}
	}

	// 根据当前分类加载第一页链接数据
	getLinkList(nowPage) {
		const url = "/doit/linkAction/getLinkList";
		const method = "POST";
		const body = {
			"page" : nowPage,
			"size" : this.state.pageSize
		};
		const errInfo = "请求链接列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, this.requestLinkListCallback);
	}

	// 请求外链列表的回调方法
	requestLinkListCallback(cbData) {

		if(cbData.success === "1"){
			// 组织表格数据
			this.dealTableData(cbData);
		}
	}

	// 组织表格数据
	dealTableData(cbData) {
		const totalWidth = document.getElementById("link_page").offsetWidth - 25;
		const idWidth        = totalWidth * 0.0749;
		const titleWidth     = totalWidth * 0.3537;
		const urlWidth       = totalWidth * 0.4705;
		const operationWidth = totalWidth * 0.0656;

		const self = this;
		let tableColumns = [
			{ title: 'ID', width: idWidth, dataIndex: 'Link_ID', key: 'Link_ID' },
			{ title: '名称', width: titleWidth, dataIndex: 'Link_Name', key: 'Link_Name' },
			{ title: 'URL', width: urlWidth, dataIndex: 'Link_Url', key: 'Link_Url' },
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
						title="确定要删除当前链接吗？"
						placement="topRight"
						onConfirm={self.operationClick.bind(null, index, item)}>

						<a href='javascript:void(0)'>删除</a>
					</Popconfirm>
				);
			}
		});

		let tableData = [];
		for(let item of cbData.data){
			item.key = item.Link_ID;
			tableData.push(item);
		}

		// 表格的配置
		const scroll = { y: 380, x: totalWidth };

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

	// 删除链接
	delLinkList(selectStr) {
		const url = "/doit/linkAction/delLink";
		const method = "POST";   
		const body = {    
			"selectId" : selectStr
		};
		const errInfo = "删除链接列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, this.requestDelCallback);
	}

	// 更新外链的回调方法
	requestDelCallback(cbData) {
		this.settingState("no", "no", false, "no", false);
		if(cbData.success === "1"){
			message.success(cbData.msg+"！", 3);
			// 获取链接列表
			this.getLinkCount();
		}
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
							<div id="link_page" className="page del-link-page">
								<div className="del-button">
									<span>{this.state.hasSelected ? `选择了 ${this.state.selectedRowKeys.length} 篇评论` : ''}</span>
									<Popconfirm title="确定要删除选中的链接吗？" placement="topRight" onConfirm={this.deleteClick}>
										<Button type="primary"
										        disabled={!this.state.hasSelected}
										        loading={this.state.loading}
										        icon="delete"
										        size="large">
											删除链接
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





