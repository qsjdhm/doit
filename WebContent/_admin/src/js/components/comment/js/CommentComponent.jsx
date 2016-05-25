/**
 * Created by zhangyan on 2016/1/12.
 */

import React from 'react';

export default class CommentComponent extends React.Component {
	//getInitialState(){
	//	return {
	//		display: "none"
	//	};
	//}
	constructor(props) {
		super(props);
		this.state = {display: "none"};
		// 遇到方法中使用this的都需要在这里绑定
		this.handleReply = this.handleReply.bind(this);
	}
	handleReply(e){
		return this.setState({
			display : "inline-table"
		});
	}
	render(){
		return (
			<div className="comment">
				<img className="comment_img" src={require("../img/foot.png")} />
				<div className="comment_con">
					<span className="comment_author">{this.props.author}</span>
					<span className="comment_time">{this.props.time}</span>
					<div className="comment_text">{this.props.text}</div>
				</div>
				<div className="comment_act">
					<a className="reply" href="javascript:void(0)" onClick={this.handleReply}>回复12</a>
					<a className="cancel" href="javascript:void(0)" style={{display: this.state.display}}>取消回复12</a>
				</div>
			</div>
		);
	}
};
