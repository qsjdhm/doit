/**
 * Created by zhangyan on 2016/1/12.
 */

import React from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import '../css/tag.less';

export default class TagComponent extends React.Component {
    constructor(props) {
        super(props);

        // 遇到方法中使用this的都需要在这里绑定
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.props.selected(value);
    }

    render() {
        const optionItems = this.props.data.map(function(item){
            return (
                <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
            );
        });

        return (
            <div className="tag-package">
                <Select
                    tags
                    size="large"
                    style={{ width: 820 }}
                    placeholder="请输入或选择标签"
                    optionFilterProp="children"
                    notFoundContent="无法找到"
                    onChange={this.handleChange}>
                    {optionItems}
                </Select>
            </div>
        );
    }
};
