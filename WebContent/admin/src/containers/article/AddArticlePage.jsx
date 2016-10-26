/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
    getSortList,
    selectedSortIdChange,
    selectedSortNameChange,
    titleChange,
    contentChange,
    selectedTagChange,
    addArticle,
    loadingChange
} from '../../actions/article/addArticle';

import { Input, Button, notification, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';
import UeditorComponent    from '../../components/ueditor/js/UeditorComponent';
import TagComponent        from '../../components/tag/js/TagComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';



import '../../css/article.less';

export class AddArticlePage extends React.Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {
        // 获取文章的分类列表
        this.props.dispatch( getSortList() );
    }


    // 渲染文章分类下拉框
    renderSortSelect () {
        if( this.props.sortList.length !== 0 ) {
            return <SelectComponent
                defaultValue={this.props.sortList[0].id}
                data={this.props.sortList}
                selected={this.sortChangeHandler.bind(this)}/>
        }
    }

    sortChangeHandler (sortId) {
        let nowSort = {
            sortId   : sortId,
            sortName : ""
        };
        const sorts = this.props.sortList;
        for(let sort of sorts){
            if(sort.id === sortId) {
                nowSort.sortName = sort.name;
                break;
            }
        }

        this.props.dispatch(selectedSortIdChange(nowSort.sortId));
        this.props.dispatch(selectedSortNameChange(nowSort.sortName));
    }


    titleChangeHandler (e) {
        this.props.dispatch(titleChange(e.target.value));
    }

    // 渲染文章标签下拉框
    renderTag () {
        if( this.props.tagList.length !== 0 ) {
            return <TagComponent
                width={820}
                data={this.props.tagList}
                selected={this.tagChangeHandler.bind(this)}
            />
        }
    }

    tagChangeHandler (tag) {
        this.props.dispatch(selectedTagChange(tag));
    }

    submitClickHandler () {
        const content = UE.getEditor("content").getContent();
        this.props.dispatch(contentChange(content));
        this.props.dispatch(addArticle());
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
                                <ToolBarComponent
                                />
                            </Col>
                        </Row>
                    </div>
                    <div id="container" className="ant-layout-container">
                        <div className="ant-layout-content">
                            <BreadcrumbComponent
                                data={this.props.routes}
                            />
                        </div>
                        <div id="page" className="page add-article-page">
                            { this.renderSortSelect() }
                            <Input onChange={this.titleChangeHandler.bind(this)} style={{ width: 470 }} size="large" placeholder="文章名称"/>
                            <UeditorComponent
                                id="content"
                                width="820"
                                height="400"
                            />
                            { this.renderTag() }
                            <Button
                                onClick={this.submitClickHandler.bind(this)}
                                loading={this.props.loading}
                                type="primary"
                                icon="cloud-upload-o"
                                size="large">
                                提交文章
                            </Button>
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
    return Object.assign({}, state.addArticle);
}

export default connect( mapStateToProps )( AddArticlePage );



