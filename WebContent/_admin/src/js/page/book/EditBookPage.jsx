/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { Modal, Form, Upload, Button, Input, Icon, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';

export default class EditBookPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortId       : 0,              // 分类ID
            nowPage      : 1,              // 当前页ID
            pageSize     : 10,             // 当前页个数

            visible      : false,           // 弹出框是否显示
            mAllSort     : [],              // 所有分类的数组
            mSortId      : 0,               // 分类ID
            mSortName    : "",              // 分类Name
            mId          : "",              // 图书ID
            mTitle       : "",              // 图书标题
            mHeight      : "",              // 图书内容
            mCover       : "",              // 图书封面
            mPath        : "",              // 图书路径

            sortDOM : null,
            paginationDOM : null,
            tableDOM : null,

            mSortDOM : null,
			mUploadDOM : null
        };

        this.sortSelected     = this.sortSelected.bind(this);
        this.paginationClick  = this.paginationClick.bind(this);
        this.operationClick   = this.operationClick.bind(this);

        this.handleOk         = this.handleOk.bind(this);
        this.handleCancel     = this.handleCancel.bind(this);
        this.mSortSelected    = this.mSortSelected.bind(this);
        this.mTitleChange     = this.mTitleChange.bind(this);
        this.mHeightChange    = this.mHeightChange.bind(this);
        this.mPathChange      = this.mPathChange.bind(this);
    }

    componentWillMount() {
        // 获取图书的分类列表
        this.byTypeGetSort();
    }


    // 设置state中和页面数据相关的值
    settingState(sortId, nowPage, pageSize,
                visible, mAllSort, mSortId, mSortName, mId, mTitle, mHeight, mCover, mPath) {
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
        if(mAllSort === "no") {
            mAllSort = this.state.mAllSort;
        }
        if(mSortId === "no") {
            mSortId = this.state.mSortId;
        }
        if(mSortName === "no") {
            mSortName = this.state.mSortName;
        }
        if(mId === "no") {
            mId = this.state.mId;
        }
        if(mTitle === "no") {
            mTitle = this.state.mTitle;
        }
        if(mHeight === "no") {
            mHeight = this.state.mHeight;
        }
        if(mCover === "no") {
            mCover = this.state.mCover;
        }
        if(mPath === "no") {
            mPath = this.state.mPath;
        }

        this.setState({
            sortId       : sortId,
            nowPage      : nowPage,
            pageSize     : pageSize,

            visible      : visible,
            mAllSort     : mAllSort,
            mSortId      : mSortId,
            mSortName    : mSortName,
            mId          : mId,
            mTitle       : mTitle,
            mHeight      : mHeight,
            mCover       : mCover,
            mPath        : mPath
        });

    }

    /******************************事件响应方法--开始***********************************/


    // 分类切换
    sortSelected(sortId){
        this.settingState(sortId, "no", "no",
                        "no", "no", "no", "no",
                        "no", "no", "no", "no", "no");
        // 根据分类id获取图书列表
        this.getBookCount(sortId);
    }

    // 翻页按钮点击
    paginationClick(nowPage){
        this.settingState("no", nowPage, "no",
                        "no", "no", "no", "no",
                        "no", "no", "no", "no", "no");
        // 根据当前分类加载第一页图书数据
        this.getBookList(nowPage);
    }

    // 操作列点击
    operationClick(index, item){
        const self = this;
        setTimeout(function(){
            self.settingState("no", "no", "no",
                true, "no", "no", "no",
                "no", "no", "no", "no", "no");
            // 根据ID获取图书全部信息
            self.getBook(item.Book_ID);
        }, 0);
    }

    // 弹出框确认点击
    handleOk(index, item){
		this.setState({
			mSortDOM : false,
			mUploadDOM : false
		});
        // 更新图书信息
        this.updateBook();
    }

    // 弹出框取消点击
    handleCancel(index, item){
        this.setState({
            mSortDOM : false,
			mUploadDOM : false
        });
        this.settingState("no", "no", "no",
                        false, "no", "no", "no",
                        "", "", "", "", "");
    }

    mSortSelected(sortId) {
        let nowSort = {
            sortId   : sortId,
            sortName : ""
        };
        const sorts = this.state.mAllSort;
        for(let sort of sorts){
            if(sort.id === sortId) {
                nowSort.sortName = sort.name;
                break;
            }
        }

        this.settingState("no", "no", "no",
                        "no", "no", nowSort.sortId, nowSort.sortName,
                        "no", "no", "no", "no", "no");
    }

    mTitleChange(e) {
        const name = e.target.value;
        this.settingState("no", "no", "no",
            "no", "no", "no", "no",
            "no", name, "no", "no", "no");
    }

    mHeightChange(e) {
        const height = e.target.value;
        this.settingState("no", "no", "no",
            "no", "no", "no", "no",
            "no", "no", height, "no", "no");
    }

    mPathChange(e) {
        const path = e.target.value;
        this.settingState("no", "no", "no",
            "no", "no", "no", "no",
            "no", "no", "no", "no", path);
    }

	// 上传成功的回调方法
	uploaderSuccess(info) {
		message.success(`${info.file.name} 上传成功。`);
		this.settingState("no", "no", "no",
			"no", "no", "no", "no",
			"no", "no", "no", info.file.response, "no");
	}

	// 上传失败的回调方法
	uploaderError(info) {
		message.error(`${info.file.name} 上传失败。`);
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
			this.settingState(sortArray[0].id, "no", "no",
				"no", sortArray, sortArray[0].id, sortArray[0].name,
				"no", "no", "no", "no", "no");
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
			this.settingState(this.state.sortId, "no", "no",
				"no", "no", "no", "no",
				"no", "no", "no", "no", "no");

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

    // 根据ID获取用户全部信息
    getBook(id) {
		const url = "/doit/bookAction/getBook";
		const method = "POST";
		const body = {
			"selectId" : id
		};
		const errInfo = "请求图书信息连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, this.requestBookCallback);
    }

	// 请求图书列表的回调方法
	requestBookCallback(cbData) {
		if(cbData.success === "1"){
			this.settingState("no", "no", "no",
				"no", "no", cbData.sortId, cbData.sortName,
				cbData.id, cbData.name, cbData.height, cbData.cover, cbData.link);
			// 初始化父分类下拉框的数据
			this.initMSortSelectData();
		}
	}

    // 初始化分类下拉框的数据
    initMSortSelectData() {
		const self = this;
        const sortArray = this.state.mAllSort;
		const props = {                // 图书路径
			name: 'file',
			action: '/doit/UniversalUploadAction',
			headers: {
				authorization: 'authorization-text',
			},
			onChange(info) {
				if (info.file.status !== 'uploading') {
					console.log(info.file, info.fileList);
				}
				if (info.file.status === 'done') {
					self.uploaderSuccess(info);
				} else if (info.file.status === 'error') {
					self.uploaderError(info);
				}
			}
		};

        // 设置sortDOM--因为ajax之后select的默认数据不会自动设置
        this.setState({
            mSortDOM : <SelectComponent
                defaultValue={this.state.mSortId}
                data={sortArray}
                selected={this.mSortSelected}
                />,
			mUploadDOM : <Upload {...props}>
				<Button className="uploader-btn" type="ghost">
					<Icon type="upload" /> 点击上传
				</Button>
			</Upload>
        });
    }

    // 更新图书信息
    updateBook() {
		const url = "/doit/bookAction/updateBook";
		const method = "POST";
		const body = {
			"id"       : this.state.mId,
			"sortId"   : this.state.mSortId,
			"sortName" : encodeURI(encodeURI(this.state.mSortName)),
			"name"     : encodeURI(encodeURI(this.state.mTitle)),
			"height"   : this.state.mHeight,
			"cover"    : this.state.mCover,
			"link"     : this.state.mPath
		};
		const errInfo = "修改图书连接出错！";
		fetchComponent.send(this, url, method, body, errInfo, this.requestUpdateCallback);
    }

	// 更新图书的回调方法
	requestUpdateCallback(cbData) {
		this.settingState("no", "no", "no",
			false, "no", "no", "no",
			"no", "no", "no", "no", "no");
		if(cbData.success === "1") {
			// 重新获取当前页数据
			this.getBookList(this.state.nowPage);
			message.success(cbData.msg+"！", 3);
		} else {
			message.error(cbData.msg+"！", 3);
		}
	}

    render() {
		const self = this;
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
                            <div id="book_page" className="page edit-book-page">
                                {this.state.sortDOM}
                                {this.state.tableDOM}
                                {this.state.paginationDOM}
                            </div>

                            <Modal title="修改图书详细信息"
                                   visible={this.state.visible}
                                   onOk={this.handleOk}
                                   onCancel={this.handleCancel}>
                                <Form horizontal>
                                    <FormItem
                                        label="图书封面">
										{this.state.mUploadDOM}
                                    </FormItem>
                                    <FormItem
                                        label="图书分类">
                                        {this.state.mSortDOM}
                                    </FormItem>
                                    <FormItem
                                        label="图书名称">
                                        <Input value={this.state.mTitle} onChange={this.mTitleChange} placeholder="" size="large"/>
                                    </FormItem>
                                    <FormItem
                                        label="图书高度">
                                        <Input value={this.state.mHeight} onChange={this.mHeightChange} placeholder="" size="large"/>
                                    </FormItem>
                                    <FormItem
                                        label="下载路径">
                                        <Input value={this.state.mPath} onChange={this.mPathChange} type="textarea" rows="3" placeholder="" size="large"/>
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





