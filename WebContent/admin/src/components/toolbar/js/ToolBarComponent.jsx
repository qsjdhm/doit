/**
 * Created by zhangyan on 2016/1/12.
 */

import 'antd/dist/antd.css';
import '../css/toolbar.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Icon } from 'antd';
import auth from '../../../utils/auth'


export default class ToolBarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    logout() {
        auth.logout();
    }

    render() {
        return (
            <div className="toolbar-component">
                <a href="http://52doit.com/">
                    <Icon type="customerservice" />
                    在线咨询
                </a>
                <a href="https://github.com/qsjdhm">
                    <Icon type="github" />
                    不拽注定被甩~
                </a>
                <a onClick={this.logout.bind(this)} >
                    <Icon type="logout" />
                    退出
                </a>
            </div>
        );
    }
};
