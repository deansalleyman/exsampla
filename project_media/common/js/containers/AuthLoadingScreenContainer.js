import {connect} from 'react-redux'
import {userActions} from '../actions'
import AuthLoadingScreen from '../components/AuthLoadingScreen';
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

const AuthLoadingScreenContainer = connect(mapStateToProps)(AuthLoadingScreen)

export default AuthLoadingScreenContainer;
