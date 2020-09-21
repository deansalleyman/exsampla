import {setInitialData, fetchInitialData} from '../actions';
import {dataConstants, appConstants} from '../constants';

import {loadState} from '../localStorage';
import settings from '../../../../config/settings';

const initialState = {
  isFetching: false,
  dataLoaded: false,
  data: {},
  fetchRemoteFailureError: false
}

const initialData = (state = initialState, action) => {
  switch (action.type) {
    case dataConstants.FETCH_INITIAL_DATA:
      return Object.assign({}, state, {
        isFetching: true
      })
    case dataConstants.SET_INITIAL_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        dataLoaded: true,
        fetchRemoteFailureError: false,
        data: action.payload || {},
        lastUpdated: action.receivedAt
      })

    case dataConstants.FETCH_REMOTE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        fetchRemoteFailureReason: action.payload,
        fetchRemoteFailureError: action.error
      })

    case appConstants.PURGE:
      // Reset the app state to begining
      return {
        isFetching: false,
        dataLoaded: false,
        data: {},
        fetchRemoteFailureError: false
      };

    default:
      return state
  }
}

export default initialData
