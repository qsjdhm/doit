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
import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';

export default class ArticleRecomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortId     : 0,              // 分类ID
            nowPage    : 1,              // 当前页ID
            pageSize   : 10,             // 当前页个数

            visible    : false,          // 弹出框是否显示
            mId        : "",             // 弹出框中的文章ID
            mRecomNum  : "",             // 弹出框中的推荐量
            mReadNum   : "",             // 弹出框中的阅读量

            sortDOM : null,
            paginationDOM : null,
            tableDOM : null
        };

        this.sortSelected     = this.sortSelected.bind(this);
        this.paginationClick  = this.paginationClick.bind(this);
        this.operationClick   = this.operationClick.bind(this);

        this.handleOk         = this.handleOk.bind(this);
        this.handleCancel     = this.handleCancel.bind(this);
        this.mRecomChange     = this.mRecomChange.bind(this);
        this.mReadChange      = this.mReadChange.bind(this);
    }

    componentWillMount() {
        // 获取文章的分类列表
        this.byTypeGetSort();
    }


    // 设置state中和页面数据相关的值
    settingState(sortId, nowPage, pageSize, visible, mId, mRecomNum, mReadNum) {
        if(sortId === "no") {
            sortId = this.state.sortId;
        }
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
        if(mRecomNum === "no") {
            mRecomNum = this.state.mRecomNum;
        }
        if(mReadNum === "no") {
            mReadNum = this.state.mReadNum;
        }

        this.setState({
            sortId    : sortId,
            nowPage   : nowPage,
            pageSize  : pageSize,

            visible   : visible,
            mId       : mId,
            mRecomNum : mRecomNum,
            mReadNum  : mReadNum
        });

    }

    /******************************事件响应方法--开始***********************************/


    // 分类切换
    sortSelected(sortId){
        this.settingState(sortId, "no", "no", "no", "no", "no", "no");
        // 根据分类id获取文章列表
        this.getArticleCount(sortId);
    }

    // 翻页按钮点击
    paginationClick(nowPage){
        this.settingState("no", nowPage, "no", "no", "no", "no", "no");
        // 根据当前分类加载第一页文章数据
        this.getArticleList(nowPage);
    }

    // 操作列点击
    operationClick(index, item){
		const self = this;
		setTimeout(function(){
			self.settingState("no", "no", "no", true, item.Article_ID, item.Recommend_Num, item.Read_Num);
		}, 0);
    }

    // 弹出框确认点击
    handleOk(index, item){
        // 更新文章信息
        this.updateArticle();
    }

    // 弹出框取消点击
    handleCancel(index, item){
        this.settingState("no", "no", "no", false, "", "", "");
    }

    mRecomChange(e) {
        const recomNum = e.target.value;
        this.settingState("no", "no", "no", "no", "no", recomNum, "no");
    }

    mReadChange(e) {
        const readNum = e.target.value;
        this.settingState("no", "no", "no", "no", "no", "no", readNum);
    }

    /******************************事件响应方法--结束***********************************/


    // 首先得到文章的分类
    byTypeGetSort() {
		const url = "/doit/sortAction/byTypeGetSort";
		const method = "POST";
		const body = {
			"type" : "article"
		};
		const errInfo = "请求文章分类连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, this.requestSortCallback);
    }

	// 请求文章分类的回调方法
	requestSortCallback(cbData) {

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
			this.settingState(sortArray[0].id, "no", "no", "no", "no", "no", "no");

			// 设置sortDOM--因为ajax之后select的默认数据不会自动设置
			this.setState({
				sortDOM : <SelectComponent
					defaultValue={sortArray[0].id}
					data={sortArray}
					selected={this.sortSelected} />
			});

			// 根据第一个分类id获取文章列表
			this.getArticleCount(sortArray[0].id);
		}
	}

    // 根据分类id获取文章列表
    getArticleCount(sortId) {
		const url = "/doit/articleAction/getArticleCount";
		const method = "POST";
		const body = {
			"sort" : sortId
		};
		const errInfo = "请求文章总个数连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, this.requestCountCallback);
    }

	// 请求文章总个数的回调方法
	requestCountCallback(cbData) {

		if(cbData.success === "1"){
			// 设置state中的分类数据
			this.settingState(this.state.sortId, "no", "no", "no", "no", "no", "no");

			// paginationDOM--因为ajax之后select的默认数据不会自动设置
			this.setState({
				paginationDOM : <PaginationComponent
					count={cbData.data}
					pageSize={this.state.pageSize}
					pageed={this.paginationClick}/>
			});

			// 根据当前分类加载第一页文章数据
			this.getArticleList(1);
		}
	}

    // 根据当前分类加载第一页文章数据
    getArticleList(nowPage) {
		const url = "/doit/articleAction/getArticleList";
		const method = "POST";
		const body = {
			"sort" : this.state.sortId,
			"page" : nowPage,
			"size" : this.state.pageSize
		};
		const errInfo = "请求文章列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, this.requestArticleListCallback);
    }

	// 请求文章列表的回调方法
	requestArticleListCallback(cbData) {

		if(cbData.success === "1"){
			// 组织表格数据
			this.dealTableData(cbData);
		}
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
                return <a href='javascript:void(0)' onClick={self.operationClick.bind(null, index, item)}>推荐</a>
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

    // 更新文章信息
    updateArticle() {
		const self = this;
		setTimeout(function() {
			const url = "/doit/recommendAction/recommendArticle";
			const method = "POST";
			const body = {
				"id"           : self.state.mId,
				"recommendNum" : self.state.mRecomNum,
				"readNum"      : self.state.mReadNum
			};
			const errInfo = "修改文章连接出错！";
			fetchComponent.send(self, url, method, body, errInfo, self.requestUpdateCallback);
		}, 0);
    }

	// 更新文章的回调方法
	requestUpdateCallback(cbData) {
		this.settingState("no", "no", "no", false, "", "", "", "");
		if(cbData.success === "1") {
			// 重新获取当前页数据
			this.getArticleList(this.state.nowPage);
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
                            <div id="article_page" className="page recom-article-page">
                                {this.state.sortDOM}
                                {this.state.tableDOM}
                                {this.state.paginationDOM}
                            </div>

                            <Modal title="修改文章推荐信息"
                                   visible={this.state.visible}
                                   onOk={this.handleOk}
                                   onCancel={this.handleCancel}>
                                <Form horizontal>
                                    <FormItem
                                        label="文章推荐量">
                                        <Input style={{width:400}} value={this.state.mRecomNum} onChange={this.mRecomChange} placeholder="" size="large"/>
                                    </FormItem>
                                    <FormItem
                                        label="文章阅读量">
                                        <Input style={{width:400}} value={this.state.mReadNum} onChange={this.mReadChange} placeholder="" size="large"/>
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





