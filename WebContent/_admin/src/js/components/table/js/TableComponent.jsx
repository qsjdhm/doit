/**
 * Created by zhangyan on 2016/1/12.
 */

import React from 'react';
import { Table  } from 'antd';
import 'antd/dist/antd.css';


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
            <div style={{width: 500, margin: '100px auto'}}>
                <Table columns={this.props.tableColumns} dataSource={this.props.tableData} />
            </div>
        );
    }
};
