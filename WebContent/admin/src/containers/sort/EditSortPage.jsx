/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
	selectedSortIdChange,
	selectedPageChange,
	getSort,
	modelVisibleChange,
    modelSaveSortIdChange,
	modelSaveNameChange,
	updateSort
} from '../../actions/sort/editSort';

import { Modal, Form, Input, Icon, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';

import '../../css/sort.less';

export default class EditSortPage extends React.Component {
	constructor (props) {
		super(props);
	}

    componentWillMount () {
        this.props.dispatch(selectedSortIdChange('3'));
    }


    // 渲染父分类下拉框
    renderFSortSelect () {
        const fSortList = [
            {
                "id" : 3,
                "name" : "图书分类"
            },
            {
                "id" : 8,
                "name" : "笔记分类"
            },
            {
                "id" : 4,
                "name" : "标签分类"
            }
        ];
        return <SelectComponent
            defaultValue={fSortList[0].id}
            data={fSortList}
            selected={this.sortChangeHandler.bind(this)}/>
    }

	sortChangeHandler (sortId) {
		this.props.dispatch(selectedSortIdChange(sortId));
	}

	// 渲染分页条
	renderPaginationList() {
		if(this.props.sortCount.length !== 0) {
			return <PaginationComponent
				count={this.props.sortCount}
				pageSize={10}
				pageed={this.paginationClickHandler.bind(this)}/>
		}
	}

	paginationClickHandler(pageId) {
		this.props.dispatch(selectedPageChange(pageId));
	}

    // 渲染数据表格
	renderTableList() {
		if (this.props.sortList.length !== 0){
            const totalWidth = document.getElementById("page").offsetWidth - 25;
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
					return <a href='javascript:void(0)' onClick={self.operationClick.bind(self, index, item)}>修改</a>
				}
			});

			// 表格的配置
			const expandedRowRender = record => <p>{record.Sort_Name}</p>;
			const scroll = { y: 350, x: totalWidth };

			return <TableComponent
				tableColumns={tableColumns}
				tableData={this.props.sortList}
				expandedRowRender={expandedRowRender}
				selectedRowKeys={false}
				rowSelection={null}
				checkboxSelected={false}
				scroll={scroll}/>
		}
	}

	operationClick (index, item) {
		this.props.dispatch(getSort(item.Sort_ID));
	}

    handleOk () {
		this.props.dispatch(updateSort());
    }

    handleCancel () {
		this.props.dispatch(modelVisibleChange(false));
    }

    // 渲染弹出层的分类
    renderModelSortList () {
		if(this.props.modelDefaultSortId !== '') {
            console.info(this.props.modelDefaultSortId);
            const fSortList = [
                {
                    "id" : 3,
                    "name" : "图书分类"
                },
                {
                    "id" : 8,
                    "name" : "笔记分类"
                },
                {
                    "id" : 4,
                    "name" : "标签分类"
                }
            ];
			return <SelectComponent
				defaultValue={this.props.modelDefaultSortId}
				data={fSortList}
				selected={this.modelSortChangeHandler.bind(this)}/>
		}
    }

    modelSortChangeHandler (sortId) {
		this.props.dispatch(modelSaveSortIdChange(sortId));
    }

    modelNameChangeHandler (e) {
        this.props.dispatch(modelSaveNameChange(e.target.value));
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
                        <div id="page" className="page edit-sort-page">
                            { this.renderFSortSelect() }
							{ this.renderTableList() }
							{ this.renderPaginationList() }
                        </div>
						<Modal title="修改分类详细信息"
							   visible={this.props.modelVisible}
							   onOk={this.handleOk.bind(this)}
							   onCancel={this.handleCancel.bind(this)}>
							<Form horizontal>
								<FormItem
									label="所属父类">
									{ this.renderModelSortList() }
								</FormItem>
								<FormItem
									label="分类名称">
									<Input value={this.props.modelSaveName} onChange={this.modelNameChangeHandler.bind(this)} placeholder="" size="large"/>
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
	return Object.assign({}, state.editSort);
}

export default connect( mapStateToProps )( EditSortPage );



