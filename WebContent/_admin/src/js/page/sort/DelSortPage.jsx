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
import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';

import '../../../css/sort.less';

export default class DelSortPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sortId   : 0,              // 分类ID
			nowPage  : 1,              // 当前页ID
			pageSize : 10,             // 当前页个数
			loading  : false,          // 按钮是否在请求过程中
			selectedRowKeys : [],      // 选中数据的ID数组
			hasSelected : false,       // 按钮是否可点击

			sortDOM : null,
			paginationDOM : null,
			tableDOM : null
		};

		this.sortSelected     = this.sortSelected.bind(this);
		this.paginationClick  = this.paginationClick.bind(this);
		this.operationClick   = this.operationClick.bind(this);
		this.deleteClick      = this.deleteClick.bind(this);
		this.checkboxSelected = this.checkboxSelected.bind(this);
	}

	componentWillMount() {
		const sortArray = [
			{
				"id" : "3",
				"name" : "图书分类"
			},
			{
				"id" : "8",
				"name" : "笔记分类"
			},
			{
				"id" : "4",
				"name" : "标签分类"
			}
		];

		// 设置state中的分类数据
		this.settingState(sortArray[0].id, "no", "no", "no", "no", "no");

		// 设置sortDOM--因为ajax之后select的默认数据不会自动设置
		this.setState({
			sortDOM : <SelectComponent
				defaultValue={sortArray[0].id}
				data={sortArray}
				selected={this.sortSelected}
			/>
		});

		// 获取分类列表
		this.getSortCount(sortArray[0].id);
	}


	// 设置state中和页面数据相关的值
	settingState(sortId, nowPage, pageSize, loading, selectedRowKeys, hasSelected) {
		if(sortId === "no") {
			sortId = this.state.sortId;
		}
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
			sortId           : sortId,
			nowPage          : nowPage,
			pageSize         : pageSize,
			loading          : loading,
			selectedRowKeys  : selectedRowKeys,
			hasSelected      : hasSelected
		});

	}

	/******************************事件响应方法--开始***********************************/


	// 分类切换
	sortSelected(sortId){
		this.settingState(sortId, "no", "no", "no", "no", "no");
		// 根据分类id获取分类列表
		this.getSortCount(sortId);
	}

	// 翻页按钮点击
	paginationClick(nowPage){
		this.settingState("no", nowPage, "no", "no", "no", false);
		// 根据当前分类加载第一页分类数据
		this.getSortList(nowPage);
	}

	// 操作列点击
	operationClick(index, item){
		console.info(index);
		console.info(item);
		// 删除分类
		this.delSortList(item.Sort_ID.toString());
	}

	// 选中分类
	checkboxSelected(selectedRowKeys) {
		const hasSelected = selectedRowKeys.length > 0;
		this.settingState("no", "no", "no", "no", selectedRowKeys, hasSelected);
	}

	// 删除点击
	deleteClick() {
		this.settingState("no", "no", "no", true, "no", true);
		const selectStr = this.state.selectedRowKeys.join(";");
		// 删除分类
		this.delSortList(selectStr);
	}


	/******************************事件响应方法--结束***********************************/



	// 根据分类id获取分类列表
	getSortCount(sortId) {
		const self = this;
		jQuery.ajax({
			type : "POST",
			url : "/doit/sortAction/getSortCount",
			data : {
				"fSort" : sortId
			},
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success : function(cbData) {
				if(cbData.success === "1"){

					// 设置state中的分类数据
					self.settingState(sortId, "no", "no", "no", "no", "no");

					// paginationDOM--因为ajax之后select的默认数据不会自动设置
					self.setState({
						paginationDOM : <PaginationComponent
							count={cbData.data}
							pageSize={self.state.pageSize}
							pageed={self.paginationClick}/>
					});

					// 根据当前分类加载第一页分类数据
					self.getSortList(1);
				}
			},error :function(){
				message.error("请求分类个数连接出错！");
			}
		});
	}

	// 根据当前分类加载第一页分类数据
	getSortList(nowPage) {
		const self = this;
		jQuery.ajax({
			type : "POST",
			url : "/doit/sortAction/getSortList",
			data : {
				"fSort" : self.state.sortId,
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
				message.error("请求分类列表连接出错！");
			}
		});
	}

	// 组织表格数据
	dealTableData(cbData) {
		const totalWidth = document.getElementById("sort_page").offsetWidth - 25;
		const idWidth        = totalWidth * 0.0749;
		const titleWidth     = totalWidth * 0.3537;
		const urlWidth       = totalWidth * 0.4705;
		const operationWidth = totalWidth * 0.0656;

		const self = this;
		let tableColumns = [
			{ title: 'ID', width: idWidth, dataIndex: 'Sort_ID', key: 'Sort_ID' },
			{ title: '名称', width: titleWidth, dataIndex: 'Sort_Name', key: 'Sort_Name' },
			{ title: '所属父类', width: urlWidth, dataIndex: 'F_Sort', key: 'F_Sort' },
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
						title="确定要删除当前分类吗？"
						placement="topRight"
						onConfirm={self.operationClick.bind(null, index, item)}>

						<a href='javascript:void(0)'>删除</a>
					</Popconfirm>
				);
			}
		});

		let tableData = [];
		for(let item of cbData.data){
			item.key = item.Sort_ID;
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

	// 删除分类
	delSortList(selectStr) {
		const self = this;
		jQuery.ajax({
			type : "POST",
			url : "/doit/sortAction/delSort",
			data : {
				"selectId" : selectStr
			},
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success : function(cbData) {
				if(cbData.success === "1"){
					self.settingState("no", "no", "no", false, "no", false);
                    message.success(cbData.msg+"！", 3);
					// 根据分类id获取分类列表
					self.getSortCount(self.state.sortId);
				}
			},error :function(){
				message.error("删除分类列表连接出错！");
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
							<div id="sort_page" className="page del-sort-page">
								{this.state.sortDOM}
								<div className="del-button">
									<span>{this.state.hasSelected ? `选择了 ${this.state.selectedRowKeys.length} 篇分类` : ''}</span>
									<Popconfirm title="确定要删除选中的分类吗？" placement="topRight" onConfirm={this.deleteClick}>
										<Button type="primary"
										        disabled={!this.state.hasSelected}
										        loading={this.state.loading}
										        icon="delete"
										        size="large">
											删除分类
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





