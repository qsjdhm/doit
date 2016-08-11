/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { byTypeGetSort } from '../../actions/note';

import { Popconfirm, Button, message, Row, Col } from 'antd';

import MenuComponent       from '../../components/menu/js/MenuComponent';
import SearchComponent     from '../../components/search/js/SearchComponent';
import ToolBarComponent    from '../../components/toolbar/js/ToolBarComponent';
import BreadcrumbComponent from '../../components/breadcrumb/js/BreadcrumbComponent';
import SelectComponent     from '../../components/select/js/SelectComponent';
import fetchComponent      from '../../components/fetch/js/fetchComponent';

import '../../css/note.less';

export default class DelNotePage extends React.Component {
	constructor(props) {
		super(props);
	}

    componentWillMount() {
        // 获取笔记的分类列表
        this.props.dispatch(byTypeGetSort());
    }

	renderList(){

		if(this.props.sortArray.length !== 0) {
			let sortList = [];
			this.props.sortArray.map((item, i) =>{
				const sortObj = {
					"id" : item.Sort_ID,
					"name" : item.Sort_Name
				};
				sortList.push(sortObj);
			})

			return <SelectComponent
				defaultValue={sortList[0].id}
				data={sortList} />
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
							<div id="note_page" className="page del-note-page">
								{this.renderList()}
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
	return Object.assign({}, state.note);
}

export default connect( mapStateToProps )( DelNotePage );



