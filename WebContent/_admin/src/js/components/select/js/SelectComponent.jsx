/**
 * Created by zhangyan on 2016/1/12.
 */

import React from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import '../css/select.less';

export default class SelectComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultValue : props.defaultValue,
            dom:null
        };

        // 遇到方法中使用this的都需要在这里绑定
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            defaultValue : nextProps.defaultValue
        });
        console.info("aaaaaaaaaaaaaaaa");
        console.info(nextProps.defaultValue);
        console.info(this.state.defaultValue);
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
            <div className="select-package">
                <Select
                    size="large"
	                defaultValue={this.state.defaultValue}
                    style={{ width: 200 }}
                    placeholder="请选择选项"
                    optionFilterProp="children"
                    notFoundContent="无法找到"
                    onChange={this.handleChange}>
                    {optionItems}
                </Select>
            </div>
        );
    }
};
