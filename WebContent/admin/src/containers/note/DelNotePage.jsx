/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { setModelSort, getNote, modelSortChange, modelTitleChange, modelChange, byTypeGetSort, sortSelectChange, getNoteCount, getNoteList, pageSelectChange } from '../../actions/note';

import { Modal, Input, Popconfirm, Button, message, Row, Col } from 'antd';

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
	constructor(props) {
		super(props);
	}

    componentWillMount() {
        // 获取笔记的分类列表
        this.props.dispatch(byTypeGetSort());
    }

	renderSortList(){
		if(this.props.sortArray.length !== 0) {
			let sortList = [];
			this.props.sortArray.map((item, i) =>{
				const sortObj = {
					"id" : item.Sort_ID,
					"name" : item.Sort_Name
				};
				sortList.push(sortObj);
			})

			return <SelectComponent
				defaultValue={sortList[0].id}
				data={sortList}
				selected={this.sortSelectedHandler.bind(this)}/>
		}
	}

	sortSelectedHandler(sortId) {
		this.props.dispatch(sortSelectChange(sortId));
	}

	renderPageList() {
		if(this.props.noteCount.length !== 0) {
			return <PaginationComponent
					count={this.props.noteCount}
					pageSize={10}
					pageed={this.paginationClick.bind(this)}/>
		}
	}

	paginationClick(pageId) {
		this.props.dispatch(pageSelectChange(pageId));
	}

	renderTableList() {
		if (this.props.noteList.length>0){
			const totalWidth = document.getElementById("page").offsetWidth - 25;
			const idWidth        = totalWidth * 0.0749;
			const titleWidth     = totalWidth * 0.3465;
			const sortWidth      = totalWidth * 0.1737;
			const recomWidth     = totalWidth * 0.0637;
			const readWidth      = totalWidth * 0.0637;
			const dateWidth      = totalWidth * 0.1766;
			const operationWidth = totalWidth * 0.0656;

			const self = this;
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

			let tableData = [];
			for(let item of this.props.noteList){
				item.key = item.Article_ID;
				tableData.push(item);
			}

			// 表格的配置
			const expandedRowRender = record => <p>{record.Article_Content}</p>;
			const scroll = { y: 350, x: totalWidth };

			return <TableComponent
					tableColumns={tableColumns}
					tableData={tableData}
					expandedRowRender={expandedRowRender}
					selectedRowKeys={false}
					rowSelection={null}
					checkboxSelected={false}
					scroll={scroll}/>
		}

	}

	operationClick (index, item) {
		console.info(item);
		this.props.dispatch(getNote(item.Article_ID));
		this.props.dispatch(modelChange(true));
	}

	handleOk(){
		this.props.dispatch(modelChange(false));
	}

	handleCancel(){
		this.props.dispatch(modelChange(false));
	}

	// 标题改变
	mTitleChange(e) {
		this.props.dispatch(modelTitleChange(e.target.value));
	}

	mSortSelected(sortId) {
		console.info('model');
		console.info(sortId);
		this.props.dispatch(setModelSort(sortId));
	}

	renderModelSortList () {

		if(this.props.sortArray.length !== 0 && this.props.selectedNoteSort != undefined) {
			let sortList = [];
			this.props.sortArray.map((item, i) =>{
				const sortObj = {
					"id" : item.Sort_ID,
					"name" : item.Sort_Name
				};
				sortList.push(sortObj);
			})
			return <SelectComponent
				defaultValue={this.props.selectedNoteSort}
				data={sortList}
				selected={this.mSortSelected.bind(this)}
				/>
		}


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
							<div id="page" className="page edit-note-page">
								{this.renderSortList()}
								<br/>
								{this.renderTableList()}
								{this.renderPageList()}
							</div>
						</div>

						<Modal title="修改笔记详细信息"
							   width="840"
							   style={{ top: 20 }}
							   visible={this.props.visible}
							   onOk={this.handleOk.bind(this)}
							   onCancel={this.handleCancel.bind(this)}>
							{this.renderModelSortList()}
							<Input value={this.props.modelNote.title}
								   onChange={this.mTitleChange.bind(this)}
								   style={{ width: 430 }}
								   size="large"
								   placeholder=""/>
							<span>{this.props.selectedNoteSort2}</span>
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
	return Object.assign({}, state.note);
}

export default connect( mapStateToProps )( DelNotePage );



