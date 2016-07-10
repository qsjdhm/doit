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
            data : [
                {"id":"#/addArticle",      "name":"新增文章"},
                {"id":"#/editArticle",     "name":"编辑文章"},
                {"id":"#/delArticle",      "name":"删除文章"},
                {"id":"#/addNote",         "name":"新增笔记"},
                {"id":"#/editNote",        "name":"编辑笔记"},
                {"id":"#/delNote",         "name":"删除笔记"},
                {"id":"#/addBook",         "name":"新增图书"},
                {"id":"#/editBook",        "name":"编辑图书"},
                {"id":"#/delBook",         "name":"删除图书"},
                {"id":"#/editComment",     "name":"编辑评论"},
                {"id":"#/delComment",      "name":"删除评论"},
                {"id":"#/addLink",         "name":"新增外链"},
                {"id":"#/editLink",        "name":"编辑外链"},
                {"id":"#/delLink",         "name":"删除外链"},
                {"id":"#/addSort",         "name":"新增分类"},
                {"id":"#/editSort",        "name":"编辑分类"},
                {"id":"#/delSort",         "name":"删除分类"},
                {"id":"#/articleRecom",    "name":"文章推荐量"},
                {"id":"#/noteRecom",       "name":"笔记推荐量"},
                {"id":"#/bookRecom",       "name":"图书推荐量"},
                {"id":"#/addUser",         "name":"新增用户"},
                {"id":"#/editUser",        "name":"编辑用户"},
                {"id":"#/delUser",         "name":"删除用户"}
            ],
            value: "",
            focus: false
        };
        // 遇到方法中使用this的都需要在这里绑定
        this.handleChange    = this.handleChange.bind(this);
        this.handleSelect    = this.handleSelect.bind(this);
    }

    handleChange(value) {
        window.location.href = value;
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
        const optionItems = this.state.data.map((item, index) => {
            return (
                <Select.Option key={item.id}> {item.name} </Select.Option>
            );
        });
        return (
            <div className="ant-search-input-wrapper" style={this.props.style}>
                <Input.Group className={searchCls}>
                    <Select
                        showSearch
                        size="large"
                        style={this.props.style}
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
