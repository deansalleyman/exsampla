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
  cancelLocalNotificationIdEpic
} from './notificationEpic';
import notificationScheduleEpic from './notificationScheduleEpic';
import notificationHandleEpic from './notificationHandleEpic';
import {logOutEpic, setUpSessionEpic, surveyNotNotificationEpic, loginFailureEpic} from './appEpic';

const rootEpic = combineEpics(
  fetchInitialDataEpic,
  scriptCommandEpic,
  publishResearchEpic,
  notificationEpic,
  notificationScheduleEpic,
  notificationActionedEpic,
  cancelLocalNotificationIdEpic,
  cancelScheduleEpic,
  userPermissionsResponseEpic,
  notificationHandleEpic,
  logOutEpic,
  cancelScheduleLogOutEpic,
  setUpSessionEpic,
  loginFailureEpic
);

export default rootEpic;
