import {combineReducers} from 'redux';

import initialData from './initialData';
import authentication from './authentication';
import appData from './appData';
import research from './research';
import notifications from './notifications';
import {persistReducer, createMigrate} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import AsyncStorage from '@react-native-community/async-storage';
import expireReducer from '../utils/expire-reducer';
import settings from '../../../../config/settings';

const authenticationPersistConfig = {
  key: 'authentication',
  storage: AsyncStorage,
  blacklist: [
    'loggingFailure',
    'loginFailureReason',
    'fetchRemoteFailureError',
    'fetchRemoteFailureReason',
  ]
}
// Pull in settings for data expiry, default 30 days
const {surveyDataSource: {expireInDays = 30} = {}} = settings;



const rootReducer = combineReducers({
  initialData,
  authentication: persistReducer(authenticationPersistConfig, authentication),
  appData,
  research,
  notifications
})

const expireTransform = expireReducer('initialData', {
  expireDays: expireInDays,
  persistedAtKey: 'lastUpdated',
  expiredState: {
    isFetching: false,
    dataLoaded: false,
    data: {},
    fetchRemoteFailureError: false
  }
})

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['authentication'],
  transforms: [expireTransform],
  //stateReconciler: autoMergeLevel2
}

export default persistReducer(rootPersistConfig, rootReducer);
