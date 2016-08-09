
import { connect } from 'react-redux'
import {inputUsername, inputPassword} from '../actions/login'

class Login extends React.Component{
  inputUsernameHandler(evt){
    this.props.dispatch(inputUsername(evt.target.value))
  }
  inputPasswordHandler(evt){
    this.props.dispatch(inputPassword(evt.target.value))
  }
  render(){
    return (
      <div>
        <div>早上好，{this.props.username}</div>
        <div>用户名：<input onChange={this.inputUsernameHandler.bind(this)}/></div>
        <div>密　码：<input type="papssword" onChange={this.inputPasswordHandler.bind(this)}/></div>
        <button>登录</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.login.username,
    password: state.login.password
  }
}
export default connect(mapStateToProps)(Login);
