import React from 'react';

class Pager extends React.Component{
	renderNumbers(){
		let {page, totalPage, onChangePage} = this.props
		return Array.from({length:totalPage}, (x,i)=>{
			++i;
			let style = {
				display: 'inline-block',
				border: 'solid 1px #ddd',
				padding: '5px',
				margin: '2px',
				color: page==i ? 'red' : '#999'
			}
			return <b style={style} onClick={()=>{onChangePage(i)}}>{i}</b>
		})
	}

	render(){
		return <div> {this.renderNumbers()} </div>
	}
}

Pager.propTypes = {
	page: React.PropTypes.number.isRequired,
	totalPage: React.PropTypes.number.isRequired,
	onChangePage: React.PropTypes.func.isRequired
}
export default Pager;
