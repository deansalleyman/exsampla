import { appConstants } from '../constants';

import { loadState } from '../localStorage';

const {appData:initialState = {currentResearchPage: 1}} = loadState() || {};

console.log('appData', initialState)

const appData = (state = initialState, action) => {
  switch (action.type) {
    case appConstants.CURRENT_RESEARCH_PAGE:
      return {
        currentResearchPage: action.id
      };
    case appConstants.CLOSE:
      // Reset the app state to begining 
      return {
        currentResearchPage: 1
      };

    default:
      return state
  }
}

export default appData