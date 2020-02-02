import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import initialData from './initialData';
import authentication from './authentication';
import appData from './appData';
import research from './research';

export default combineReducers({
  todos,
  visibilityFilter,
  initialData,
  authentication,
  appData,
  research
})