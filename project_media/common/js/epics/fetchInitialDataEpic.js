import { filter, mapTo, mergeMap, switchMap,tap, map , catchError, concatMap} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax';
import {fetchInitialData, setInitialData, userActions, researchActions} from '../actions/';
import { normalize, schema } from 'normalizr';
import _ from 'lodash';
import isEmpty  from 'lodash/isEmpty';
import { userConstants, dataConstants } from '../constants';
import md5 from 'md5';
import settings from '../../../../config/settings';


const elementSchema= new schema.Entity('elementObject',undefined,{
  idAttribute: (entity, parent) => {
   // console.log('idAttribute',parent, entity);
    return `${parent.id}-${entity.name}`
  }
});

const scriptsSchema = new schema.Entity('scripts',{},{
  idAttribute: 'id'
  });

const logoSchema = new schema.Entity('logos');
const verticalSpaceSchema = new schema.Entity('vertical-spaces');			
const titleSchema = new schema.Entity('titles');
const buttonSchema = new schema.Entity('buttons',undefined,{
  idAttribute: 'title'
  });

  const linksSchema = new schema.Entity('links',undefined,{
    idAttribute: 'title'
    });

  const questionsSchema = new schema.Entity(
    'questions',
    {},
    {
      idAttribute: 'var',
      processStrategy:(value, parent, key)=> {
        //console.log('questionsSchema', value, parent);

        return  ({...value, ...{questionType: key}})
    }}
    )


  const questionSelectorSchema = new schema.Entity('questionSelector',{},{
    idAttribute: (value, parent, key) => {

      console.log('value', value, parent, key);
      return `${value.var}-${value.value}`;
    },processStrategy:(value, parent, key)=> {
     console.log('questionsSchema', value, parent, key);

      return  ({...value, ...{questionType: key}})
  }
    })
  

  const questionSelectorOptionSchema = new schema.Values(questionSelectorSchema);

 const elementsSchema = new schema.Entity('elements',{},
 {  idAttribute: (value, parent, key) => {

  //console.log('value', value, parent, key);
  return `page_${parent.id}`;
},processStrategy: (value, parent, key) => {

  const varElement = value.find((o) =>{ 
    const [firstObj={}] = Object.values(o);
    return firstObj.hasOwnProperty('var'); 
  }) || {};

  const groupCountReducer = (a,c,i)=>{
    const [theKey=''] = Object.getOwnPropertyNames(c);
  //  console.log('c',theKey, c)
    a[theKey] = a[theKey] || 0;
    a[theKey] = ++a[theKey];

    return a;
    //a[]
  }

  const grouped = value.reduce(groupCountReducer, {});

  const reMapData = (dataObject) => {
    const returnData = {...dataObject};

    if (dataObject.hasOwnProperty('title') && Array.isArray(dataObject.title)){
console.log('dataObject', dataObject.title);
    const [topTitle = {}, subTitle = {}] = dataObject.title;
    dataObject.title = topTitle;
    dataObject.subTitle = subTitle;

    }

    if(dataObject.typePage == 'questionElement'){

    }


    return returnData;
  }

  const arrayToObject = (array) =>
   array.reduce((accumulator,
        currentValue,
        currentIndex) => {


      const [theKey=''] = Object.getOwnPropertyNames(currentValue);
      console.log('arrayToObject item',theKey, currentValue);

      //const valueToPass = accumulator[typePage][theKey];
     // accumulator[typePage] = accumulator[typePage] || {};

     // accumulator[currentIndex] = accumulator[currentIndex] || {};
      accumulator[theKey] = accumulator[theKey] || ((grouped[theKey]>1)? [] : {});

      //accumulator[theKey] =  (grouped[theKey]>1)? accumulator[theKey].push(currentValue) : currentValue[theKey];
      //accumulator[currentIndex] =  currentValue;
      accumulator[theKey] =  (grouped[theKey]>1)? [...accumulator[theKey],currentValue] : currentValue;


      console.log('currentValue', grouped, currentValue)
     return accumulator;
   }, {})
// reduce the elemnts array down
const elementsObject = arrayToObject(value);

//switch on question type
const [{var:variable}={}] = Object.values(varElement);
const typePage = (variable)? 'questionElement': 'contentElement';

// Further map and reorder data
const remappeddata = reMapData({...elementsObject,...{typePage, ...(variable && {variable}), grouped}});

  console.log('value', remappeddata);
  return remappeddata;
 }});

