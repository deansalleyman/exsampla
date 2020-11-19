import {
  filter,
  mapTo,
  mergeMap,
  tap,
  switchMap,
  catchError,
  map,
  ignoreElements,
} from 'rxjs/operators';
import {userConstants, appConstants} from '../constants';
import {notificationActions} from '../actions/';

export const logOutEpic = (action$, state$) =>
  action$.pipe(
    filter(action => action.type === userConstants.LOGOUT),
    tap(() => state$.value.appData.persistor.purge()),
    map(() => notificationActions.cancelSchedule(true))
  )
