import { filter, mapTo, mergeMap, tap, switchMap,catchError, map,repeat, delay,take,withLatestFrom  } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of , from} from 'rxjs'
import { ajax } from 'rxjs/ajax';
import {notificationActions, appActions} from '../actions/';
import { notificationConstants } from '../constants';
import keys from 'lodash/keys';
import isUndefined from 'lodash/isUndefined';
import settings from '../../../../config/settings';


const notificationHandleEpic = ( action$ , state$ ) => action$.pipe(
    filter(action => action.type === notificationConstants.NOTIFICATION_ACTIONED),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {

      const {initialData:{ data: {meta:{undefined:{start_page='1', alert_page='100'}={}}={}}={} }={}}= state;
      const {id} = action.payload;
      const startPage = parseInt(start_page,10);
      const alertPage = parseInt(alert_page,10);

      return of(appActions.currentResearchPage(alertPage), notificationActions.cancelLocalNotification(id));
    })
)

export default notificationHandleEpic;