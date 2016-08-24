/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    getSortList,
    selectedSortChange,
    selectedPageChange,
	hasSelectedChange,
	selectedRowKeysChange,
    delNoteList,
	loadingChange
} from '../../actions/note/delNote';

import { Popconfirm, Button, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';

import '../../css/note.less';

export default class DelNotePage extends React.Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {
        // 获取笔记的分类列表
        this.props.dispatch( getSortList() );
    }


    // 渲染笔记分类下拉框
    renderSortSelect () {
        if( this.props.sortList.length !== 0 ) {
            return <SelectComponent
                defaultValue={this.props.sortList[0].id}
                data={this.props.sortList}
                selected={this.sortChangeHandler.bind(this)}/>
        }
    }

    sortChangeHandler (sortId) {
        this.props.dispatch(selectedSortChange(sortId));
    }

    // 渲染分页条
    renderPaginationList() {
        if(this.props.noteCount.length !== 0) {
            return <PaginationComponent
                count={this.props.noteCount}
                pageSize={10}
                pageed={this.paginationClickHandler.bind(this)}/>
        }
    }

    paginationClickHandler(pageId) {
        this.props.dispatch(selectedPageChange(pageId));
    }

    // 渲染数据表格
    renderTableList() {
        if (this.props.noteList.length !== 0){
            const self = this;
            const totalWidth = document.getElementById("page").offsetWidth - 25;
            const idWidth        = totalWidth * 0.0749;
            const titleWidth     = totalWidth * 0.3465;
            const sortWidth      = totalWidth * 0.1737;
            const recomWidth     = totalWidth * 0.0637;
            const readWidth      = totalWidth * 0.0637;
            const dateWidth      = totalWidth * 0.1766;
            const operationWidth = totalWidth * 0.0656;

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
                    return (
                        <Popconfirm
                            title="确定要删除当前笔记吗？"
                            placement="topRight"
                            onConfirm={self.operationClick.bind(self, index, item)}>

                            <a href='javascript:void(0)'>删除</a>
                        </Popconfirm>
                    );
                }
            });


            // 表格的配置
            const scroll = { y: 350, x: totalWidth };

            return <TableComponent
                tableColumns={tableColumns}
                tableData={this.props.noteList}
                selectedRowKeys={this.props.selectedRowKeys}
                checkboxSelected={this.checkboxSelected.bind(this)}
				expandedRowRender={false}
                scroll={scroll}/>

        }
    }

    operationClick (index, item) {
        // 删除笔记
        this.props.dispatch(delNoteList(item.Article_ID.toString()));
    }

    // 选中笔记
    checkboxSelected (selectedRowKeys) {
		console.info(selectedRowKeys);
        const hasSelected = selectedRowKeys.length > 0;
		this.props.dispatch(hasSelectedChange(hasSelected));
		this.props.dispatch(selectedRowKeysChange(selectedRowKeys));
    }

	// 删除
	deleteClick () {
		this.props.dispatch(loadingChange(true));
		const selectStr = this.props.selectedRowKeys.join(";");
		// 删除文章
		this.props.dispatch(delNoteList(selectStr));
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
                        <div id="page" className="page del-note-page">
                            { this.renderSortSelect() }
							<div className="del-button">
								<span>{this.props.hasSelected ? `选择了 ${this.props.selectedRowKeys.length} 篇笔记` : ''}</span>
								<Popconfirm title="确定要删除选中的笔记吗？" placement="topRight" onConfirm={this.deleteClick.bind(this)}>
									<Button type="primary"
											disabled={!this.props.hasSelected}
											loading={this.props.loading}
											icon="delete"
											size="large">
										删除笔记
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
    return Object.assign({}, state.delNote);
}

export default connect( mapStateToProps )( DelNotePage );



