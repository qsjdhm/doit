/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Row, Col } from 'antd';

import MenuComponent       from '../components/menu/js/MenuComponent';
import SearchComponent     from '../components/search/js/SearchComponent';
import ToolBarComponent    from '../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../components/breadcrumb/js/BreadcrumbComponent';
import CardComponent       from '../components/card/js/CardComponent';


export class HomePage extends React.Component {
    constructor(props) {
        super(props);
		console.info(this.props);
    }

    render() {
        return (
            <div>
				<MenuComponent openSubMenu={this.props.route.sort} selectedMenu={this.props.route.bpath} />
                <div className="ant-layout-main">
                    <div className="ant-layout-header">
                        <Row>
                            <Col span={4}>
                                <SearchComponent
                                    placeholder="快速菜单入口"
                                    style={{ width: 230 }}
                                />
                            </Col>
                            <Col span={12} offset={8}>
                                <ToolBarComponent />
                            </Col>
                        </Row>
                    </div>
                    <div className="ant-layout-container">
                        <div className="ant-layout-content">
                            <BreadcrumbComponent data={this.props.routes} />
                            <div id="page" className="page home-page">
                                <CardComponent
                                />
                            </div>
                        </div>
                    </div>
                    <div className="ant-layout-footer">
                        52DOIT 版权所有 © 2016 由不拽注定被甩~技术支持
                    </div>
                </div>
            </div>
        );
    }
};



function mapStateToProps ( state ) {
    return Object.assign({}, state);
}

export default connect( mapStateToProps )( HomePage );




