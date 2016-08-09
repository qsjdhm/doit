/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { Row, Col } from 'antd';

import MenuComponent       from '../components/menu/js/MenuComponent';


export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
				<MenuComponent openSubMenu={this.props.route.sort} selectedMenu={this.props.route.bpath} />
                asjdbsakbdasjdb
            </div>
        );
    }
};





