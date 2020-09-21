import {connect} from 'react-redux'
import {userActions} from '../actions'
import SignInScreen from '../components/SignInScreen';
import {userConstants} from '../constants';

function mapStateToProps(state) {
  const {
    loggingIn = false,
    loggedIn = false,
    loggingFailure = false,
    loginFailureReason,
  } = state.authentication;

  const {
    fetchRemoteFailureError = false,
    fetchRemoteFailureReason,
  } = state.initialData

  return {
    loggingIn,
    loggedIn,
    loggingFailure,
    loginFailureReason,
    fetchRemoteFailureError,
    fetchRemoteFailureReason
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginUser: (username, password) => {
      dispatch(userActions.loginUser(username, password))
    },
    onLogOut: () => {
      dispatch(userActions.logOut())
    }
  }
}

const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen)

export default LoginPageContainer;
