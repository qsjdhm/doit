/**
 * Created by zhangyan on 2016/1/12.
 */

import React from 'react';
import { Pagination, Select } from 'antd';
import 'antd/dist/antd.css';
import '../css/pagination.less';


export default class PaginationComponent extends React.Component {
    constructor(props) {
        super(props);
	    this.handleChange = this.handleChange.bind(this);
    }

	handleChange(value) {
		this.props.pageed(value);
	}

    render() {
        return (
            <div className="pagination-package">
	            <Pagination
		            selectComponentClass={Select}
		            total={this.props.count}
		            showTotal={total => `共 ${total} 条`}
		            pageSize={this.props.pageSize}
		            defaultCurrent={1}
		            onChange={this.handleChange}
	            />
            </div>
        );

    }
};
