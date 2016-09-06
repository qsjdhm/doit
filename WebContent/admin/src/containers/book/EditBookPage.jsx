/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    getSortList,
	selectedSortIdChange,
	selectedPageChange,
	getBook,
	modelVisibleChange,
    modelSaveCoverChange,
    modelSaveSortIdChange,
	modelSaveSortNameChange,
    modelSaveTitleChange,
    modelSaveHeightChange,
    modelSavePathChange,
	updateBook
} from '../../actions/book/editBook';

import { Modal, Form, Upload, Button, Input, Icon, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';
import TableComponent      from '../../components/table/js/TableComponent';
import PaginationComponent from '../../components/pagination/js/PaginationComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';

import '../../css/book.less';

export default class EditBookPage extends React.Component {
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
		this.props.dispatch(selectedSortIdChange(sortId));
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
            const self = this;
            const totalWidth = document.getElementById("page").offsetWidth - 25;
            const idWidth        = totalWidth * 0.0749;
            const titleWidth     = totalWidth * 0.3465;
            const sortWidth      = totalWidth * 0.1737;
            const recomWidth     = totalWidth * 0.1520;
            const readWidth      = totalWidth * 0.1520;
            const operationWidth = totalWidth * 0.0656;

            let tableColumns = [
                { title: 'ID', width: idWidth, dataIndex: 'Book_ID', key: 'Book_ID' },
                { title: '名称', width: titleWidth, dataIndex: 'Book_Name', key: 'Book_Name' },
                { title: '分类', width: sortWidth, dataIndex: 'Sort_Name', key: 'Sort_Name' },
                { title: '推荐量', width: recomWidth, dataIndex: 'Recommend_Num', key: 'Recommend_Num' },
                { title: '点击量', width: readWidth, dataIndex: 'Download_Num', key: 'Download_Num' },
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

	// 上传成功的回调方法
	uploaderSuccessHandler (info) {
		message.success(`${info.file.name} 上传成功。`);
		this.props.dispatch(modelSaveCoverChange(info.file.response));
	}

	// 上传失败的回调方法
	uploaderErrorHandler (info) {
		message.error(`${info.file.name} 上传失败。`);
	}

    modelTitleChangeHandler (e) {
        this.props.dispatch(modelSaveTitleChange(e.target.value));
    }

	modelHeightChangeHandler (e) {
		this.props.dispatch(modelSaveHeightChange(e.target.value));
	}

	modelPathChangeHandler (e) {
		this.props.dispatch(modelSavePathChange(e.target.value));
	}


	render() {
		const self = this;
		const FormItem = Form.Item;
		const updateProps = {                // 图书路径
			name: 'file',
			action: ENV.baseUrl + "/UniversalUploadAction",
			headers: {
				authorization: 'authorization-text',
			},
			onChange(info) {
				if (info.file.status !== 'uploading') {
					console.log(info.file, info.fileList);
				}
				if (info.file.status === 'done') {
					self.uploaderSuccessHandler(info);
				} else if (info.file.status === 'error') {
					self.uploaderErrorHandler(info);
				}
			}
		};

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
						<Modal title="修改图书详细信息"
							   visible={this.props.modelVisible}
							   onOk={this.handleOk.bind(this)}
							   onCancel={this.handleCancel.bind(this)}>
							<Form horizontal>
								<FormItem
									label="图书封面">
									<Upload {...updateProps}>
										<Button className="uploader-btn" type="ghost">
											<Icon type="upload" /> 点击上传
										</Button>
									</Upload>
								</FormItem>
								<FormItem
									label="图书分类">
									{ this.renderModelSortList() }
								</FormItem>
								<FormItem
									label="图书名称">
									<Input value={this.props.modelSaveTitle} onChange={this.modelTitleChangeHandler.bind(this)} placeholder="" size="large"/>
								</FormItem>
								<FormItem
									label="图书高度">
									<Input value={this.props.modelSaveHeight} onChange={this.modelHeightChangeHandler.bind(this)} placeholder="" size="large"/>
								</FormItem>
								<FormItem
									label="下载路径">
									<Input value={this.props.modelSavePath} onChange={this.modelPathChangeHandler.bind(this)} type="textarea" rows="3" placeholder="" size="large"/>
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
	return Object.assign({}, state.editBook);
}

export default connect( mapStateToProps )( EditBookPage );



