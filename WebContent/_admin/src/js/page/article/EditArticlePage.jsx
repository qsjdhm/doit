/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

import { Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';

export default class EditArticlePage extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
		    sortData : []
	    };

	    this.selected = this.selected.bind(this);
    }

	selected(val){
		console.info(val);
	}


	componentWillMount() {
		const self = this;
        jQuery.ajax({
            type : "POST",
            url : "/doit/articleAction/getArticleSort", 
            data : {},
            dataType:"json",
            success : function(cbData) {
                console.info(cbData);

	            if(cbData.success === "1"){
		            let sortArray = [];
		            for(let i=0, len=cbData.data.length; i<len; i++){
			            const sortObj = {
				            "id" : ""+cbData.data[i].Sort_ID,
			                "name" : cbData.data[i].Sort_Name
			            };
			            sortArray.push(sortObj);
		            }

		            self.setState({
			            sortData : sortArray
		            });
	            }
            },error :function(){
                alert("网络连接出错！");   
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
                                    placeholder="快速菜单入口1"
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
                            <span>EditArticlePage</span>
	                        <SelectComponent data={this.state.sortData} selected={this.selected} />
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





