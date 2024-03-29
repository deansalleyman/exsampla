import { filter, mapTo, mergeMap, tap, switchMap,catchError, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of , from} from 'rxjs'
import { ajax } from 'rxjs/ajax';
import {userActions, appActions, researchActions} from '../actions/';
import { researchConstants} from '../constants';
import keys from 'lodash/keys';
import md5 from 'md5';
import isUndefined from 'lodash/isUndefined';
import settings from '../../../../config/settings';

// loop through the outstanding sessions, each time the result returns back which will in turn delete the item 

const publishResearchEpic = ( action$ , state$ ) => action$.pipe(
  filter(action => action.type === researchConstants.SUBMIT),
  switchMap(item => {
    const {research:{answerSet:sessionKeys}} = state$.value;
    return from(Object.keys(sessionKeys))
  }),
  mergeMap(session => {
      const {authentication:{user, cookie}} = state$.value;
      const {research:{answerSet}} = state$.value;
      const {initialData:{ data: {meta:{undefined:{version}={}}={}}={} }={}}= state$.value;



      const dataSet = answerSet[session] || {};
      delete dataSet.start;
      delete dataSet.end;
      dataSet.timestamp = session;
      dataSet.version = version;
      
      const postVars = {
        id: session,
        username: user,
        cookie: cookie,
        data: JSON.stringify(dataSet)
      };



      const postOptions = {
          url: settings.api + 'put',
          method: 'POST',
          responseType: 'text',
          headers: {
            'Content-Type': 'application/json'
         },
         body: postVars

      }


        return ajax(postOptions).pipe(
          switchMap(response => {
            const {response:responseStatus, status} = response;
            if (responseStatus && status == 200){
              return of(researchActions.postResearch(session));
            } else {
              return of(researchActions.postResearchFailure({error: `could not post research session: ${session}`, response: responseStatus }))
            }

            }),
            catchError(error => {
              console.log('catchError A', error);
              return of(researchActions.postResearchFailure({
                error: `could not post research session: ${session}`,
              response: error.xhr.response}))
            })
        )


  }),
  catchError(error => {
    console.log('catchError B', error);
    return of(researchActions.postResearchFailure({error: `could not post research session: ${session}` }))
  })

  );


export default publishResearchEpic;