/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import settings from './config/settings';

import React, {useEffect} from 'react';
import {Alert} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AuthLoadingScreenContainer from './project_media/common/js/containers/AuthLoadingScreenContainer';
import LoginPageContainer from './project_media/common/js/containers/LoginPageContainer';
import PageResearchContainer from './project_media/common/js/containers/PageResearchContainer';
import {
  ConfigProvider,
  ConfigConsumer,
} from './project_media/common/js/contexts/configContext';

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react'

import {ThemeProvider} from 'react-native-elements';

import rootReducer from './project_media/common/js/reducers';

import {connect} from 'react-redux';

import {
  fetchInitialData,
  notificationActions,
  appActions,
  userActions,
} from './project_media/common/js/actions';

import rootEpic from './project_media/common/js/epics';

import {createEpicMiddleware} from 'redux-observable';
import {logger} from 'redux-logger';

const epicMiddleware = createEpicMiddleware();

const middlewares = [epicMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

epicMiddleware.run(rootEpic);

const persistor = persistStore(store)

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: '#FFFFFF',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
  },
};

const Stack = createStackNavigator();

const mapStateToProps = state => {
  const {loggingIn = false, loggedIn = false, user} = state.authentication;

  const {isFetching, dataLoaded} = state.initialData;

  return {
    loggingIn,
    loggedIn,
    user,
    isFetching,
    dataLoaded,
    settings,
    persistor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialData: (user = '') => {
      dispatch(fetchInitialData(user))
    },
    initiateSchedule: (startStop = false) => {
      dispatch(notificationActions.initiateSchedule(startStop))
    },
    scheduleNotification: ({date, title, message, playSound ,soundName ,timeslot}) => {
      dispatch(notificationActions.scheduleNotification({date, title, message, playSound ,soundName ,timeslot}))
    },
    addPersistor: payload => {
      dispatch(appActions.addPersistor(payload))
    },
    onLogOut: () => {
      dispatch(userActions.logOut())
    }
  }
}

/**
 * AppRoot
 * @param {*} props
 * At this point we should have the resolved persited data, so can act upon that state
 *
 */
const AppRoot = props => {
  const {
    loggingIn,
    loggedIn,
    user,
    isFetching,
    fetchInitialData,
    dataLoaded,
    isSignout,
    settings,
    scheduleNotification,
    addPersistor,
    persistor,
  } = props;
  const {header = {}, pageTitles = {}, theme = MyTheme, debug = {} } = settings


  useEffect(() => {
    //appActions.reset();

    // Add persitor to store
    addPersistor(persistor);

    if (debug.notifcations){
      scheduleNotification({
        timeslot: 3,
        title: "Scheduled Notification Test",
        message: "My Notification Message Test"
      });
    }

    // Test if A logged in?
    // If not logged in then sign in
    // If logged in already ie we have the user token/email
    // then show loading screen whilst we fetch data

    // if already logged in, recall login incase data has changed and existing data is stale 
    if ( loggedIn && user) {
      fetchInitialData(user);
    }
  }, [addPersistor, dataLoaded, fetchInitialData, loggedIn, persistor, user]);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={header.style}>
        {isFetching || (dataLoaded == false && loggedIn) ? (
          // We haven't finished checking for the token yet

          <Stack.Screen
            name={pageTitles.loading}
            component={AuthLoadingScreenContainer}
          />
        ) : !loggedIn ? (
          // No token found, user isn't signed in
          <Stack.Screen
            name="SignIn"
            component={LoginPageContainer}
            options={{
              title: pageTitles.auth,
              // When logging out, a pop animation feels intuitive
              animationTypeForReplace: isSignout ? 'pop' : 'push',
            }}
          />
        ) : (
          // User is signed in
          <Stack.Screen
            name="Research"
            component={PageResearchContainer}
            options={{title: pageTitles[1]}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const AppHolderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRoot)

export default function App(props) {
  const nativeElementsTheme = {
    Button: {
      raised: false,
    },
    Slider: {
      width: '100%'
    }
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider value={settings}>
          <ThemeProvider theme={nativeElementsTheme}>
            <AppHolderContainer />
          </ThemeProvider>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  )
}
