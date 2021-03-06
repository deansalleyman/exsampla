import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { initial } from 'lodash';
import {AppState} from 'react-native';

export default class NotificationService {
  //onNotificaitn is a function passed in that is to be called when a
  //notification is to be emitted.
  constructor(onRegister, onNotification) {
    this.configure(onRegister, onNotification)
    this.lastId = 0;
    this.backgroundNotification;


    this.init();
  }

  init(){

    PushNotification.createChannel(
      {
        channelId: "exsampla-id", // (required)
        channelName: "exsampla channel", // (required)
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
try {
  PushNotificationIOS.setNotificationCategories([
    {
      id: 'userAction',
      actions: [
        {
          id: 'dismiss',
          title: 'Dismiss',
          options: { foreground: true }
        },
        {
          id: 'snooz',
          title: 'Snooz',
          options: { foreground: true },
        },
      ],
    },
  ]);
  
} catch (error) {
  
}



  
  }

  configure(onRegister, onNotification) {
    PushNotification.configure({
      onRegister: onRegister,
      onNotification: function(notification) {


        if (typeof onNotification == 'function') {
          onNotification(notification)
        }

        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        notification.finish(PushNotificationIOS.FetchResult.NoData)
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: false,
      requestPermissions: Platform.OS === 'ios',
      allowWhileIdle: true,
      /* iOS and Android properties */
      title: 'My Notification Title A', // (optional)
      message: 'My Notification Message A', // (required)
    })

    PushNotification.popInitialNotification((notification) => {
      onNotification(notification);
    });
  }

  //Appears right away
  localNotification() {
    this.lastId++
    PushNotification.localNotification({
      title: 'Local Notification',
      message: 'My Notification Message',
      playSound: false,
      soundName: 'default',
      actions: '["Yes", "No"]',
    })
  }

  //Appears after a specified time. App does not have to be open.
  /**
   *
   * @param {Data} date : default //30 seconds
   */
  scheduleNotification({
    date = new Date(Date.now() + (3 * 1000)),
    title = "Scheduled Notification",
    message = "My Notification Message",
    playSound = true,
    soundName = 'default',
    timeslot = 0
  }) {

    this.lastId++
    PushNotification.localNotificationSchedule({
      id: '' + this.lastId,
      date,
      title,
      message,
      playSound,
      soundName,
      channelId: 'exsampla-id',
      userInfo: {timeslot:timeslot},
      allowWhileIdle: true,
      timeoutAfter: 30000
    })

    return ({id: this.lastId, timeslot})
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk)
  }

  requestPermissions() {
    return PushNotification.requestPermissions()
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({id: '' + this.lastId});
  }

  cancelLocalNotificationId({id}) {
    PushNotification.cancelLocalNotifications({id: '' + id});
  }
  cancelAll() {

    PushNotification.cancelAllLocalNotifications();

  }

  clearActioned(id) {
    if(id){
      PushNotification.cancelLocalNotifications({id: id});
    }

    PushNotification.removeAllDeliveredNotifications();

  }

  getScheduledLocalNotifications(callback) {
    try {
      PushNotification.getScheduledLocalNotifications(callback)
    } catch (error) {
      callback([])
    }
  }
}
