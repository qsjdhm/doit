/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    getCommentCount,
    selectedPageChange,
	hasSelectedChange,
	selectedRowKeysChange,
    delCommentList,
	loadingChange
} from '../../actions/comment/delComment';

import { Popconfirm, Button, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';

import '../../css/comment.less';

export class DelCommentPage extends React.Component {
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
        this.props.dispatch(selectedPageChange(pageId));
    }

    // 渲染数据表格
    renderTableList() {
        if (this.props.commentList.length !== 0){
            const totalWidth = document.getElementById("page").offsetWidth - 25;
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
                            onConfirm={self.operationClickHandler.bind(self, index, item)}>

                            <a href='javascript:void(0)'>删除</a>
                        </Popconfirm>
                    );
                }
            });


            // 表格的配置
            const scroll = { y: 350, x: totalWidth };

            return <TableComponent
                tableColumns={tableColumns}
                tableData={this.props.commentList}
                selectedRowKeys={this.props.selectedRowKeys}
                checkboxSelected={this.checkboxSelectedHandler.bind(this)}
				expandedRowRender={false}
                scroll={scroll}/>

        }
    }

    operationClickHandler (index, item) {
        // 删除评论
        this.props.dispatch(delCommentList(item.Comment_ID.toString()));
    }

    // 选中评论
    checkboxSelectedHandler (selectedRowKeys) {
        const hasSelected = selectedRowKeys.length > 0;
		this.props.dispatch(hasSelectedChange(hasSelected));
		this.props.dispatch(selectedRowKeysChange(selectedRowKeys));
    }

	// 删除
	deleteClickHandler () {
		this.props.dispatch(loadingChange(true));
		const selectStr = this.props.selectedRowKeys.join(";");
		// 删除文章
		this.props.dispatch(delCommentList(selectStr));
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
                        </div>
                        <div id="page" className="page del-comment-page">
							<div className="del-button">
								<span>{this.props.hasSelected ? `选择了 ${this.props.selectedRowKeys.length} 篇评论` : ''}</span>
								<Popconfirm title="确定要删除选中的评论吗？" placement="topRight" onConfirm={this.deleteClickHandler.bind(this)}>
									<Button type="primary"
											disabled={!this.props.hasSelected}
											loading={this.props.loading}
											icon="delete"
											size="large">
										删除评论
									</Button>
								</Popconfirm>
							</div>
                            { this.renderTableList() }
                            { this.renderPaginationList() }
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




function mapStateToProps ( state ) {
    return Object.assign({}, state.delComment);
}

export default connect( mapStateToProps )( DelCommentPage );



