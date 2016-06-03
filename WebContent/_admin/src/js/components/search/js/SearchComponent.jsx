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
                {"id":"#/home/addArticle",      "name":"新增文章"},
                {"id":"#/home/editArticle/1",   "name":"编辑文章"},
                {"id":"#/home/delArticle/1",    "name":"删除文章"},
                {"id":"#/home/addNote",         "name":"新增笔记"},
                {"id":"#/home/editNote/1",      "name":"编辑笔记"},
                {"id":"#/home/delNote/1",       "name":"删除笔记"},
                {"id":"#/home/addBook",         "name":"新增图书"},
                {"id":"#/home/editBook/1",      "name":"编辑图书"},
                {"id":"#/home/delBook/1",       "name":"删除图书"},
                {"id":"#/home/editComment/1",   "name":"编辑评论"},
                {"id":"#/home/delComment/1",    "name":"删除评论"},
                {"id":"#/home/addLink",         "name":"新增外链"},
                {"id":"#/home/editLink/1",      "name":"编辑外链"},
                {"id":"#/home/delLink/1",       "name":"删除外链"},
                {"id":"#/home/addSort",         "name":"新增分类"},
                {"id":"#/home/editSort/1",      "name":"编辑分类"},
                {"id":"#/home/delSort/1",       "name":"删除分类"},
                {"id":"#/home/articleRecom/1",  "name":"文章推荐量"},
                {"id":"#/home/noteRecom/1",     "name":"笔记推荐量"},
                {"id":"#/home/bookRecom/1",     "name":"图书推荐量"},
                {"id":"#/home/addUser",         "name":"新增用户"},
                {"id":"#/home/editUser/1",      "name":"编辑用户"},
                {"id":"#/home/delUser/1",       "name":"删除用户"}
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
