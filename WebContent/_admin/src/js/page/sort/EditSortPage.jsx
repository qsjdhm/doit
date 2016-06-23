/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

import { Modal, Form, Input, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';

export default class EditSortPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sortId     : 0,              // 分类ID
			nowPage    : 1,              // 当前页ID
			pageSize   : 10,             // 当前页个数

            visible    : false,          // 弹出框是否显示
            mId        : "",             // 弹出框中的分类ID
            mSortName  : "",             // 弹出框中的分类名称
            mFSortId   : "",             // 弹出框中的父分类ID

			sortDOM : null,
			paginationDOM : null,
			tableDOM : null,

            //mSortDOM : null
		};

		this.sortSelected     = this.sortSelected.bind(this);
		this.paginationClick  = this.paginationClick.bind(this);
		this.operationClick   = this.operationClick.bind(this);

        this.handleOk         = this.handleOk.bind(this);
        this.handleCancel     = this.handleCancel.bind(this);
        this.mSortSelected    = this.mSortSelected.bind(this);
        this.mNameChange      = this.mNameChange.bind(this);
	}

	componentWillMount() {
        // 初始化分类下拉框的数据
        this.initSortSelectData();
	}


	// 设置state中和页面数据相关的值
	settingState(sortId, nowPage, pageSize, visible, mId, mSortName, mFSortId) {
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
        if(mSortName === "no") {
            mSortName = this.state.mSortName;
        }
        if(mFSortId === "no") {
            mFSortId = this.state.mFSortId;
        }

		this.setState({
			sortId    : sortId,
			nowPage   : nowPage,
			pageSize  : pageSize,

            visible   : visible,
            mId       : mId,
            mSortName : mSortName,
            mFSortId  : mFSortId
		});

	}

	/******************************事件响应方法--开始***********************************/


	// 分类切换
	sortSelected(sortId){
		this.settingState(sortId, "no", "no", "no", "no", "no", sortId);
		// 根据分类id获取分类列表
		this.getSortCount(sortId);
	}

	// 翻页按钮点击
	paginationClick(nowPage){
		this.settingState("no", nowPage, "no", "no", "no", "no", "no");
		// 根据当前分类加载第一页分类数据
		this.getSortList(nowPage);
	}

	// 操作列点击
	operationClick(index, item){
        // 初始化父分类下拉框的数据
        this.initMFSortSelectData(item);
	}

    // 弹出框确认点击
    handleOk(index, item){
        // 更新分类信息
        this.updateSort();
    }

    // 弹出框取消点击
    handleCancel(index, item){
        this.settingState("no", "no", "no", false, "", "", "");
    }

    mSortSelected(fSortId) {
        this.settingState("no", "no", "no", "no", "no", "no", fSortId);
    }

    mNameChange(e) {
        const sortName = e.target.value;
        this.settingState("no", "no", "no", "no", "no", sortName, "no");
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
					self.settingState(sortId, "no", "no", "no", "no", "no", "no");

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

    // 初始化分类下拉框的数据
    initSortSelectData() {
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
        this.settingState(sortArray[0].id, "no", "no", "no", "no", "no", "no");

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
				return <a href='javascript:void(0)' onClick={self.operationClick.bind(null, index, item)}>修改</a>
			}
		});

		let tableData = [];
		for(let item of cbData.data){
			item.key = item.Sort_ID;
			tableData.push(item);
		}

		// 表格的配置
		const expandedRowRender = record => <p>{record.Sort_Name}</p>;
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


    // 初始化父分类下拉框的数据
    initMFSortSelectData(item) {
        //const self = this;
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

        console.info(item);
        this.settingState("no", "no", "no", true, item.Sort_ID, item.Sort_Name, item.F_Sort);
        console.info(this.state);
        console.info(this.state.mFSortId);
        // 设置sortDOM--因为ajax之后select的默认数据不会自动设置

        //this.setState({
        //    mSortDOM : <SelectComponent
        //        defaultValue={""+this.state.mFSortId}
        //        data={sortArray}
        //        selected={this.mSortSelected}
        //    />
        //});

    }





	render() {
        const FormItem = Form.Item;
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
							<div id="sort_page" className="page edit-sort-page">
								{this.state.sortDOM}
								{this.state.tableDOM}
								{this.state.paginationDOM}
							</div>

                            <Modal title="修改外链详细信息"
                                   visible={this.state.visible}
                                   onOk={this.handleOk}
                                   onCancel={this.handleCancel}>
                                <Form horizontal>
                                    <FormItem
                                        label="所属分类 : ">
                                        <SelectComponent
                                            defaultValue={""+this.state.mFSortId}
                                            data={sortArray}
                                            selected={this.mSortSelected}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="分类名称 : ">
                                        <Input value={this.state.mSortName} onChange={this.mNameChange} placeholder="" size="large"/>
                                    </FormItem>
                                </Form>
                            </Modal>
						</div>
					</div>
					<div className="ant-layout-footer">
						52DOIT 版权所有 © 2016 由不拽注定被甩~技术支持1
					</div>
				</div>
			</div>
		);
	}
};





