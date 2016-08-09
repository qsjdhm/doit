
import React from 'react';
import { connect } from 'react-redux';
import NewsOverview from '../components/NewsOverview';
import Pager from '../components/Pager';
import {fetchList, changeKeyword, chooseNews} from '../actions/news';


class NewsList extends React.Component{
	search(){
		this.props.dispatch(fetchList(this.props.keyword));
	}
  change(e){
    this.props.dispatch(changeKeyword(e.target.value));
  }
	renderList(){
		if(this.props.list !== '' && this.props.list !== undefined) {
			return this.props.list.map((item, i) =>{
				item.key = item.title;
				item.onGotoDetail = () => {
					this.props.dispatch(chooseNews(i));
					this.props.history.push('/newsviewer/' + item.id);
				}
				return React.createElement(NewsOverview, item);
			})
		}
	}
  	render(){
		let {page, totalPage, dispatch, keyword} = this.props;
		return (
			<div>
				<div>
          <span>{keyword}</span>
					<input onChange={this.change.bind(this)} value={keyword} />
					<button onClick={this.search.bind(this)}>搜索</button>
				</div>
				<div>
					{this.renderList()}
				</div>
				<Pager page={page} totalPage={totalPage} onChangePage={i=>dispatch(fetchList(null, i))} />
			</div>
		)
	}
}

function mapStateToProps(state) {
	// 一般一组状态都是为一个页面服务的，所以把它们一股脑的映射过来比较方便
	// 但是把映射一一写出来也有好处，就是很容易看到组件里有什么属性
	return Object.assign({}, state.news);
}
export default connect(mapStateToProps)(NewsList);
