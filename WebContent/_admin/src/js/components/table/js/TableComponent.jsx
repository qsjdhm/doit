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

    onSelectChange(value) {
        this.setState({
            selectedRowKeys : value
        });
        this.props.checkboxSelected(value);
    }

    render() {

        let rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
        };

        if(!this.state.selectedRowKeys) {
            rowSelection = false;
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
