import React from "react";
import { connect } from "react-redux";
import { changeUserName, changePassword, loginSystem } from "../actions/login";

import '../css/login.less';

class Login extends React.Component {

	usernameHandler ( evt ) {
		this.props.dispatch( changeUserName( evt.target.value ) );
	};

	passwordHandler ( evt ) {
		this.props.dispatch( changePassword( evt.target.value ) );
	};

	loginSystemHandler () {
		this.props.dispatch( loginSystem() );
	};

	render () {

		return (
			<div className="htmleaf-container">
			<div className="wrapper">
				<div className="container">
					<h1>Welcome</h1>
					<form className="form">
						<div>早上好，{ this.props.username }</div>
						<input onChange={ this.usernameHandler.bind( this ) } type="text" placeholder="Username" />
						<input onChange={ this.passwordHandler.bind( this ) } type="password" placeholder="Password" />
						<button onClick={ this.loginSystemHandler.bind( this ) } >Login</button>
					</form>
				</div>
				<ul className="bg-bubbles">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
			</div>
		);
	};
};

function mapStateToProps ( state ) {

	return {
		username : state.login.username
		//,
		//password : state.login1.password
	}
}

export default connect( mapStateToProps )( Login );