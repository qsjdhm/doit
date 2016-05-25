/**
 * Created by zhangyan on 2016/1/12.
 */

import React from 'react';

export default class CommentFormComponent extends React.Component {
	//getInitialState(){
	//	return {
	//		author: "",
	//		time: "",
	//		text: ""
	//	};
	//}
	constructor(props) {
		super(props);
		this.state = {
						author: "",
						time: "",
						text: ""
					};
		this.handleClick = this.handleClick.bind(this);
		this.authorChange = this.authorChange.bind(this);
		this.textChange = this.textChange.bind(this);
	}
	handleClick(){
		var item = new Object();
		item["author"] = this.state.author;
		item["time"] = "20150910";
		item["text"] = this.state.text;
		this.props.addData(item);
	}
	// 相当于model层的set方法
	authorChange(e){
		this.setState({author: e.target.value});
	}
	textChange(e){
		this.setState({text: e.target.value});
	}
	render(){
		return (
			<div className="commentForm">
				<div>
					用户名：
					<input id="author" ref="author" value={this.state.author} onChange={this.authorChange} />
					<label for="author">author</label>
				</div>
				<div>
					内容：
					<input id="text" ref="text" value={this.state.text} onChange={this.textChange} />
					<label for="text">text</label>
				</div>
				<input type="button" value="发表" onClick={this.handleClick} />
			</div>
		);
	}
};
