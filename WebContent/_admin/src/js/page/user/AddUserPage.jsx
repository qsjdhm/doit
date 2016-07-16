/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { Form, Input, Button, Icon, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';

import '../../../css/link.less';

export default class AddUserPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name        : "",              // 用户名称
			password    : "",              // 用户密码
			email       : "",              // 用户邮箱
			loading     : false            // 按钮是否在请求过程中
		};

		this.nameChange     = this.nameChange.bind(this);
		this.passwordChange = this.passwordChange.bind(this);
		this.emailChange    = this.emailChange.bind(this);
		this.submitClick    = this.submitClick.bind(this);
	}

	// 渲染之前方法
	componentWillMount() {

	}

	// 设置state中和页面数据相关的值
	settingState(name, password, email, loading) {
		if(name === "no") {
			name = this.state.name;
		}
		if(password === "no") {
			password = this.state.password;
		}
		if(email === "no") {
			email = this.state.email;
		}
		if(loading === "no") {
			loading = this.state.loading;
		}

		this.setState({
			name      : name,
			password  : password,
			email     : email,
			loading   : loading
		});
	}




	/******************************事件响应方法--开始***********************************/

	// 名称变化
	nameChange(e) {
		const name = e.target.value;
		// 设置state中的链接标签数据
		this.settingState(name, "no", "no", "no");
	}

	// 密码变化
	passwordChange(e) {
		const password = e.target.value;
		// 设置state中的链接标签数据
		this.settingState("no", password, "no", "no");
	}

	// 邮箱变化
	emailChange(e) {
		const email = e.target.value;
		// 设置state中的链接标签数据
		this.settingState("no", "no", email, "no");
	}

	// 提交按钮点击
	submitClick() {
		// 设置state中的链接内容数据
		this.settingState("no", "no", "no", true);
		// 新增链接
		this.submitData();
	}

	/******************************事件响应方法--结束***********************************/

	// 提交数据
	submitData() {
		const self = this;
		setTimeout(function() {
			const url = "/doit/userAction/addUser";
			const method = "POST";
			const body = {
				"name"      : encodeURI(encodeURI(self.state.name)),
				"password"  : encodeURI(encodeURI(self.state.password)),
				"email"     : encodeURI(encodeURI(self.state.email))
			};
			const errInfo = "新增用户连接出错！";
			fetchComponent.send(self, url, method, body, errInfo, self.requestSubmitCallback);
		}, 0);
	}

	// 新增用户回调方法
	requestSubmitCallback(cbData) {
		this.settingState("no", "no", "no", false);
		if(cbData.success === "1") {
			message.success(cbData.msg+"！", 3);
		} else {
			message.error(cbData.msg+"！", 3);
		}
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
										label="用户名称">
										<Input onChange={this.nameChange} placeholder="" size="large"/>
									</FormItem>
									<FormItem
										label="用户密码">
										<Input onChange={this.passwordChange} placeholder="" size="large"/>
									</FormItem>
									<FormItem
										label="用户邮箱">
										<Input onChange={this.emailChange} placeholder="" size="large"/>
									</FormItem>
									<FormItem
										label="">
										<Button
											onClick={this.submitClick}
											loading={this.state.loading}
											type="primary"
											icon="cloud-upload-o"
											size="large">
											提交用户
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





