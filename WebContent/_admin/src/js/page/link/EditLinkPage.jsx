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
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';


export default class EditLinkPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nowPage    : 1,              // 当前页ID
			pageSize   : 10,             // 当前页个数

            visible    : false,          // 弹出框是否显示
            mId        : "",             // 弹出框中的外链ID
            mLinkName  : "",             // 弹出框中的外链名称
            mLinkURL   : "",             // 弹出框中的外链URL

			paginationDOM : null,
			tableDOM : null
		};

		this.paginationClick  = this.paginationClick.bind(this);
		this.operationClick   = this.operationClick.bind(this);

        this.handleOk         = this.handleOk.bind(this);
        this.handleCancel     = this.handleCancel.bind(this);
        this.mNameChange      = this.mNameChange.bind(this);
        this.mURLChange       = this.mURLChange.bind(this);
	}

	componentWillMount() {
		// 获取链接的总个数
		this.getLinkCount();
	}


	// 设置state中和页面数据相关的值
	settingState(nowPage, pageSize, visible, mId, mLinkName, mLinkURL) {
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
        if(mLinkName === "no") {
            mLinkName = this.state.mLinkName;
        }
        if(mLinkURL === "no") {
            mLinkURL = this.state.mLinkURL;
        }

		this.setState({
			nowPage   : nowPage,
			pageSize  : pageSize,

            visible   : visible,
            mId       : mId,
            mLinkName : mLinkName,
            mLinkURL  : mLinkURL
		});

	}

	/******************************事件响应方法--开始***********************************/

	// 翻页按钮点击
	paginationClick(nowPage){
		this.settingState(nowPage, "no");
		// 根据当前分类加载第一页链接数据
		this.getLinkList(nowPage);
	}

    // 操作列点击
    operationClick(index, item){
        this.settingState("no", "no", true, item.Link_ID, item.Link_Name, item.Link_Url);
    }

    // 弹出框确认点击
    handleOk(index, item){
        // 更新外链信息
        this.updateLink();
    }

    // 弹出框取消点击
    handleCancel(index, item){
        this.settingState("no", "no", false, "", "", "");
    }

    mNameChange(e) {
        const linkName = e.target.value;
        this.settingState("no", "no", "no", "no", linkName, "no");
    }

    mURLChange(e) {
        const linkURL = e.target.value;
        this.settingState("no", "no", "no", "no", "no", linkURL);
    }


	/******************************事件响应方法--结束***********************************/

	// 获取链接列表
	getLinkCount() {
		const self = this;
		jQuery.ajax({
			type : "POST",
			url : "/doit/linkAction/getLinkCount",
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

					// 根据当前分类加载第一页链接数据
					self.getLinkList(1);
				}
			},error :function(){
				message.error("请求链接个数连接出错！");
			}
		});
	}

	// 根据当前分类加载第一页链接数据
	getLinkList(nowPage) {
		const self = this;
		jQuery.ajax({
			type : "POST",
			url : "/doit/linkAction/getLinkList",
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
				message.error("请求链接列表连接出错！");
			}
		});
	}

	// 组织表格数据
	dealTableData(cbData) {
		const totalWidth = document.getElementById("link_page").offsetWidth - 25;
		const idWidth        = totalWidth * 0.0749;
		const titleWidth     = totalWidth * 0.3537;
		const urlWidth       = totalWidth * 0.4705;
		const operationWidth = totalWidth * 0.0656;

		const self = this;
		let tableColumns = [
			{ title: 'ID', width: idWidth, dataIndex: 'Link_ID', key: 'Link_ID' },
			{ title: '名称', width: titleWidth, dataIndex: 'Link_Name', key: 'Link_Name' },
			{ title: 'URL', width: urlWidth, dataIndex: 'Link_Url', key: 'Link_Url' },
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
			item.key = item.Link_ID;
			tableData.push(item);
		}

		const expandedRowRender = record => <p>{record.Link_Name}</p>;
		const scroll = { y: 380, x: totalWidth };

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

    // 更新外链信息
    updateLink() {
        const self = this;
        jQuery.ajax({
            type : "POST",
            url : "/doit/linkAction/updateLink",
            data : {
                "id" : this.state.mId,
                "name" : encodeURI(encodeURI(this.state.mLinkName)),
                "url" : encodeURI(encodeURI(this.state.mLinkURL))
            },
            dataType:"json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success : function(cbData) {
                self.settingState("no", "no", false, "", "", "", "");
                if(cbData.success === "1") {
                    // 重新获取当前页数据
                    self.getLinkList(self.state.nowPage);
                    message.success(cbData.msg+"！", 3);
                } else {
                    message.error(cbData.msg+"！", 3);
                }
            },error :function(){
                message.error("更新外链信息连接出错！");
            }
        });

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
							<div id="link_page" className="page edit-link-page">
								{this.state.tableDOM}
								{this.state.paginationDOM}
							</div>

                            <Modal title="修改外链详细信息"
                                   visible={this.state.visible}
                                   onOk={this.handleOk}
                                   onCancel={this.handleCancel}>
                                <Form horizontal>
                                    <FormItem
                                        label="外链名称">
                                        <Input value={this.state.mLinkName} onChange={this.mNameChange} placeholder="" size="large"/>
                                    </FormItem>
                                    <FormItem
                                        label="外链URL">
                                        <Input value={this.state.mLinkURL} onChange={this.mURLChange} placeholder="" size="large"/>
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





