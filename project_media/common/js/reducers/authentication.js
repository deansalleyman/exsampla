import { userConstants } from '../constants';

import { loadState } from '../localStorage';

const {authentication:initialState = {}} = loadState() || {};

console.log('authentication', initialState)

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
        user: action.user,
        cookie: action.cookie
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggingIn: false,
        loggedIn: false,
        loginFailureReason: action.payload,
        loginFailureError: action.error
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}

export default authentication