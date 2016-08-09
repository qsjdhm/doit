import React from 'react'
import {connect} from 'react-redux'
import NewsOverview from '../components/NewsOverview'
import {fetchNewsDetail} from '../actions/news';

class NewsViewer extends React.Component{
	componentWillMount(){
		// 在react-router的帮助下，我们可以很轻松地拿到url路径上的参数id
		this.props.dispatch(fetchNewsDetail(this.props.params.id))
	}

	render(){
		return (
			<div>
				{React.createElement(NewsOverview, Object.assign({
					showDetail: true
				},this.props.news))}
			</div>
		)
	}
}

export default connect(state => {return {news: state.news.current}})(NewsViewer)

