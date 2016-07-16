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

export default class BookRecomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortId   : 0,                // 分类ID
            nowPage  : 1,                // 当前页ID
            pageSize : 10,               // 当前页个数

            visible    : false,          // 弹出框是否显示
            mId        : "",             // 弹出框中的图书ID
            mRecomNum  : "",             // 弹出框中的推荐量
            mDown_Num  : "",             // 弹出框中的下载量

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
        this.mDownChange      = this.mDownChange.bind(this);
    }

    componentWillMount() {
        // 获取图书的分类列表
        this.byTypeGetSort();
    }


    // 设置state中和页面数据相关的值
    settingState(sortId, nowPage, pageSize, visible, mId, mRecomNum, mDown_Num) {
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
        if(mDown_Num === "no") {
            mDown_Num = this.state.mDown_Num;
        }

        this.setState({
            sortId    : sortId,
            nowPage   : nowPage,
            pageSize  : pageSize,

            visible   : visible,
            mId       : mId,
            mRecomNum : mRecomNum,
            mDown_Num : mDown_Num
        });

    }

    /******************************事件响应方法--开始***********************************/


    // 分类切换
    sortSelected(sortId){
        this.settingState(sortId, "no", "no", "no", "no", "no", "no");
        // 根据分类id获取图书列表
        this.getBookCount(sortId);
    }

    // 翻页按钮点击
    paginationClick(nowPage){
        this.settingState("no", nowPage, "no", "no", "no", "no", "no");
        // 根据当前分类加载第一页图书数据
        this.getBookList(nowPage);
    }

    // 操作列点击
    operationClick(index, item){
		const self = this;
		setTimeout(function(){
			self.settingState("no", "no", "no", true, item.Book_ID, item.Recommend_Num, item.Download_Num);
		}, 0);
    }

    // 弹出框确认点击
    handleOk(index, item){
        // 更新图书信息
        this.updateBook();
    }

    // 弹出框取消点击
    handleCancel(index, item){
        this.settingState("no", "no", "no", false, "", "", "");
    }

    mRecomChange(e) {
        const recomNum = e.target.value;
        this.settingState("no", "no", "no", "no", "no", recomNum, "no");
    }

    mDownChange(e) {
        const downNum = e.target.value;
        this.settingState("no", "no", "no", "no", "no", "no", downNum);
    }

    /******************************事件响应方法--结束***********************************/


    // 首先得到图书的分类
    byTypeGetSort() {
		const url = "/doit/sortAction/byTypeGetSort";
		const method = "POST";
		const body = {
			"type" : "book"
		};
		const errInfo = "请求图书分类连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, this.requestSortCallback);
    }

	// 请求图书分类的回调方法
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

			// 根据第一个分类id获取图书列表
			this.getBookCount(sortArray[0].id);
		}
	}

    // 根据分类id获取图书列表
    getBookCount(sortId) {
		const url = "/doit/bookAction/getBookCount";
		const method = "POST";
		const body = {
			"sort" : sortId
		};
		const errInfo = "请求图书总个数连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, this.requestCountCallback);
    }

	// 请求图书总个数的回调方法
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

			// 根据当前分类加载第一页图书数据
			this.getBookList(1);
		}
	}

    // 根据当前分类加载第一页图书数据
    getBookList(nowPage) {
		const url = "/doit/bookAction/getBookList";
		const method = "POST";
		const body = {
			"sort" : this.state.sortId,
			"page" : nowPage,
			"size" : this.state.pageSize
		};
		const errInfo = "请求图书列表连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, this.requestBookListCallback);
    }

	// 请求图书列表的回调方法
	requestBookListCallback(cbData) {

		if(cbData.success === "1"){
			// 组织表格数据
			this.dealTableData(cbData);
		}
	}

    // 组织表格数据
    dealTableData(cbData) {
        const totalWidth = document.getElementById("book_page").offsetWidth - 25;
        const idWidth        = totalWidth * 0.0749;
        const titleWidth     = totalWidth * 0.3465;
        const sortWidth      = totalWidth * 0.1737;
        const recomWidth     = totalWidth * 0.1520;
        const readWidth      = totalWidth * 0.1520;
        const operationWidth = totalWidth * 0.0656;

        const self = this;
        let tableColumns = [
            { title: 'ID', width: idWidth, dataIndex: 'Book_ID', key: 'Book_ID' },
            { title: '名称', width: titleWidth, dataIndex: 'Book_Name', key: 'Book_Name' },
            { title: '分类', width: sortWidth, dataIndex: 'Sort_Name', key: 'Sort_Name' },
            { title: '推荐量', width: recomWidth, dataIndex: 'Recommend_Num', key: 'Recommend_Num' },
            { title: '点击量', width: readWidth, dataIndex: 'Download_Num', key: 'Download_Num' },
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
            item.key = item.Book_ID;
            tableData.push(item);
        }

        // 表格的配置
        const expandedRowRender = record => <p>{record.Book_Link}</p>;
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

    // 更新图书信息
    updateBook() {
		const url = "/doit/recommendAction/recommendBook";
		const method = "POST";
		const body = {
			"id"           : this.state.mId,
			"recommendNum" : this.state.mRecomNum,
			"downNum"      : this.state.mDown_Num
		};
		const errInfo = "更新图书信息连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, this.requestUpdateCallback);
    }

	// 更新图书的回调方法
	requestUpdateCallback(cbData) {
		this.settingState("no", "no", "no", false, "", "", "", "");
		if(cbData.success === "1") {
			// 重新获取当前页数据
			this.getBookList(this.state.nowPage);
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
                            <div id="book_page" className="page recom-book-page">
                                {this.state.sortDOM}
                                {this.state.tableDOM}
                                {this.state.paginationDOM}
                            </div>

                            <Modal title="修改图书推荐信息"
                                   visible={this.state.visible}
                                   onOk={this.handleOk}
                                   onCancel={this.handleCancel}>
                                <Form horizontal>
                                    <FormItem
                                        label="图书推荐量">
                                        <Input style={{width:400}} value={this.state.mRecomNum} onChange={this.mRecomChange} placeholder="" size="large"/>
                                    </FormItem>
                                    <FormItem
                                        label="图书下载量">
                                        <Input style={{width:400}} value={this.state.mDown_Num} onChange={this.mDownChange} placeholder="" size="large"/>
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





