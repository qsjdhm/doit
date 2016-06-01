/**
 * Created by zhangyan on 2016/1/12.
 */

import React from 'react';
import { Input, Select, Button, Icon } from 'antd';
import classNames from 'classnames';
import 'antd/dist/antd.css';


export default class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            value: "",
            focus: false
        };
        // 遇到方法中使用this的都需要在这里绑定
        this.handleChange    = this.handleChange.bind(this);
        this.handleSelect    = this.handleSelect.bind(this);
    }

    handleChange(value) {
        this.props.selected(value);
    }

    handleSelect(value, option) {
        console.info(value);
    }

    render() {
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.value.trim()
        });
        const searchCls = classNames({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus
        });
        const optionItems = this.props.data.map((item, index) => {
            return (
                <Select.Option key={item.id}> {item.name} </Select.Option>
            );
        });
        return (
            <div className="ant-search-input-wrapper" style={this.props.style}>
                <Input.Group className={searchCls}>
                    <Select
                        size="large"
                        style={this.props.style}
                        showSearch
                        placeholder={this.props.placeholder}
                        optionFilterProp="children"
                        notFoundContent="无法找到"
                        onSelect={this.handleSelect}
                        onChange={this.handleChange}>
                        {optionItems}
                    </Select>
                    <div className="ant-input-group-wrap">
                        <Button size="large" className={btnCls} onClick={this.handleSubmit}>
                            <Icon type="search" />
                        </Button>
                    </div>
                </Input.Group>
            </div>
        );
    }
};
