/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

import { Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';

export default class EditArticlePage extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
		    sort : 0,
		    page : 1,
		    size : 10,

		    sortDOM : null,
			paginationDOM : null,
		    tableDOM : null
	    };

	    this.selected = this.selected.bind(this);
	    this.pageed = this.pageed.bind(this);
	    this.byTypeGetSort = this.byTypeGetSort.bind(this);
	    this.getArticleCount = this.getArticleCount.bind(this);
	    this.getArticleList = this.getArticleList.bind(this);
	    this.dealTableData = this.dealTableData.bind(this);
	    this.openEditModel = this.openEditModel.bind(this);
    }

	componentWillMount() {
		// 获取文章的分类列表
		this.byTypeGetSort();
	}

	selected(sort){
		// 根据分类id获取文章列表
		this.getArticleCount(sort);
	}

	pageed(page){
		// 根据当前分类加载第一页文章数据
		this.getArticleList(this.state.sort, page);
	}

	// 首先得到文章的分类
	byTypeGetSort() {
		const self = this;
		jQuery.ajax({
			type : "POST",
			url : "/doit/sortAction/byTypeGetSort",
			data : {
				"type" : "article"
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

					// 设置sortDOM--因为ajax之后select的默认数据不会自动设置
					self.setState({
						sort : sortArray[0].id,
						sortDOM : <SelectComponent
									defaultValue={sortArray[0].id}
									data={sortArray}
									selected={self.selected} />
					});

					// 根据第一个分类id获取文章列表
					self.getArticleCount(sortArray[0].id);
				}
			},error :function(){
				alert("请求文章分类连接出错！");
			}
		});
	}

	// 根据分类id获取文章列表
	getArticleCount(sort) {
		const self = this;
		jQuery.ajax({
			type : "POST",
			url : "/doit/articleAction/getArticleCount",
			data : {
				"sort" : sort
			},
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success : function(cbData) {
				if(cbData.success === "1"){
					// paginationDOM--因为ajax之后select的默认数据不会自动设置
					self.setState({
						sort : sort,
						paginationDOM : <PaginationComponent
											count={cbData.data}
											pageSize={self.state.size}
											pageed={self.pageed}/>
					});

					// 根据当前分类加载第一页文章数据
					self.getArticleList(self.state.sort, self.state.page);
				}
			},error :function(){
				alert("请求文章个数连接出错！");
			}
		});
	}

	// 根据当前分类加载第一页文章数据
	getArticleList(sort, page) {
		const self = this;
		jQuery.ajax({
			type : "POST",
			url : "/doit/articleAction/getArticleList",
			data : {
				"sort" : sort,
				"page" : page,
				"size" : self.state.size
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
				alert("请求文章列表连接出错！");
			}
		});
	}

	// 组织表格数据
	dealTableData(cbData) {
        const totalWidth = document.getElementById("article_page").offsetWidth - 25;
        const idWidth        = totalWidth * 0.0749;
        const titleWidth     = totalWidth * 0.3465;
        const sortWidth      = totalWidth * 0.0937;
        const recomWidth     = totalWidth * 0.0937;
        const readWidth      = totalWidth * 0.0937;
        const dateWidth      = totalWidth * 0.1966;
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
                return <a href='javascript:void(0)' onClick={self.openEditModel.bind(null, index, item)}>修改</a>
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
						scroll={scroll}/>
		});
	}

    // 弹出修改窗口
	openEditModel(index, item){
		console.info(index);
        console.info(item);
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
                                <ToolBarComponent />
                            </Col>
                        </Row>
                    </div>
                    <div className="ant-layout-container">
                        <div className="ant-layout-content">
                            <BreadcrumbComponent data={this.props.routes} />
	                        <div id="article_page" className="page edit-article-page">
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





