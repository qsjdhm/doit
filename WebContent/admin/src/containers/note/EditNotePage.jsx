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
	getNote,
	modelVisibleChange,
    modelSaveSortIdChange,
	modelSaveSortNameChange,
    modelSaveTitleChange,
    modelSaveContentChange,
    modelSaveTagChange,
	updateNote
} from '../../actions/note/editNote';


import { Modal, Input, Popconfirm, Button, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';
import UeditorComponent    from '../../components/ueditor/js/UeditorComponent';
import TagComponent        from '../../components/tag/js/TagComponent';

import '../../css/note.less';

export class EditNotePage extends React.Component {
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
			const totalWidth     = document.getElementById("page").offsetWidth - 45;
			const totalHeight    = document.getElementById("container").offsetHeight - 170;
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
					return <a href='javascript:void(0)' onClick={self.operationClick.bind(self, index, item)}>修改</a>
				}
			});

			// 表格的配置
			const expandedRowRender = record => <p>{record.Article_Content}</p>;
			const scroll = { y: totalHeight, x: totalWidth };

			return <TableComponent
				tableColumns={tableColumns}
				tableData={this.props.noteList}
				expandedRowRender={expandedRowRender}
				selectedRowKeys={false}
				rowSelection={null}
				checkboxSelected={false}
				scroll={scroll}/>
		}
	}

	operationClick (index, item) {
		this.props.dispatch(getNote(item.Article_ID));
	}

	handleOk () {
        // 富文本特殊不能实时变化数据，所以就在这里设置一次
        const content = UE.getEditor("mContent").getContent();
        this.props.dispatch(modelSaveContentChange(content));
		this.props.dispatch(updateNote());
	}

	handleCancel () {
		this.props.dispatch(modelVisibleChange(false));
	}

    // 渲染弹出层的分类
	renderModelSortList () {
		if(this.props.sortList.length !== 0 && this.props.modelDefaultSortId !== '') {
			return <SelectComponent
				defaultValue={this.props.modelDefaultSortId}
				data={this.props.sortList}
				selected={this.modelSortChangeHandler.bind(this)}/>
		}
	}

	modelSortChangeHandler (sortId) {
		let nowSort = {
			sortId   : sortId,
			sortName : ""
		};
		console.info(sortId);
		const sorts = this.props.sortList;
		for(let sort of sorts){
			if(sort.id === sortId) {
				nowSort.sortName = sort.name;
				break;
			}
		}

		this.props.dispatch(modelSaveSortIdChange(nowSort.sortId));
		this.props.dispatch(modelSaveSortNameChange(nowSort.sortName));
	}

    modelTitleChangeHandler (e) {
        this.props.dispatch(modelSaveTitleChange(e.target.value));
    }

    // 渲染弹出层的富文本
    renderModelUeditor () {
        if(this.props.modelSaveContent !== '') {
            return <UeditorComponent
                value={this.props.modelSaveContent}
                id='mContent'
                width='805'
                height='280'
            />
        }
    }

    // 渲染弹出层的标签
    renderModelTag () {
        if(this.props.tagList.length !== 0 && this.props.modelDefaultTag !== '') {
            return  <TagComponent
                width={806}
                data={this.props.tagList}
                defaultValue={this.props.modelDefaultTag}
                selected={this.modelTagChangeHandler.bind(this)}
            />
        }
    }

    modelTagChangeHandler (tag) {
        this.props.dispatch(modelSaveTagChange(tag.join(",")));
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
					<div id="container" className="ant-layout-container">
						<div className="ant-layout-content">
							<BreadcrumbComponent
								data={this.props.routes}
							/>
						</div>
                        <div id="page" className="page edit-note-page">
                            { this.renderSortSelect() }
							{ this.renderTableList() }
							{ this.renderPaginationList() }
                        </div>

						<Modal title="修改笔记详细信息"
							   width="840"
							   style={{ top: 20 }}
							   visible={this.props.modelVisible}
							   onOk={this.handleOk.bind(this)}
							   onCancel={this.handleCancel.bind(this)}>

							{ this.renderModelSortList() }
                            <Input value={this.props.modelSaveTitle} onChange={this.modelTitleChangeHandler.bind(this)}  style={{ width: 430 }} size="large" placeholder=""/>
                            { this.renderModelUeditor() }
                            { this.renderModelTag() }
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
	return Object.assign({}, state.editNote);
}

export default connect( mapStateToProps )( EditNotePage );



