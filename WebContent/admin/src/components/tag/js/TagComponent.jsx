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

        this.state = {
            dom: false
        };

        // 遇到方法中使用this的都需要在这里绑定
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.props.selected(value);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.defaultValue !== this.props.defaultValue) {
            this.setState({
                dom: false
            });

            let {data, defaultValue} = this.props;
            const optionItems = data.map(function(item){
                return (
                    <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
                );
            });

            const self = this;
            setTimeout(function(){
                self.setState({
                    dom: <Select
                        tags
                        size="large"
                        defaultValue={self.props.defaultValue}
                        style={{ width: self.props.width - 23 }}
                        placeholder="请选择选项"
                        optionFilterProp="children"
                        notFoundContent="无法找到"
                        onChange={self.handleChange}>
                        {optionItems}
                    </Select>
                });
            },0)
        }
    }

    componentWillMount () {
        let {data, defaultValue} = this.props;
        const optionItems = data.map(function(item){
            return (
                <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
            );
        });


        this.setState({
            dom: <Select
                tags
                size="large"
                defaultValue={defaultValue}
                style={{ width: this.props.width - 23 }}
                placeholder="请选择选项"
                optionFilterProp="children"
                notFoundContent="无法找到"
                onChange={this.handleChange}>
                {optionItems}
            </Select>
        })
    }

    render() {
        const optionItems = this.props.data.map(function(item){
            return (
                <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
            );
        });

        return (
            <div className="tag-package" style={{ width: this.props.width }}>
                {this.state.dom}
            </div>
        );
    }
};
