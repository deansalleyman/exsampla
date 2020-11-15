import { filter, mapTo, mergeMap, tap, switchMap,catchError, map,repeat, delay,take  } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of , from} from 'rxjs'
import { ajax } from 'rxjs/ajax';
import {notificationActions} from '../actions/';
import { notificationConstants } from '../constants';
import keys from 'lodash/keys';
import isUndefined from 'lodash/isUndefined';
import random from 'lodash/random';
import settings from '../../../../config/settings';
import moment from 'moment';

const now = moment();

/**
 * For the pilot study - the whole study will last 14 days - 
 * for the whole of that time participants will be able to record their meditation practice & answer practice follow-up questions. 
 * From day 7 to 14 they will receive the notifications (3 random alerts per day as we discussed).
 *  So notifications are planned to run over 7 days.

This will change for the next (main) study; while it's not confirmed yet, it may be something like 3 sets of 5 days of notifications, punctuated by several days of no notifications. Alternatively, it could end up being as simple as a run of 10-14 days. Sorry I can't be more specific as yet, but we need to see the results of the pilot before finally deciding.
 * 1st alert between 9am - 12 noon; 
 * 2nd 12 - 5pm; 
 * 3rd 5 - 9pm. 
 * All alerts were randomised between those times and were at least 90 mins apart
 * 
 */


const {notifications:{title, message, dayRanges, minGap=90}={}}= settings;

/**
 * 
 * @param {*} state 
 * alert_page: "100"
    author: "Stormwave Digital Design"
    logo: "john-moores.png"
    phase2_end: "14"
    phase2_mod: "28"
    phase2_start: "7"
    start_page: "1"
    alert_page: "100"
    terms: "<b>Please read this information carefully. By tapping “I Agree” below you confirm that:</b><br/><br/><ul><li>The nature & purpose of thi…"
    title: "This research study aims to investigate the long-term effects of meditation practice."
    version: "1"
 */
  function dateArrayFn(state){
    const {initialData:{data:{meta:{undefined:metaObj}={}}={}}={}} = state;
   const{phase2_end = "14",
    phase2_mod =  "28",
    phase2_start = "7"} = metaObj;

    const phase2End = parseInt(phase2_end,10);
    const phase2Mod = parseInt(phase2_mod,10);
    const phase2Start = parseInt(phase2_start,10);


    console.log('dateArrayFn', metaObj);
    const dateArray = [];

    for (let i= phase2Start; i < phase2End; i++) {
      // loop through each day in range 
        const theday = now.clone();
        // reset hours to morning
        theday.hour(0).minute(0);
        theday.add(i, 'days');
    
    
    
    
       const dayScheduleFormated =  dayRanges
       .map((item) => theday.hour(random(...item)).minute(random(0,59)).clone())
       .filter((item)=>{ 

         if (i){
          //  dont schedule a notification for today
          return true;
         } else if(item.isAfter(now)) {
          //  unless it's scheduled for later than 1st initialization
          return true;
         }
        })
       .reduce((accumulator,currentValue,currentIndex) => {
         console.log('accumulator', currentValue,currentIndex)
          if(accumulator.length){
            // Work out duration from last entry 
            const prevTime = accumulator[currentIndex-1].date;
            const durationLastEntry = moment.duration(currentValue.diff(prevTime)).asMinutes();
            if ( durationLastEntry <= minGap){
              // find the gap
              const halfDur = Math.round((minGap - durationLastEntry)/2);
              // minus time from previous time
              prevTime.subtract(halfDur, 'minutes');
              // Add time to next time
              currentValue.add(halfDur, 'minutes');
            }
          }
        accumulator.push({date:currentValue, timeslot: (currentIndex + 1)});
    
        return accumulator;
        },[])
        .map((item) => ({date:item.date.toDate(), timeslot: item.timeslot}));
    
    
    
        dateArray.push(...dayScheduleFormated);
    
      }

      return dateArray;
  }




const notificationScheduleEpic = ( action$ , state$ ) => action$.pipe(
    filter(action => action.type === notificationConstants.INITIATE_SCHEDULE),
    take(1),
    tap(item => notificationActions.cancelSchedule()),
    switchMap(item => from(dateArrayFn(state$.value))),
    tap(item => console.log('Time Schedule', item)),
    map(({date, timeslot })=> notificationActions.scheduleNotification(
        {date,
        title,
        message,
        timeslot
        }))
)

export default notificationScheduleEpic;