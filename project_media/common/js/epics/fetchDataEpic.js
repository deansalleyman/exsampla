import { filter, mapTo, mergeMap, tap, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {fetchRemoteData, setRemoteData, userActions} from '../actions/'
import md5 from 'md5';

const fetchDataEpic = action$ => action$.pipe(

    filter(action => action.type === 'LOGIN_USER'),
    //tap(item => console.log('tap passed', item)),
    mergeMap(action =>{
        return ajax.getJSON(`https://jsonplaceholder.typicode.com/todos/${action.range}`).pipe(
          map(response => setRemoteData(response))
        )
    }
      )
  );


export default fetchDataEpic;