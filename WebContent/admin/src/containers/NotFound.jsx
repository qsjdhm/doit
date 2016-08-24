import React from "react";
import { connect } from "react-redux";

import '../css/notFound.less';

class NotFound extends React.Component {

	render () {
		return (
			<div id="content" className="cf">
				<div id="doit_wrap">
					<div className="logo_wrap cf">
						<img id="doit" src={require("../i/notFound.png")} />
					</div>
					<div className="reason">
						<p className="not_found_tip">Not Found  :( 很抱歉，您访问的页面不存在!</p>
						<p className="possible">可能原因：</p>
						<ul>
							<li>该数据已被删除，但却被搜索引擎收录了，通过搜索引擎访问就会看到此页面</li>
							<li>您手动输入了一个从来没有的访问url，这样系统也是无法识别您的url，报错</li>
						</ul>
					</div>
				</div>
				<div className="line"></div>

				<div className="not_found">
					<i className="ribbon"></i>
					<div className="not_found_404 cf">
						<span>4</span>
						<span>0</span>
						<span>4</span>
					</div>
					<div className="btn">
						<a href="http://www.52doit.com/" className="button button-rounded">看看首页</a>
						<a href="http://www.52doit.com/_login" className="button button-rounded cancle">返回登录</a>
					</div>
				</div>

			</div>
		);
	};
};

function mapStateToProps ( state ) {

	return {

	}
}

export default connect( mapStateToProps )( NotFound );