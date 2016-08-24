/**
 * Created by zhangyan on 2016/1/12.
 */

import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import '../css/table.less';


export default class TableComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: this.props.tableColumns,
			dataSource: this.props.tableData,
			selectedRowKeys : this.props.selectedRowKeys
		};
		// 遇到方法中使用this的都需要在这里绑定
		this.onSelectChange = this.onSelectChange.bind(this);
	}


	// 这个经常用于重新载入组件之后想重置一些数据时触发
	componentWillReceiveProps (nextProps) {
		if(this.state.selectedRowKeys) {
			this.setState({
				selectedRowKeys: nextProps.selectedRowKeys
			});
		} else {
			this.setState({
				selectedRowKeys: false
			});
		}

	}


	// checkbox选中事件
	onSelectChange(value) {
		this.setState({
			selectedRowKeys : value
		});
		// 把当前选中的值返给父组件
		this.props.checkboxSelected(value);
	}

	render() {

		// 设置默认值
		let rowSelection = {
			selectedRowKeys: this.state.selectedRowKeys,
			onChange: this.onSelectChange,
		};

		// 如果selectedRowKeys是false就不显示多选框
		if(!this.state.selectedRowKeys) {
			rowSelection = null;
		}

		return (
			<div className="table-package">
				<Table
					size="middle"
					columns={this.props.tableColumns}
					dataSource={this.props.tableData}
					expandedRowRender={this.props.expandedRowRender}
					rowSelection={rowSelection}
					scroll={this.props.scroll}
					pagination={false}
					className="table"
				/>
			</div>
		);
	}
};
