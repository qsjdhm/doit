/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

import { message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';

export default class EditNotePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sortId   : 0,              // 分类ID
			nowPage  : 1,              // 当前页ID
			pageSize : 10,             // 当前页个数

			sortDOM : null,
			paginationDOM : null,
			tableDOM : null
		};

		this.sortSelected     = this.sortSelected.bind(this);
		this.paginationClick  = this.paginationClick.bind(this);
		this.operationClick   = this.operationClick.bind(this);
	}

	componentWillMount() {
		// 获取笔记的分类列表
		this.byTypeGetSort();
	}


	// 设置state中和页面数据相关的值
	settingState(sortId, nowPage, pageSize) {
		if(sortId === "no") {
			sortId = this.state.sortId;
		}
		if(nowPage === "no") {
			nowPage = this.state.nowPage;
		}
		if(pageSize === "no") {
			pageSize = this.state.pageSize;
		}

		this.setState({
			sortId    : sortId,
			nowPage   : nowPage,
			pageSize  : pageSize
		});

	}

	/******************************事件响应方法--开始***********************************/


	// 分类切换
	sortSelected(sortId){
		this.settingState(sortId, "no", "no");
		// 根据分类id获取笔记列表
		this.getNoteCount(sortId);
	}

	// 翻页按钮点击
	paginationClick(nowPage){
		this.settingState("no", nowPage, "no");
		// 根据当前分类加载第一页笔记数据
		this.getNoteList(nowPage);
	}

	// 操作列点击
	operationClick(index, item){
		console.info(index);
		console.info(item);
	}

	/******************************事件响应方法--结束***********************************/


	// 首先得到笔记的分类
	byTypeGetSort() {
		const self = this;
		jQuery.ajax({
			type : "POST",
			url : "/doit/sortAction/byTypeGetSort",
			data : {
				"type" : "note"
			},
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success : function(cbData) {
				if(cbData.success === "1"){
					let sortArray = [];
					for(let item of cbData.data){
						const sortObj = {
							"id" : item.Sort_ID,
							"name" : item.Sort_Name
						};
						sortArray.push(sortObj);
					}

					// 设置state中的分类数据
					self.settingState(sortArray[0].id, "no", "no");

					// 设置sortDOM--因为ajax之后select的默认数据不会自动设置
					self.setState({
						sortDOM : <SelectComponent
							defaultValue={sortArray[0].id}
							data={sortArray}
							selected={self.sortSelected} />
					});

					// 根据第一个分类id获取笔记列表
					self.getNoteCount(sortArray[0].id);
				}
			},error :function(){
				message.error("请求笔记分类连接出错！");
			}
		});
	}

	// 根据分类id获取笔记列表
	getNoteCount(sortId) {
		const self = this;
		jQuery.ajax({
			type : "POST",
			url : "/doit/noteAction/getNoteCount",
			data : {
				"sort" : sortId
			},
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success : function(cbData) {
				if(cbData.success === "1"){

					// 设置state中的分类数据
					self.settingState(sortId, "no", "no");

					// paginationDOM--因为ajax之后select的默认数据不会自动设置
					self.setState({
						paginationDOM : <PaginationComponent
							count={cbData.data}
							pageSize={self.state.pageSize}
							pageed={self.paginationClick}/>
					});

					// 根据当前分类加载第一页笔记数据
					self.getNoteList(1);
				}
			},error :function(){
				message.error("请求笔记个数连接出错！");
			}
		});
	}

	// 根据当前分类加载第一页笔记数据
	getNoteList(nowPage) {
		const self = this;
		jQuery.ajax({
			type : "POST",
			url : "/doit/noteAction/getNoteList",
			data : {
				"sort" : self.state.sortId,
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
				message.error("请求笔记列表连接出错！");
			}
		});
	}

	// 组织表格数据
	dealTableData(cbData) {
		const totalWidth = document.getElementById("note_page").offsetWidth - 25;
		const idWidth        = totalWidth * 0.0749;
		const titleWidth     = totalWidth * 0.3465;
		const sortWidth      = totalWidth * 0.1737;
		const recomWidth     = totalWidth * 0.0637;
		const readWidth      = totalWidth * 0.0637;
		const dateWidth      = totalWidth * 0.1766;
		const operationWidth = totalWidth * 0.0656;

		const self = this;
		let tableColumns = [
			{ title: 'ID', width: idWidth, dataIndex: 'Article_ID', key: 'Article_ID' },
			{ title: '名称', width: titleWidth, dataIndex: 'Article_Title', key: 'Article_Title' },
			{ title: '分类', width: sortWidth, dataIndex: 'Sort_Name', key: 'Sort_Name' },
			{ title: '推荐量', width: recomWidth, dataIndex: 'Recommend_Num', key: 'Recommend_Num' },
			{ title: '点击量', width: readWidth, dataIndex: 'Read_Num', key: 'Read_Num' },
			{ title: '时间', width: dateWidth, dataIndex: 'Article_Date', key: 'Article_Date' }
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
			item.key = item.Article_ID;
			tableData.push(item);
		}

		// 表格的配置
		const expandedRowRender = record => <p>{record.Article_Content}</p>;
		const scroll = { y: 350, x: totalWidth };

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
							<div id="note_page" className="page edit-note-page">
								{this.state.sortDOM}
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





