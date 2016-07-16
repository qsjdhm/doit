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

import '../../../css/comment.less';

export default class DelCommentPage extends React.Component {
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
		const self = this;
		setTimeout(function(){
			// 删除评论
			self.delCommentList(item.Comment_ID.toString());
		}, 0);
    }

    // 选中评论
    checkboxSelected(selectedRowKeys) {
        const hasSelected = selectedRowKeys.length > 0;
        this.settingState("no", "no", "no", selectedRowKeys, hasSelected);
    }

    // 删除点击
    deleteClick() {
        this.settingState("no", "no", true, "no", true);
        const selectStr = this.state.selectedRowKeys.join(";");
        // 删除评论
        this.delCommentList(selectStr);
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
                return (
                    <Popconfirm
                        title="确定要删除当前评论吗？"
                        placement="topRight"
                        onConfirm={self.operationClick.bind(null, index, item)}>

                        <a href='javascript:void(0)'>删除</a>
                    </Popconfirm>
                );
            }
        });

        let tableData = [];
        for(let item of cbData.data){
            item.key = item.Comment_ID;
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

    // 删除评论
    delCommentList(selectStr) {
		const url = "/doit/commentAction/delComment";
		const method = "POST";
		const body = {
			"selectId" : selectStr
		};
		const errInfo = "删除评论信息连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, this.requestDelCallback);
    }

	// 删除评论的回调方法
	requestDelCallback(cbData) {

		if(cbData.success === "1"){
			this.settingState("no", "no", false, "no", false);
			message.success(cbData.msg+"！", 3);
			// 获取评论列表
			this.getCommentCount();
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
                            <div id="comment_page" className="page del-comment-page">
                                <div className="del-button">
                                    <span>{this.state.hasSelected ? `选择了 ${this.state.selectedRowKeys.length} 篇评论` : ''}</span>
                                    <Popconfirm title="确定要删除选中的评论吗？" placement="topRight" onConfirm={this.deleteClick}>
                                        <Button type="primary"
                                                disabled={!this.state.hasSelected}
                                                loading={this.state.loading}
                                                icon="delete"
                                                size="large">
                                            删除评论
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





