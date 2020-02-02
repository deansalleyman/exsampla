import { setInitialData , fetchInitialData} from '../actions';
import { dataConstants } from '../constants';

import { loadState } from '../localStorage';

const {initialData:initialState = {
  isFetching: false,
  dataLoaded: false,
  data: {}
}} = loadState() || {};

console.log('initialData', initialState)


const initialData =  (state = initialState, action) => {

  switch (action.type) {
    case dataConstants.FETCH_INITIAL_DATA:
   console.log(action.type);
      return Object.assign({}, state, {
        isFetching: true
      })
    case dataConstants.SET_INITIAL_DATA:
   console.log('SET_INITIAL_DATA',action.type);
      return Object.assign({}, state, {
        isFetching: false,
        dataLoaded: true,
        data: action.payload || {},
        lastUpdated: action.receivedAt
      })

    case dataConstants.FETCH_REMOTE_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          fetchRemoteFailureReason: action.payload ,
          fetchRemoteFailureError: action.error
        })
    default:

      return state
  }
}

export default initialData
