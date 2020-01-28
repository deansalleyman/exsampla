

import { userConstants, researchConstants } from '../constants';
import _ from 'lodash';
import { loadState } from '../localStorage';
import remove from 'lodash/remove';


const answerSetAdd = (state,action)=>{
  let returnVal = {};

  returnVal = Object.assign(
    state,
   {
      [action.id]: action.answer
    }
  );

  console.log('returnVal', returnVal, state,action);
  return returnVal
};




const {
  research:initialState = {
    answerSet:{}
  }
} = loadState() || {};



const research = (state = initialState, action) => {

  console.log('const',userConstants, researchConstants)

    switch (action.type) {
      case researchConstants.ADD_ANSWER:
        const answerSet = Object.assign({},state.answerSet);
        const currentAnswerSet = answerSet[state.currentSession] || {};

        answerSet[state.currentSession] = answerSetAdd(currentAnswerSet, action);

        return Object.assign({},
          state,
          {answerSet}
        );
      case researchConstants.SET_SESSION:
        const {sessions = []} = state;
        console.log('SET_SESSION');
        const newAnswerSet = {};
        newAnswerSet[action.id] = {};
        const newSessions = [...sessions, action.id];

          return Object.assign({},
            state,
            {
              sessions: newSessions,
              currentSession: action.id,
              answerSet: newAnswerSet
            }
          )
      case researchConstants.SCRIPT_COMMAND:

          console.log('SCRIPT_COMMAND');

        return Object.assign({}, state, {
        scriptCommand: action.payload
        })
      case researchConstants.SESSION:

        const answerSetSession = Object.assign({},state.answerSet);

        const currentAnswerSetSession = answerSetSession[state.currentSession] || {};

        currentAnswerSetSession[action.state] = Date.now();

        const {start, end = Date.now()} =  currentAnswerSetSession;

        currentAnswerSetSession.session = Math.floor((end - start)/1000);

        answerSetSession[state.currentSession] = currentAnswerSetSession;


        return Object.assign({},
          state,
          {answerSet: answerSetSession}
        );

      case researchConstants.POST_RESEARCH:
        console.log('researchConstants.POST_RESEARCH', action.payload)
        // Delete the session just posted succesfully 
        const answerSetStore = Object.assign({},state.answerSet);
        const sessionArray = [...state.sessions];

       const sessionsCleaned = remove(sessionArray, function(n) {
          return n == action.payload;
        });

        delete answerSetStore[action.payload];

        return Object.assign({},
          state,
          {
            answerSet:answerSetStore,
            sessions:sessionsCleaned
          }
        );


          
      default:
        return state
    }
  }
  
  export default research