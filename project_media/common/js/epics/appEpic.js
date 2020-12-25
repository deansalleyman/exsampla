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
import {notificationActions, researchActions} from '../actions/';

export const logOutEpic = (action$, state$) =>
  action$.pipe(
    filter(action => action.type === userConstants.LOGOUT),
    tap(() => state$.value.appData.persistor.purge()),
    map(() => notificationActions.cancelSchedule(true))
  )

  export const setUpSessionEpic = (action$, state$) =>
  action$.pipe(
    filter(action => action.type === appConstants.CURRENT_RESEARCH_PAGE),
    filter(({id}) => {
      const {initialData:{ data: {meta:{undefined:{start_page,alert_page}={}}={}}={} }={}}= state$.value;

      return (id == (+start_page+1));
    }),
    map(() => {
      const session = Date.now().toString();
      return researchActions.setSessionId(session);

    })
  )
  export const loginFailureEpic = (action$, state$) =>
  action$.pipe(
    filter(action => action.type === userConstants.LOGIN_FAILURE),
    tap(() => state$.value.appData.persistor.purge()),
    ignoreElements()
  )

 

