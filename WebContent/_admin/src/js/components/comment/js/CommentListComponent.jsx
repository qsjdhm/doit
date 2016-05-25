/**
 * Created by zhangyan on 2016/1/12.
 */
import React from 'react';
import CommentComponent from './CommentComponent';

export default class CommentListComponent extends React.Component {
	render(){
		var commentItems = this.props.commentItems.map(function(item){
			return (
				<CommentComponent
					author={item.author}
					time={item.time}
					text={item.text}>
				</CommentComponent>
			);
		});
		return (
			<div id="commentList" className="commentList">
				{commentItems}
			</div>
		);
	}
};
