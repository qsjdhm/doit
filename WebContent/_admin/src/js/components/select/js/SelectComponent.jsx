/**
 * Created by zhangyan on 2016/1/12.
 */

import React from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';


export default class SelectComponent extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {
	     //   defaultValue : this.props.defaultValue
        //};
	    this.state = {
		    data : this.props.data,
		    value: "",
		    focus: false
	    };
        // 遇到方法中使用this的都需要在这里绑定
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.props.selected(value);
    }

    render() {
        const optionItems = this.props.data.map(function(item){
            return (
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
            );
        });

        return (
            <div style={{width: 300}}>
                <Select
	                defaultValue={this.props.defaultValue}
                    style={{ width: 200 }}
                    placeholder="请选择分类"
                    optionFilterProp="children"
                    notFoundContent="无法找到"
                    onChange={this.handleChange}>
                    {optionItems}
                </Select>
            </div>
        );
    }
};
