/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    selectedSortIdChange,
    nameChange,
    addSort,
    loadingChange
} from '../../actions/sort/addSort';

import { Form, Input, Button, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';


import '../../css/sort.less';

export class AddSortPage extends React.Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {

    }


    // 渲染笔记分类下拉框
    renderSortSelect () {
        const sortList = [
            {
                "id" : 3,
                "name" : "图书分类"
            },
            {
                "id" : 8,
                "name" : "笔记分类"
            },
            {
                "id" : 4,
                "name" : "标签分类"
            }
        ];
        return <SelectComponent
            defaultValue={sortList[0].id}
            data={sortList}
            selected={this.sortChangeHandler.bind(this)}/>
    }

    sortChangeHandler (sortId) {
        this.props.dispatch(selectedSortIdChange(sortId));
    }

    nameChangeHandler (e) {
        this.props.dispatch(nameChange(e.target.value));
    }

    submitClickHandler () {
        this.props.dispatch(addSort());
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
                        <div id="page" className="page add-sort-page">
                            <Form horizontal>
                                <FormItem
                                    label="所属分类">
                                    { this.renderSortSelect() }
                                </FormItem>

                                <FormItem
                                    label="分类名称">
                                    <Input onChange={this.nameChangeHandler.bind(this)} placeholder="" size="large"/>
                                </FormItem>
                                <FormItem
                                    label="">
                                    <Button
                                        onClick={this.submitClickHandler.bind(this)}
                                        loading={this.props.loading}
                                        type="primary"
                                        icon="cloud-upload-o"
                                        size="large">
                                        提交分类
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
    return Object.assign({}, state.addSort);
}

export default connect( mapStateToProps )( AddSortPage );



