
import React from 'react';

class NewsOverview extends React.Component{
  	render(){
		console.info(this.props);
	  	let date = new Date(this.props.time);
		return (
			<div onClick={this.props.onGotoDetail}>
				<h2>{this.props.title}</h2>
				<div style={{padding:'16px 0',color: '#888'}}>
					{date.toLocaleDateString()} {date.toLocaleTimeString()}
				</div>
				<div style={{textAlign:'center'}}>
					<img src={this.props.img} style={{maxWidth:'100%'}}/>
				</div>
				{this.props.showDetail ?
					<p dangerouslySetInnerHTML={{__html:this.props.message}}/> :
					<p>{this.props.description}</p>
				}
			</div>
		)
  	}
}

export default NewsOverview;
