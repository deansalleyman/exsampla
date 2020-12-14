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
  switchMap(item => from(state$.value.research.sessions)),
  switchMap(session =>{

      const {authentication:{user}} = state$.value;
      const {research:{answerSet}} = state$.value;

      const username = (user)? md5(user) : null;
      const dataSet = answerSet[session] || {};
      delete dataSet.start;
      delete dataSet.end;
      dataSet.timestamp = session;
      
      const postVars = {
        username,
        data: JSON.stringify(dataSet)
      };


      const postOptions = {
          url: settings.api + 'put',
          method: 'POST',
          responseType: 'text',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: postVars

      }


        return ajax(postOptions).pipe(
          mergeMap(response => {

            const {response:responseStatus} = response;

            if (responseStatus && responseStatus == 'Success'){
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