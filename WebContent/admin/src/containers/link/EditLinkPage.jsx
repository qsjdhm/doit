/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    getLinkCount,
	selectedPageChange,
    getLink,
	modelVisibleChange,
    modelSaveNameChange,
    modelSaveUrlChange,
	updateLink
} from '../../actions/link/editLink';

import { Modal, Form, Input, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';

import '../../css/link.less';

export class EditLinkPage extends React.Component {
	constructor (props) {
		super(props);
	}

    componentWillMount () {
        // 获取评论的分类列表
        this.props.dispatch( getLinkCount() );
    }

    // 渲染分页条
    renderPaginationList() {
        if(this.props.linkCount.length !== 0) {
            return <PaginationComponent
                count={this.props.linkCount}
                pageSize={10}
                pageed={this.paginationClickHandler.bind(this)}/>
        }
    }

    paginationClickHandler(pageId) {
        this.props.dispatch( selectedPageChange(pageId) );
    }

    // 渲染数据表格
	renderTableList() {
        if (this.props.linkList.length !== 0){
            const totalWidth = document.getElementById("page").offsetWidth - 25;
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
					return <a href='javascript:void(0)' onClick={self.operationClick.bind(self, index, item)}>修改</a>
				}
			});

			// 表格的配置
			const expandedRowRender = record => <p>{record.Link_Url}</p>;
			const scroll = { y: 350, x: totalWidth };

			return <TableComponent
				tableColumns={tableColumns}
				tableData={this.props.linkList}
				expandedRowRender={expandedRowRender}
				selectedRowKeys={false}
				rowSelection={null}
				checkboxSelected={false}
				scroll={scroll}/>
		}
	}

	operationClick (index, item) {
		this.props.dispatch( getLink(item.Link_ID) );
	}

    handleOk () {
		this.props.dispatch( updateLink() );
    }

    handleCancel () {
		this.props.dispatch( modelVisibleChange(false) );
    }

    modelNameChangeHandler (e) {
        this.props.dispatch( modelSaveNameChange(e.target.value) );
    }

	modelUrlChangeHandler (e) {
		this.props.dispatch( modelSaveUrlChange(e.target.value) );
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
						</div>
                        <div id="page" className="page edit-link-page">
							{ this.renderTableList() }
							{ this.renderPaginationList() }
                        </div>
						<Modal title="修改外链详细信息"
							   visible={this.props.modelVisible}
							   onOk={this.handleOk.bind(this)}
							   onCancel={this.handleCancel.bind(this)}>
							<Form horizontal>
								<FormItem
									label="外链名称">
									<Input value={this.props.modelSaveName} onChange={this.modelNameChangeHandler.bind(this)} placeholder="" size="large"/>
								</FormItem>
								<FormItem
									label="外链链接">
									<Input value={this.props.modelSaveUrl} onChange={this.modelUrlChangeHandler.bind(this)} type="textarea" rows="3" placeholder="" size="large"/>
								</FormItem>
							</Form>
						</Modal>
					</div>
					<div className="ant-layout-footer">
						52DOIT 版权所有 © 2016 由不拽注定被甩~技术支持
					</div>
				</div>
			</div>
		);
	}
};




function mapStateToProps ( state ) {
	return Object.assign({}, state.editLink);
}

export default connect( mapStateToProps )( EditLinkPage );



