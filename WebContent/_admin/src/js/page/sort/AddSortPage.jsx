/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';



import { Form, Upload, Input, Button, Icon, notification, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';

import '../../../css/sort.less';


export default class AddSortPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			fSortId     : 0,               // 总分类ID
			sortName    : "",              // 分类Name
			loading     : false,           // 按钮是否在请求过程中

			sortDOM     : null
		};

		this.sortSelected = this.sortSelected.bind(this);
		this.nameChange  = this.nameChange.bind(this);
		this.submitClick  = this.submitClick.bind(this);
	}

	// 渲染之前获取分类和标签数据
	componentWillMount() {
		const sortArray = [
			{
				"id" : "3",
				"name" : "图书分类"
			},
			{
				"id" : "8",
				"name" : "笔记分类"
			},
			{
				"id" : "4",
				"name" : "标签分类"
			}
		];

		// 设置state中的分类数据
		this.settingState(sortArray[0].id, "no", "no");

		// 设置sortDOM--因为ajax之后select的默认数据不会自动设置
		this.setState({
			sortDOM : <SelectComponent
				defaultValue={sortArray[0].id}
				data={sortArray}
				selected={this.sortSelected}
			/>
		});
	}

	// 设置state中和页面数据相关的值
	settingState(fSortId, name, loading) {
		if(fSortId === "no") {
			fSortId = this.state.fSortId;
		}
		if(name === "no") {
			name = this.state.name;
		}
		if(loading === "no") {
			loading = this.state.loading;
		}

		this.setState({
			fSortId  : fSortId,
			name     : name,
			loading  : loading
		});
	}




	/******************************事件响应方法--开始***********************************/

	// 分类切换
	sortSelected(fSortId){
		console.info(fSortId);
		this.settingState(fSortId, "no", "no");
	}

	// 标题变化
	nameChange(e) {
		const name = e.target.value;
		// 设置state中的分类标签数据
		this.settingState("no", name, "no");
	}

	// 提交按钮点击
	submitClick() {
		// 设置state中的分类内容数据
		this.settingState("no", "no", true);
		// 新增分类
		this.submitData();
	}

	/******************************事件响应方法--结束***********************************/


	// 提交数据
	submitData() {
		const self = this;
		setTimeout(function() {

			const fSortId = self.state.fSortId;
			const name    = encodeURI(encodeURI(self.state.name));

			jQuery.ajax({
				type : "POST",
				url : "/doit/sortAction/addSort",
				data : {
					"fSortId"  : fSortId,
					"sortName" : name
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
					message.error("新增分类连接出错！");
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
							<div className="page add-sort-page">
								<Form horizontal>
									<FormItem
										label="所属父类 : ">
										{this.state.sortDOM}
									</FormItem>
									<FormItem
										label="分类名称 : ">
										<Input onChange={this.nameChange} placeholder="" size="large"/>
									</FormItem>
									<FormItem
										label="">
										<Button
											onClick={this.submitClick}
											loading={this.state.loading}
											type="primary"
											icon="cloud-upload-o"
											size="large">
											提交分类
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





