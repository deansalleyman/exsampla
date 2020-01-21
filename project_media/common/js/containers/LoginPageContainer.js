import { connect } from 'react-redux'
import { userActions } from '../actions'
import SignInScreen from '../components/SignInScreen';
import { userConstants } from '../constants';


function mapStateToProps(state) {
    const { loggingIn = false, loggedIn = false } = state.authentication;
    return {
        loggingIn,
        loggedIn
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
)(SignInScreen)

export default LoginPageContainer;