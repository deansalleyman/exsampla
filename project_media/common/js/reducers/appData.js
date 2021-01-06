import {appConstants} from '../constants';

import {loadState} from '../localStorage';

const initialState = {currentResearchPage: 1};

const appData = (state = initialState, action) => {
  switch (action.type) {
    case appConstants.CURRENT_RESEARCH_PAGE:
      return Object.assign({}, state, {
        currentResearchPage: action.id
      });
    case appConstants.CLOSE:
      // Reset the app state to begining
      return Object.assign({}, state, {
        currentResearchPage: 1
      });
    case appConstants.ADD_PERSISTOR:
      // Reset the app state to begining
      return Object.assign({}, state, {
        persistor: action.persistor
      });
    case appConstants.PURGE_DATA:
      // Reset the app state to begining
      return {
        currentResearchPage: null
      };

    default:
      return state
  }
}

export default appData;
