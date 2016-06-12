/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

import { Row, Col, Input } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';
import UeditorComponent    from '../../components/ueditor/js/UeditorComponent';
import TagComponent        from '../../components/tag/js/TagComponent';

import '../../../css/article.less';


export default class AddArticlePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sort : 0,
            name : "",
            tags : [],

            sortDOM : null,
            tagDOM : null
        };

        this.selected = this.selected.bind(this);
        this.textChange = this.textChange.bind(this);
        this.tagSelected = this.tagSelected.bind(this);
        this.byTypeGetSort = this.byTypeGetSort.bind(this);
    }

    componentWillMount() {
        // 获取文章的分类列表
        this.byTypeGetSort();
        // 获取标签列表
        this.getTags();
    }


    selected(sort){
        this.setState({
            sort : sort
        });
        console.info(this.state);
    }

    textChange(e){
        this.setState({
            name: e.target.value
        });
    }

    tagSelected(tag){
        console.info(tag);
    }

    // 首先得到文章的分类
    byTypeGetSort() {
        const self = this;
        jQuery.ajax({
            type : "POST",
            url : "/doit/sortAction/byTypeGetSort",
            data : {
                "type" : "article"
            },
            dataType:"json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success : function(cbData) {
                if(cbData.success === "1"){
                    let sortArray = [];
                    for(let item of cbData.data){
                        const sortObj = {
                            "id" : item.Sort_ID,
                            "name" : item.Sort_Name
                        };
                        sortArray.push(sortObj);
                    }

                    // 设置sortDOM--因为ajax之后select的默认数据不会自动设置
                    self.setState({
                        sort : sortArray[0].id,
                        sortDOM : <SelectComponent
                            defaultValue={sortArray[0].id}
                            data={sortArray}
                            selected={self.selected} />
                    });
                }
            },error :function(){
                alert("请求文章分类连接出错！");
            }
        });
    }




    // 获取标签列表
    getTags() {
        const self = this;
        jQuery.ajax({
            type : "POST",
            url : "/doit/sortAction/byTypeGetSort",
            data : {
                "type" : "tag"
            },
            dataType:"json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success : function(cbData) {
                if(cbData.success === "1"){
                    let tagArray = [];
                    for(let item of cbData.data){
                        const sortObj = {
                            "id" : item.Sort_ID,
                            "name" : item.Sort_Name
                        };
                        tagArray.push(sortObj);
                    }

                    // 设置sortDOM--因为ajax之后select的默认数据不会自动设置
                    self.setState({
                        tagDOM : <TagComponent
                            data={tagArray}
                            selected={self.tagSelected} />
                    });
                }
            },error :function(){
                alert("请求文章分类连接出错！");
            }
        });
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
                            <div id="article_page" className="page add-article-page">
                                {this.state.sortDOM}
                                <Input size="large" onChange={this.textChange} placeholder="文章名称" style={{ width: 610 }} />
                                <UeditorComponent value={12346548}  id="content" width="820" height="400" />
                                {this.state.tagDOM}
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





