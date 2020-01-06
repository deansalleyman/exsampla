import { setRemoteData , fetchRemoteData} from '../actions'

const remoteData = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case 'FETCH_REMOTE_DATA':
      return Object.assign({}, state, {
        isFetching: true
      })
    case 'SET_REMOTE_DATA':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data || [],
        lastUpdated: action.receivedAt
      })
    default:

      return state
  }
}

export default remoteData
