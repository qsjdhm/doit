/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';



import { Form, Input, Button, Icon, notification, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';

import '../../../css/link.less';


export default class AddLinkPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			title       : "",              // 链接标题
			url         : "",              // 链接路径
			loading     : false            // 按钮是否在请求过程中
		};

		this.titleChange  = this.titleChange.bind(this);
		this.urlChange    = this.urlChange.bind(this);
		this.submitClick  = this.submitClick.bind(this);
	}

	// 渲染之前方法
	componentWillMount() {

	}

	// 设置state中和页面数据相关的值
	settingState(title, url, loading) {
		if(title === "no") {
			title = this.state.title;
		}
		if(url === "no") {
			url = this.state.url;
		}
		if(loading === "no") {
			loading = this.state.loading;
		}

		this.setState({
			title    : title,
			url      : url,
			loading  : loading
		});
	}




	/******************************事件响应方法--开始***********************************/

	// 标题变化
	titleChange(e) {
		const title = e.target.value;
		// 设置state中的链接标签数据
		this.settingState(title, "no", "no");
	}

	// 路径变化
	urlChange(e) {
		const url = e.target.value;
		// 设置state中的链接标签数据
		this.settingState("no", url, "no");
	}

	// 提交按钮点击
	submitClick() {
		// 设置state中的链接内容数据
		this.settingState("no", "no", true);
		// 新增链接
		this.submitData();
	}

	/******************************事件响应方法--结束***********************************/

	// 提交数据
	submitData() {
		const self = this;
		setTimeout(function() {
			const title    = encodeURI(encodeURI(self.state.title));
			const url      = encodeURI(encodeURI(self.state.url));

			jQuery.ajax({
				type : "POST",
				url : "/doit/linkAction/addLink",
				data : {
					"name" : title,
					"url" : url
				},
				dataType:"json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				success : function(cbData) {
					console.info(cbData);
					self.settingState("no", "no", false);
					if(cbData.success === "1") {
						self.openTip("success", cbData.msg);
					} else {
						self.openTip("error", cbData.msg);
					}
				},error :function(){
					message.error("新增链接连接出错！");
				}
			});
		}, 0);
	}

	// 打开提示弹框
	openTip(type, msg) {
		notification[type]({
			message: "保存提示",
			description: msg,
			duration: 3
		});
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
								<ToolBarComponent />
							</Col>
						</Row>
					</div>
					<div className="ant-layout-container">
						<div className="ant-layout-content">
							<BreadcrumbComponent
								data={this.props.routes}
							/>
							<div className="page add-book-page">
								<Form horizontal>
									<FormItem
										label="链接名称 : ">
										<Input onChange={this.titleChange} placeholder="" size="large"/>
									</FormItem>
									<FormItem
										label="链接地址 : ">
										<Input onChange={this.urlChange} placeholder="" size="large"/>
									</FormItem>
									<FormItem
										label="">
										<Button
											onClick={this.submitClick}
											loading={this.state.loading}
											type="primary"
											icon="cloud-upload-o"
											size="large">
											提交链接
										</Button>
									</FormItem>
								</Form>


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





