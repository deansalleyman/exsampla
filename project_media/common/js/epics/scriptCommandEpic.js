import { filter, mapTo, mergeMap, tap, switchMap, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax';
import {fetchRemoteData, setRemoteData, userActions, appActions, researchActions} from '../actions/';
import { researchConstants} from '../constants';
import keys from 'lodash/keys';
import md5 from 'md5';
import isUndefined from 'lodash/isUndefined';

const scriptCommandEpic = action$ => action$.pipe(
  tap(item => console.log('tap passed action', item)),
    filter(action => action.type === researchConstants.SCRIPT_COMMAND),
    tap(item => console.log('tap passed script', item)),
    switchMap((action)=> {
      const actionReturn = [];
      /**
       * payload:
          id: "save"
          script:[
          save: {var: "focussed", answer: 1},   
          goto: {id: "5"}
        ]
       */
      const {id, script:scripts} = action.payload;

      // start_session?
      // if(id == 'save' || id == 'start_session'){


        scripts.map((item)=>{
          const [theKey = '']= keys(item);
          const theTarget = item[theKey];
          const {var:varId = '', answer, id:pageId, state:timerState} = theTarget;

          if(theKey == 'save' && !isUndefined(answer)){

            actionReturn.push( researchActions.addAnswer(answer,varId));

          }

          if(theKey == 'timer'){
            const session = Date.now();
            if(timerState == 'start'){
              actionReturn.push(researchActions.setSessionId(session));
            }



            actionReturn.push( researchActions.session(timerState));
          }


          if(theKey == 'submit'){
            actionReturn.push( researchActions.submit());
          }

          if(theKey == 'close'){
            actionReturn.push(appActions.close());
          }



          if(theKey == 'goto'){
            // test here if is number or not

            actionReturn.push(appActions.currentResearchPage(pageId));

          }

          console.log('mapped Scripts', item,  theTarget);
          return item;
        });

      // }

    //return appActions.currentResearchPage('2');

    return of(...actionReturn);

    })

  );


export default scriptCommandEpic;