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
            dataSource: this.props.tableData
        };
        // 遇到方法中使用this的都需要在这里绑定
        //this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.props.selected(value);
    }

    render() {
        return (
            <div className="table-package">
                <Table
	                size="middle"
	                columns={this.props.tableColumns}
	                dataSource={this.props.tableData}
	                expandedRowRender={record => <p>{record.description}</p>}
	                scroll={{ y: 300, x: 1098 }}
	                pagination={false}
	                className="table"
                />
            </div>
        );
    }
};
