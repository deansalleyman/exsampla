import { filter, mapTo, mergeMap, tap, switchMap,catchError, map,ignoreElements } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of , from, BehaviorSubject, Subject} from 'rxjs'
import { ajax } from 'rxjs/ajax';
import {notificationActions} from '../actions/';
import { notificationConstants, appConstants, userConstants } from '../constants';
import keys from 'lodash/keys';
import isUndefined from 'lodash/isUndefined';
import settings from '../../../../config/settings';
import {AppState} from 'react-native';

import NotificationService from '../services/NotificationService';


function appOpenedByNotificationTap(notification) {
  // This is your handler. The tapped notification gets passed in here.
  // Do whatever you like with it.
  console.log('appOpenedByNotificationTap',notification);
}

// PushNotificationIOS.getInitialNotification().then(function (notification) {
//   if (notification != null) {
//     appOpenedByNotificationTap(notification);
//   }
// });

let backgroundNotification;

// PushNotificationIOS.addEventListener('notification', function (notification) {
//   if (AppState.currentState === 'background') {
//     backgroundNotification = notification;
//   }
// });

AppState.addEventListener('change', function (new_state) {
  console.log('AppState.addEventListener', new_state)
  if (new_state === 'active' && backgroundNotification != null) {
    appOpenedByNotificationTap(backgroundNotification);
    backgroundNotification = null;
  }
});


// Called when a remote or local notification is opened or received
const onNotification = (notif) => {


  onNotificationFn$.next(notif);
}

// Called when Token is generated (iOS and Android)
const onRegister = (token) => {


  onRegister$.next(token);
}



const onNotificationFn$ = new Subject();
const onRegister$ = new Subject();
const userPermissionsResponse$  = new Subject();

const notification = new NotificationService(onRegister,onNotification);


//Permissions to use notifications
function handlePerm(perms) {
  userPermissionsResponse$.next(perms);


}


export const cancelScheduleEpic = ( action$ , state$ ) => action$.pipe(
  filter(action => action.type === notificationConstants.CANCEL_SCHEDULE),
  tap(item => console.log('cancelScheduleEpic')),
  tap(item => notification.cancelAll()),
  ignoreElements()
)

export const cancelScheduleLogOutEpic = ( action$ , state$ ) => action$.pipe(
  filter(action => action.type === userConstants.LOGOUT),
  tap(item => notification.cancelAll()),
  ignoreElements()
)

export const cancelLocalNotificationIdEpic = ( action$ , state$ ) => action$.pipe(
  filter(action => action.type === notificationConstants.CANCEL_LOCAL_NOTIFICATION),
  tap(({id}) => notification.clearActioned(id)),
  ignoreElements()
)



/**
 * 
 * @param {*} action$ 
 * @param {*} state$ 
 * 
 * Notification object example:
 * {
    foreground: false, // BOOLEAN: If the notification was received in foreground or not
    userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
    message: 'My Notification Message', // STRING: The notification message
    data: {}, // OBJECT: The push data
}
 */

export const notificationActionedEpic = ( action$ , state$ ) => onNotificationFn$.pipe(
  tap((ret)=> {
     console.log('notificationActionedEpic', ret)

  }),
  map(notificationActions.notificationActioned)
)




export const userPermissionsResponseEpic = ( action$ , state$ ) => userPermissionsResponse$.pipe(
  map(notificationActions.userPermissionsResponse)
)


export const notificationEpic = ( action$ , state$ ) => action$.pipe(
   
    filter(action => action.type === notificationConstants.SCHEDULE_NOTIFICATION),
    tap(()=> {
      notification.getScheduledLocalNotifications((ret)=> console.log('getScheduledLocalNotifications', ret))
 
    }),
    map((payload={}) => notification.scheduleNotification(payload)),
    map(notificationActions.notificationSave)
)

