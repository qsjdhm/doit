/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    getCommentCount,
	selectedPageChange,
    getComment,
	modelVisibleChange,
    modelSaveUserChange,
    modelSaveContentChange,
	updateComment
} from '../../actions/comment/editComment';

import { Modal, Form, Input, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';

import '../../css/comment.less';

export class EditCommentPage extends React.Component {
	constructor (props) {
		super(props);
	}

    componentWillMount () {
        // 获取评论的分类列表
        this.props.dispatch( getCommentCount() );
    }

    // 渲染分页条
    renderPaginationList() {
        if(this.props.commentCount.length !== 0) {
            return <PaginationComponent
                count={this.props.commentCount}
                pageSize={10}
                pageed={this.paginationClickHandler.bind(this)}/>
        }
    }

    paginationClickHandler(pageId) {
        this.props.dispatch( selectedPageChange(pageId) );
    }

    // 渲染数据表格
	renderTableList() {
        if (this.props.commentList.length !== 0){
			const totalWidth     = document.getElementById("page").offsetWidth - 45;
			const totalHeight    = document.getElementById("container").offsetHeight - 140;
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
					return <a href='javascript:void(0)' onClick={self.operationClick.bind(self, index, item)}>修改</a>
				}
			});

			// 表格的配置
			const expandedRowRender = record => <p>{record.Comment_Content}</p>;
			const scroll = { y: totalHeight, x: totalWidth };

			return <TableComponent
				tableColumns={tableColumns}
				tableData={this.props.commentList}
				expandedRowRender={expandedRowRender}
				selectedRowKeys={false}
				rowSelection={null}
				checkboxSelected={false}
				scroll={scroll}/>
		}
	}

	operationClick (index, item) {
		this.props.dispatch( getComment(item.Comment_ID) );
	}

    handleOk () {
		this.props.dispatch( updateComment() );
    }

    handleCancel () {
		this.props.dispatch( modelVisibleChange(false) );
    }

    modelUserChangeHandler (e) {
        this.props.dispatch( modelSaveUserChange(e.target.value) );
    }

	modelContentChangeHandler (e) {
		this.props.dispatch( modelSaveContentChange(e.target.value) );
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
					<div id="container" className="ant-layout-container">
						<div className="ant-layout-content">
							<BreadcrumbComponent
								data={this.props.routes}
							/>
						</div>
                        <div id="page" className="page edit-comment-page">
							{ this.renderTableList() }
							{ this.renderPaginationList() }
                        </div>
						<Modal title="修改评论详细信息"
							   visible={this.props.modelVisible}
							   onOk={this.handleOk.bind(this)}
							   onCancel={this.handleCancel.bind(this)}>
							<Form horizontal>
								<FormItem
									label="评论用户">
									<Input value={this.props.modelSaveUser} onChange={this.modelUserChangeHandler.bind(this)} placeholder="" size="large"/>
								</FormItem>
								<FormItem
									label="评论内容">
									<Input value={this.props.modelSaveContent} onChange={this.modelContentChangeHandler.bind(this)} type="textarea" rows="3" placeholder="" size="large"/>
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
	return Object.assign({}, state.editComment);
}

export default connect( mapStateToProps )( EditCommentPage );



