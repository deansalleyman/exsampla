import {combineEpics} from 'redux-observable';
import fetchInitialDataEpic from './fetchInitialDataEpic';
import scriptCommandEpic from './scriptCommandEpic';
import publishResearchEpic from './publishResearchEpic';
import {
  notificationEpic,
  notificationActionedEpic,
  userPermissionsResponseEpic,
  cancelScheduleEpic,
  cancelScheduleLogOutEpic,
} from './notificationEpic';
import notificationScheduleEpic from './notificationScheduleEpic';
import notificationHandleEpic from './notificationHandleEpic';
import {logOutEpic} from './appEpic';

const rootEpic = combineEpics(
  fetchInitialDataEpic,
  scriptCommandEpic,
  publishResearchEpic,
  notificationEpic,
  notificationScheduleEpic,
  notificationActionedEpic,
  cancelScheduleEpic,
  userPermissionsResponseEpic,
  notificationHandleEpic,
  logOutEpic,
  cancelScheduleLogOutEpic
);

export default rootEpic;
