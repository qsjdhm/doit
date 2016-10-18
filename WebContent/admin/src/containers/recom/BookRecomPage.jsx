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
    getBook,
    modelVisibleChange,
    modelSaveRecomChange,
    modelSaveReadChange,
    updateBook
} from '../../actions/recom/bookRecom';


import { Modal, Form, Input, Popconfirm, Button, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';

import '../../css/book.less';

export class BookRecomPage extends React.Component {
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
        if(this.props.bookCount.length !== 0) {
            return <PaginationComponent
                count={this.props.bookCount}
                pageSize={10}
                pageed={this.paginationClickHandler.bind(this)}/>
        }
    }

    paginationClickHandler(pageId) {
        this.props.dispatch(selectedPageChange(pageId));
    }

    // 渲染数据表格
    renderTableList() {
        if (this.props.bookList.length !== 0){
            const totalWidth = document.getElementById("page").offsetWidth - 25;
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
                { title: '下载量', width: readWidth, dataIndex: 'Download_Num', key: 'Download_Num' },
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
            const expandedRowRender = record => <p>{record.Book_Name}</p>;
            const scroll = { y: 350, x: totalWidth };

            return <TableComponent
                tableColumns={tableColumns}
                tableData={this.props.bookList}
                expandedRowRender={expandedRowRender}
                selectedRowKeys={false}
                rowSelection={null}
                checkboxSelected={false}
                scroll={scroll}/>
        }
    }

    operationClick (index, item) {
        this.props.dispatch(getBook(item.Book_ID));
    }

    handleOk () {
        this.props.dispatch(updateBook());
    }

    handleCancel () {
        this.props.dispatch(modelVisibleChange(false));
    }

    modelRecomChangeHandler (e) {
        this.props.dispatch(modelSaveRecomChange(e.target.value));
    }

    modelReadChangeHandler (e) {
        this.props.dispatch(modelSaveReadChange(e.target.value));
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
                        <div id="page" className="page edit-book-page">
                            { this.renderSortSelect() }
                            { this.renderTableList() }
                            { this.renderPaginationList() }
                        </div>

                        <Modal title="修改笔记推荐信息"
                               width="840"
                               style={{ top: 20 }}
                               visible={this.props.modelVisible}
                               onOk={this.handleOk.bind(this)}
                               onCancel={this.handleCancel.bind(this)}>

                            <Form horizontal>
                                <FormItem
                                    label="图书推荐量">
                                    <Input style={{width:400}} value={this.props.modelSaveRecom} onChange={this.modelRecomChangeHandler.bind(this)} placeholder="" size="large"/>
                                </FormItem>
                                <FormItem
                                    label="图书下载量">
                                    <Input style={{width:400}} value={this.props.modelSaveRead} onChange={this.modelReadChangeHandler.bind(this)} placeholder="" size="large"/>
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
    return Object.assign({}, state.bookRecom);
}

export default connect( mapStateToProps )( BookRecomPage );



