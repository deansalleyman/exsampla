import {userConstants, appConstants} from '../constants';

import {loadState} from '../localStorage';

const initialState = {
  loggingIn: false,
  loggedIn: false,
  loggingFailure: false,
  fetchRemoteFailureError: false
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loggingIn: false,
        loggingFailure: false,
        user: action.user,
        cookie: action.cookie
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggingFailure: true,
        loggingIn: false,
        loggedIn: false,
        loginFailureReason: action.payload,
        loginFailureError: action.error
      };
    case userConstants.LOGOUT:
      return {
        loggingIn: false,
        loggedIn: false,
        loggingFailure: false,
        fetchRemoteFailureError: false,
        user: undefined
      };
    case appConstants.PURGE:
      // Reset the app state to begining
      return {
        loggingIn: false,
        loggedIn: false,
        loggingFailure: false,
        fetchRemoteFailureError: false,
        user: undefined
      };

    default:
      return state
  }
}

export default authentication;
