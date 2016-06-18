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
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';


export default class EditCommentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowPage  : 1,              // 当前页ID
            pageSize : 10,             // 当前页个数
            loading  : false,          // 按钮是否在请求过程中

            paginationDOM : null,
            tableDOM : null
        };

        this.paginationClick  = this.paginationClick.bind(this);
        this.operationClick   = this.operationClick.bind(this);
    }

    componentWillMount() {
        // 获取评论的总个数
        this.getCommentCount();
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
        // 根据当前分类加载第一页评论数据
        this.getCommentList(nowPage);
    }

    // 操作列点击
    operationClick(index, item){
        console.info(index);
        console.info(item);
    }


    /******************************事件响应方法--结束***********************************/

    // 获取评论列表
    getCommentCount() {
        const self = this;
        jQuery.ajax({
            type : "POST",
            url : "/doit/commentAction/getCommentCount",
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

                    // 根据当前分类加载第一页评论数据
                    self.getCommentList(1);
                }
            },error :function(){
                message.error("请求评论个数连接出错！");
            }
        });
    }

    // 根据当前分类加载第一页评论数据
    getCommentList(nowPage) {
        const self = this;
        jQuery.ajax({
            type : "POST",
            url : "/doit/commentAction/getCommentList",
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
                message.error("请求评论列表连接出错！");
            }
        });
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
            { title: '评论人', width: userWidth, dataIndex: 'Comment_Person_Name', key: 'Comment_Person_Name' },
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
                            <div id="comment_page" className="page edit-comment-page">
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





