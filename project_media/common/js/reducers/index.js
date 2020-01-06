import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import remoteData from './remoteData';
import initialData from './initialData';
import authentication from './authentication';
import appData from './appData';
import research from './research';

export default combineReducers({
  todos,
  visibilityFilter,
  remoteData,
  initialData,
  authentication,
  appData,
  research
})