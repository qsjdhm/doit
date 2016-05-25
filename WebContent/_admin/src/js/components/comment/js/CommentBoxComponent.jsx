/**
 * Created by zhangyan on 2016/1/12.
 */

import React from 'react';
import CommentListComponent from './CommentListComponent';
import CommentFormComponent from './CommentFormComponent';

export default class CommentBoxComponent extends React.Component {
	//getInitialState(){
	//	return this.props.commentItems;
	//}
	constructor(props) {
		super(props);
		this.state = {commentItems: props.commentItems};
		this.addCommentItem = this.addCommentItem.bind(this);
	}
	addCommentItem(newData){
		// 重新向里面添加新的数据
		this.state.commentItems.push(newData);
		return this.setState({
			commentItems : this.state.commentItems
		});
	}
	render(){
		return (
			<div className="commentBox">
				<h4>大家的脚印</h4>
				<CommentListComponent commentItems={this.state.commentItems} />
				<CommentFormComponent addData={this.addCommentItem} />
			</div>
		);
	}
};
