import { connect } from 'react-redux'
import { userActions } from '../actions'
import LoginPage from '../components/LoginPage';
import { userConstants } from '../constants';



// const mapStateToProps = state => {
//   return {
//     remoteData: state.remoteData
//   }
// }

function mapStateToProps(state) {
    const { loggingIn = false } = state.authentication;
    return {
        loggingIn
    };
}

const mapDispatchToProps = dispatch => {
    return {
      onLoginUser: (username, password) => {
        dispatch(userActions.loginUser(username, password))
      }
    }
  }

const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

export default LoginPageContainer;