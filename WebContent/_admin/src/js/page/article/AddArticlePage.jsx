/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';



import { Input, Button, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';
import UeditorComponent    from '../../components/ueditor/js/UeditorComponent';
import TagComponent        from '../../components/tag/js/TagComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';

import '../../../css/article.less';


export default class AddArticlePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            allSort  : [],              // 所有分类的数组
            sortId   : 0,               // 分类ID
            sortName : "",              // 分类Name
            title    : "",              // 文章标题
            content  : "",              // 文章内容
            tags     : [],              // 文章标签
	        loading  : false,           // 按钮是否在请求过程中

            sortDOM  : null,
            tagDOM   : null
        };

        this.sortSelected = this.sortSelected.bind(this);
        this.titleChange  = this.titleChange.bind(this);
        this.tagSelected  = this.tagSelected.bind(this);
        this.submitClick  = this.submitClick.bind(this);
    }

    // 渲染之前获取分类和标签数据
    componentWillMount() {
        // 获取文章的分类列表
        this.byTypeGetSort();
        // 获取标签列表
        this.getTags();
    }

    // 设置state中和页面数据相关的值
    settingState(allSort, sortId, sortName, title, content, tags, loading) {
        if(allSort === "no") {
            allSort = this.state.allSort;
        }
        if(sortId === "no") {
            sortId = this.state.sortId;
        }
        if(sortName === "no") {
            sortName = this.state.sortName;
        }
        if(title === "no") {
            title = this.state.title;
        }
        if(content === "no") {
            content = this.state.content;
        }
        if(tags === "no") {
            tags = this.state.tags;
        }
	    if(loading === "no") {
		    loading = this.state.loading;
	    }

        this.setState({
            allSort  : allSort,
            sortId   : sortId,
            sortName : sortName,
            title    : title,
            content  : content,
            tags     : tags,
	        loading  : loading
        });
    }

    /******************************事件响应方法--开始***********************************/

    // 分类切换
    sortSelected(sortId){
        let nowSort = {
            sortId   : sortId,
            sortName : ""
        };
        const sorts = this.state.allSort;
        for(let sort of sorts){
            if(sort.id === sortId) {
                nowSort.sortName = sort.name;
                break;
            }
        }

        this.settingState("no", nowSort.sortId, nowSort.sortName, "no", "no", "no", "no");
    }

    // 标题变化
    titleChange(e){
        const title = e.target.value;
        console.info(title);
        // 设置state中的文章标题数据
        this.settingState("no", "no", "no", title, "no", "no", "no");
    }

    // 标签切换
    tagSelected(tag){
        // 设置state中的文章标签数据
        this.settingState("no", "no", "no", "no", "no", tag, "no");
    }

    // 提交按钮点击
    submitClick() {
        const content = UE.getEditor("content").getContent();
        // 设置state中的文章内容数据
        this.settingState("no", "no", "no", "no", content, "no", true);

        // 新增文章
        this.submitData();
    }

    /******************************事件响应方法--结束***********************************/


    // 首先得到文章的分类
    byTypeGetSort() {
		const url = "/doit/sortAction/byTypeGetSort";
		const method = "POST";
		const body = {
			"type" : "article"
		};
		const errInfo = "请求文章分类连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, this.requestSortCallback);
    }

	// 请求文章分类的回调方法
	requestSortCallback(cbData) {
		if(cbData.success === "1"){
			let sortArray = [];
			for(let item of cbData.data){
				const sortObj = {
					"id" : item.Sort_ID,
					"name" : item.Sort_Name
				};
				sortArray.push(sortObj);
			}
			// 设置state中的分类数据
			this.settingState(sortArray, sortArray[0].id, sortArray[0].name, "no", "no", "no", "no");

			// 设置sortDOM--因为ajax之后select的默认数据不会自动设置
			this.setState({
				sortDOM : <SelectComponent
					defaultValue={sortArray[0].id}
					data={sortArray}
					selected={this.sortSelected}
					/>
			});
		}
	}

    // 获取标签列表
    getTags() {
		const url = "/doit/sortAction/byTypeGetSort";
		const method = "POST";
		const body = {
			"type" : "tag"
		};
		const errInfo = "请求文章标签连接出错！";
        fetchComponent.send(this, url, method, body, errInfo, this.requestTagCallback);
    }

	// 请求标签的回调方法
	requestTagCallback(cbData) {
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
			this.setState({
				tagDOM : <TagComponent
					width={820}
					data={tagArray}
					selected={this.tagSelected}
					/>
			});
		}
	}

    // 新增文章
    submitData() {
        const self = this;
        setTimeout(function() {
            const url = "/doit/articleAction/addArticle";
            const method = "POST";
            const body = {
                "sortId"   : self.state.sortId,
                "sortName" : encodeURI(encodeURI(self.state.sortName)),
                "title"    : encodeURI(encodeURI(self.state.title)),
                "content"  : encodeURI(encodeURI(self.state.content)),
                "tags"     : encodeURI(encodeURI(self.state.tags.join(",")))
            };
            const errInfo = "新增文章连接出错！";
            fetchComponent.send(self, url, method, body, errInfo, self.requestSubmitCallback);
        }, 0);
    }

    // 保存文章的回调方法
    requestSubmitCallback(cbData) {
        this.settingState("no", "no", "no", "no", "no", "no", false);
        if(cbData.success === "1") {
            message.success(cbData.msg+"！", 3);
        } else {
            message.error(cbData.msg+"！", 3);
        }
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
                            <BreadcrumbComponent
                                data={this.props.routes}
                            />
                            <div className="page add-article-page">
                                {this.state.sortDOM}
                                <Input onChange={this.titleChange} style={{ width: 470 }} size="large" placeholder="文章名称"/>
                                <UeditorComponent
                                    id="content"
                                    width="820"
                                    height="400"
                                    value=""
                                />
                                {this.state.tagDOM}
	                            <Button
		                            onClick={this.submitClick}
		                            loading={this.state.loading}
		                            type="primary"
		                            icon="cloud-upload-o"
		                            size="large">
		                            提交文章
	                            </Button>
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





