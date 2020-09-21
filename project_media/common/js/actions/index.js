import {
  userConstants,
  dataConstants,
  appConstants,
  researchConstants,
  notificationConstants,
} from '../constants';
let nextTodoId = 0

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const fetchInitialData = user => ({
  type: dataConstants.FETCH_INITIAL_DATA,
  user
})

export const setInitialData = payload => ({
  type: dataConstants.SET_INITIAL_DATA,
  payload,
  receivedAt: new Date().getTime()
})

const loginUser = (user, password, cookie) => ({
  type: userConstants.LOGIN_REQUEST,
  user,
  password,
  cookie
})

const logOut = () => ({
  type: userConstants.LOGOUT
})

const request = user => ({type: userConstants.LOGIN_REQUEST, user});
const success = (user, cookie) => ({
  type: userConstants.LOGIN_SUCCESS,
  user,
  cookie,
});
const failure = (error, payload) => ({
  type: userConstants.LOGIN_FAILURE,
  error,
  payload,
});

export const userActions = {
  loginUser,
  request,
  success,
  failure,
  logOut
};

export const dataActions = {
  fetchRemoteFailure,
  fetchRemoteLoading
}

const addAnswer = (answer, id) => ({
  type: researchConstants.ADD_ANSWER,
  answer,
  id
})

const setSessionId = id => ({
  type: researchConstants.SET_SESSION,
  id
})

const completeResearch = payload => ({
  type: researchConstants.COMPLETE,
  payload
})
const postResearch = payload => ({
  type: researchConstants.POST_RESEARCH,
  payload
})
const postResearchLoading = payload => ({
  type: researchConstants.POST_RESEARCH_LOADING,
  payload
})
const postResearchFailure = payload => ({
  type: researchConstants.POST_RESEARCH_FAILURE,
  payload
})

const scriptCommand = payload => ({
  type: researchConstants.SCRIPT_COMMAND,
  payload
})

const session = state => ({
  type: researchConstants.SESSION,
  state
})

const submit = () => ({
  type: researchConstants.SUBMIT
})

export const researchActions = {
  fetchInitialData,
  addAnswer,
  completeResearch,
  postResearch,
  postResearchLoading,
  postResearchFailure,
  setSessionId,
  scriptCommand,
  session,
  submit
}

const initiateSchedule = (startStop = true) => ({
  type: notificationConstants.INITIATE_SCHEDULE,
  startStop
})

const scheduleNotification = (
  date,
  title,
  message,
  playSound = true,
  soundName = 'default'
) => ({
  type: notificationConstants.SCHEDULE_NOTIFICATION,
  date,
  title,
  message,
  playSound,
  soundName
})

const notificationActioned = payload => ({
  type: notificationConstants.NOTIFICATION_ACTIONED,
  payload
})

const notificationSave = payload => ({
  type: notificationConstants.NOTIFICATION_SAVE,
  payload
})

const cancelSchedule = payload => ({
  type: notificationConstants.CANCEL_SCHEDULE,
  payload
})

const cancelLocalNotification = id => ({
  type: notificationConstants.CANCEL_LOCAL_NOTIFICATION,
  id
})

const userPermissionsResponse = payload => ({
  type: notificationConstants.USER_PERMISSIONS_RESPONSE,
  payload
})

export const notificationActions = {
  scheduleNotification,
  initiateSchedule,
  notificationActioned,
  notificationSave,
  cancelSchedule,
  userPermissionsResponse,
  cancelLocalNotification
}

const fetchRemoteLoading = payload => ({
  type: dataConstants.FETCH_REMOTE_LOADING,
  payload
})

const fetchRemoteFailure = (error, payload) => ({
  type: dataConstants.FETCH_REMOTE_FAILURE,
  error,
  payload
})

export const setCurrentItem = currentItem => ({
  type: 'SET_CURRENT_ITEM',
  currentItem
})

export const addPersistor = persistor => ({
  type: appConstants.ADD_PERSISTOR,
  persistor
})

export const currentResearchPage = id => ({
  type: appConstants.CURRENT_RESEARCH_PAGE,
  id
})

export const close = () => ({
  type: appConstants.CLOSE
})

export const reset = () => ({
  type: appConstants.PURGE
})

export const appActions = {
  currentResearchPage,
  close,
  addPersistor,
  reset
};
