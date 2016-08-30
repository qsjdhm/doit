/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    nameChange,
    urlChange,
    addLink,
    loadingChange
} from '../../actions/link/addLink';

import { Form, Input, Button, notification, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';

import '../../css/link.less';

export default class AddLinkPage extends React.Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {

    }

    nameChangeHandler (e) {
        this.props.dispatch(nameChange(e.target.value));
    }

    urlChangeHandler (e) {
        this.props.dispatch(urlChange(e.target.value));
    }

    submitClickHandler () {
        this.props.dispatch( addLink() );
    }

    render() {
        const FormItem = Form.Item;
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
                                <ToolBarComponent
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className="ant-layout-container">
                        <div className="ant-layout-content">
                            <BreadcrumbComponent
                                data={this.props.routes}
                            />
                        </div>
                        <div id="page" className="page add-link-page">
                            <Form horizontal>
                                <FormItem
                                    label="链接名称">
                                    <Input onChange={this.nameChangeHandler.bind(this)} placeholder="" size="large"/>
                                </FormItem>
                                <FormItem
                                    label="链接地址">
                                    <Input onChange={this.urlChangeHandler.bind(this)} placeholder="" size="large"/>
                                </FormItem>
                                <FormItem
                                    label="">
                                    <Button
                                        onClick={this.submitClickHandler.bind(this)}
                                        loading={this.props.loading}
                                        type="primary"
                                        icon="cloud-upload-o"
                                        size="large">
                                        提交外链
                                    </Button>
                                </FormItem>
                            </Form>
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
    return Object.assign({}, state.addLink);
}

export default connect( mapStateToProps )( AddLinkPage );



