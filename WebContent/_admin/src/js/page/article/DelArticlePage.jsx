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

import '../../../css/article.less';

export default class DelArticlePage extends React.Component {
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
        // 获取文章的分类列表
        this.byTypeGetSort();
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
        // 根据分类id获取文章列表
        this.getArticleCount(sortId);
    }

    // 翻页按钮点击
    paginationClick(nowPage){
        this.settingState("no", nowPage, "no", "no", "no", false);
        // 根据当前分类加载第一页文章数据
        this.getArticleList(nowPage);
    }

    // 操作列点击
    operationClick(index, item){
        console.info(index);
        console.info(item);
        // 删除文章
        this.delArticleList(item.Article_ID.toString());
    }

    // 选中文章
    checkboxSelected(selectedRowKeys) {
	    const hasSelected = selectedRowKeys.length > 0;
	    this.settingState("no", "no", "no", "no", selectedRowKeys, hasSelected);
    }

	// 删除点击
	deleteClick() {
		this.settingState("no", "no", "no", true, "no", true);
        const selectStr = this.state.selectedRowKeys.join(";");
        // 删除文章
        this.delArticleList(selectStr);
	}


	/******************************事件响应方法--结束***********************************/


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

                    // 设置state中的分类数据
                    self.settingState(sortArray[0].id, "no", "no", "no", "no", "no");

                    // 设置sortDOM--因为ajax之后select的默认数据不会自动设置
                    self.setState({
                        sortDOM : <SelectComponent
                            defaultValue={sortArray[0].id}
                            data={sortArray}
                            selected={self.sortSelected} />
                    });

                    // 根据第一个分类id获取文章列表
                    self.getArticleCount(sortArray[0].id);
                }
            },error :function(){
                message.error("请求文章分类连接出错！");
            }
        });
    }

    // 根据分类id获取文章列表
    getArticleCount(sortId) {
        const self = this;
        jQuery.ajax({
            type : "POST",
            url : "/doit/articleAction/getArticleCount",
            data : {
                "sort" : sortId
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

                    // 根据当前分类加载第一页文章数据
                    self.getArticleList(1);
                }
            },error :function(){
                message.error("请求文章个数连接出错！");
            }
        });
    }

    // 根据当前分类加载第一页文章数据
    getArticleList(nowPage) {
        const self = this;
        jQuery.ajax({
            type : "POST",
            url : "/doit/articleAction/getArticleList",
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
                message.error("请求文章列表连接出错！");
            }
        });
    }

    // 组织表格数据
    dealTableData(cbData) {
        const totalWidth = document.getElementById("article_page").offsetWidth - 40;
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
                return (
                    <Popconfirm
                        title="确定要删除当前文章吗？"
                        placement="topRight"
                        onConfirm={self.operationClick.bind(null, index, item)}>

                        <a href='javascript:void(0)'>删除</a>
                    </Popconfirm>
                );
            }
        });

        let tableData = [];
        for(let item of cbData.data){
            item.key = item.Article_ID;
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

    // 删除文章
    delArticleList(selectStr) {
        const self = this;
        jQuery.ajax({
            type : "POST",
            url : "/doit/articleAction/delArticle",
            data : {
                "selectId" : selectStr
            },
            dataType:"json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success : function(cbData) {
                if(cbData.success === "1"){
                    self.settingState("no", "no", "no", false, "no", false);
                    message.success(cbData.msg+"！", 3);
                    // 根据分类id获取文章列表
                    self.getArticleCount(self.state.sortId);
                }
            },error :function(){
                message.error("删除文章列表连接出错！");
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
                            <div id="article_page" className="page del-article-page">
                                {this.state.sortDOM}
                                <div className="del-button">
                                    <span>{this.state.hasSelected ? `选择了 ${this.state.selectedRowKeys.length} 篇文章` : ''}</span>
                                    <Popconfirm title="确定要删除选中的文章吗？" placement="topRight" onConfirm={this.deleteClick}>
                                        <Button type="primary"
                                                disabled={!this.state.hasSelected}
                                                loading={this.state.loading}
                                                icon="delete"
                                                size="large">
                                            删除文章
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





