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

        this.state = {
            current : 1
        };

	    this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps () {
        this.setState({
            current: 1
        });
    }

	handleChange(page) {

        this.setState({
            current: page
        });

		this.props.pageed(page);
	}

    render() {
        return (
            <div className="pagination-package">
	            <Pagination
		            selectComponentClass={Select}
                    defaultCurrent={1}
                    current={this.state.current}
		            total={this.props.count}
		            showTotal={total => `共 ${total} 条`}
		            pageSize={this.props.pageSize}
		            onChange={this.handleChange}
	            />
            </div>
        );

    }
};
