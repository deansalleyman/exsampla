import {notificationConstants, appConstants} from '../constants';

// INITIATE_SCHEDULE:'NOTIFICATION_INITIATE_SCHEDULE',
// SCHEDULE_NOTIFICATION: 'NOTIFICATION_SCHEDULE_NOTIFICATION',
// NOTIFICATION_ACTIONED: 'NOTIFICATION_NOTIFICATION_ACTIONED',
// NOTIFICATION_SAVE: 'NOTIFICATION_NOTIFICATION_SAVE',
// CANCEL_SCHEDULE:'NOTIFICATION_CANCEL_SCHEDULE',
// USER_PERMISSIONS_RESPONSE: 'USER_PERMISSIONS_RESPONSE'

const initialState = {
  scheduleRunning: false,
  notificationsScheduled: {}
};

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case notificationConstants.INITIATE_SCHEDULE:
      return {
        scheduleRunning: action.payload
      };
    case notificationConstants.NOTIFICATION_SAVE:
      const {notificationsScheduled:tempObj = {}} = state;

      const notificationsScheduled = Object.assign({}, tempObj);

      notificationsScheduled[action.payload.id] = action.payload;

      return Object.assign({}, state, {
        notificationsScheduled
      })
    case notificationConstants.NOTIFICATION_ACTIONED:
      
      return Object.assign({}, state, {
        notificationActioned: action.payload
      })
    case notificationConstants.CANCEL_SCHEDULE:
      return Object.assign({}, state, {
        scheduleRunning: false,
        notificationsScheduled: {}
      })
    case notificationConstants.USER_PERMISSIONS_RESPONSE:
      return Object.assign({}, state, {
        userPermissionsResponse: action.payload
      })
    case appConstants.PURGE:
      // Reset the app state to begining
      return {
        scheduleRunning: false,
        notificationsScheduled: {}
      };
    default:
      return state
  }
}

export default notifications;
