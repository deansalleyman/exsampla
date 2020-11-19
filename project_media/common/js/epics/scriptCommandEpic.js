import { filter, mapTo, mergeMap, tap, switchMap, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax';
import {fetchRemoteData, setRemoteData, userActions, appActions, researchActions} from '../actions/';
import { researchConstants} from '../constants';
import keys from 'lodash/keys';
import md5 from 'md5';
import isUndefined from 'lodash/isUndefined';
import settings from '../../../../config/settings';

const scriptCommandEpic = (action$, state$) => action$.pipe(
    filter(action => action.type === researchConstants.SCRIPT_COMMAND),
    switchMap((action)=> {
      const actionReturn = [];
      /**
       * payload:
          id: "save"
          script:[
          save: {var: "focussed", answer: 1},   
          goto: {id: "5"}
        ]

        payload: 

        id: "saveFatigued"

        script:[
        {save: {var: "fatigued", answer: 45}}
        {goto_if: {condition: "timeslot=3", id: "111"}}
        {submit: {}}
        {goto: {id: "113"}}
        ]
       */
      const {id, script:scripts} = action.payload;
      const {notifications:{notificationActioned:{data:{timeslot} ={}}={}}} = state$.value;



        // loop through here allowing escape clause for goto_if 
        for (let i = 0; i < scripts.length; i++ ) {
          
          const item = scripts[i];
          
          const [theKey = '']= keys(item);
          const theTarget = item[theKey];
          const {var:varId = '', answer, id:pageId, state:timerState, condition='false'} = theTarget;



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

          if(theKey == 'goto_if'){

            // clean up and convert to javascript notation
            const testCondition = condition.replace(/=/gi,'==');


          
            if(eval(testCondition)) {

              actionReturn.push(appActions.currentResearchPage(pageId));
              break;
            } 

          }


          if(theKey == 'goto'){

            // test here if is number or not

            actionReturn.push(appActions.currentResearchPage(pageId));

          }

        }




    return of(...actionReturn);

    })

  );


export default scriptCommandEpic;