const valuesSchema = new schema.Values({
  logos: logoSchema,
  links: linksSchema,
  'vertical-spaces': verticalSpaceSchema,
  titles: titleSchema,
  buttons: buttonSchema,
  button_bars: [buttonSchema],
  texts: questionsSchema,
  selectors: questionSelectorSchema,
  v_sliders: questionsSchema
}, (input, parent, key) => {
  //console.log('key',input, parent,key);
  return `${key}s`;
});



const pageSchema = new schema.Entity('pagesObject',{
  elements: [valuesSchema]
},{processStrategy: (value, parent, key) => {

 // console.log('value', value, parent, key);
  return value;
}});

const pageElementsSchema = new schema.Entity('pageElements',{
  elements: elementsSchema
});

const scriptsListSchema = new schema.Array(scriptsSchema);

 const metaSchema =  new schema.Entity('meta',{},{
  idAttribute: 'version'
  });

// Define your comments schema
// const comment = new schema.Entity('comments', {
//   commenter: user
// });

// Define your article
const pageData = {
  pages:{page: [pageElementsSchema]},
  meta: metaSchema,
  scripts: scriptsListSchema
};

const returnedData = {
  data:pageData
}


const fetchInitialDataEpic = action$ => action$.pipe(

    filter(action => action.type === userConstants.LOGIN_REQUEST || action.type === dataConstants.FETCH_INITIAL_DATA),
   // tap(item => console.log('tap passed', item)),
   map(action => {

    console.log('map fetchInitialDataEpic action', action, 44643154);
    const {user, password:passwordText, cookie} = action;
    const password = (passwordText)?  md5(passwordText) : undefined;
    return ({
      user,
      username: md5(user),
      ...(password && {password}),
      ...(cookie && {cookie})
    });
  }),
  switchMap(loginOptions =>{

      


      const postOptions = {
          url: settings.api + 'login.php',
          method: 'POST',
          responseType: 'json',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: loginOptions

      }

        return ajax(postOptions).pipe(
          mergeMap(response => {
            console.log('responseText', response)

            if (response && response.response ){
              const normalizedData = normalize(response.response, returnedData);
              console.log('normalized', normalizedData);

              const {entities: intialdataObj={}} = normalizedData;
              const {result:{cookie=''}} = normalizedData;
              const {user} = loginOptions;
             
             // change to logged in user action

            if(cookie && !isEmpty(intialdataObj)){
              console.log('thinks intial login with cookie', intialdataObj, cookie);
              return of(setInitialData(intialdataObj), 
              userActions.success(user, cookie));

            } else if(!cookie && !isEmpty(intialdataObj)){
              console.log('thinks has data', response);
              return of(setInitialData(intialdataObj),
              userActions.failure(true,'Login Failed'));
            }else {
              console.log('thinks has no data and login incorrect', intialdataObj);
              return of(userActions.failure(true,'Login Failed'));
            }



            } else {

              return of({
                type: dataConstants.FETCH_REMOTE_FAILURE,
                payload: 'No Data returned',
                error: true
                  })
            }

            }),
            catchError(error => {
              console.log('catchError A', error);
              return of({
              type: userConstants.LOGIN_FAILURE,
              payload: error.xhr.response,
              error: true
                }
              )}
            )
        )
    }
      ),
      catchError(error => {
        console.log('catchError B', error);
        return of({
        type: dataConstants.FETCH_REMOTE_FAILURE,
        payload: error,
        error: true
          })
        })
  );


export default fetchInitialDataEpic;