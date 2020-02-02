/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import settings from './config/settings';

console.log('settings', settings);

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './project_media/common/js/components/HomeScreen'
import ProfileScreen from './project_media/common/js/components/ProfileScreen';
import AuthLoadingScreen from './project_media/common/js/components/AuthLoadingScreen';
// import SignInScreen from './project_media/common/js/components/SignInScreen';
import LoginPageContainer from './project_media/common/js/containers/LoginPageContainer';
import PageResearchContainer from './project_media/common/js/containers/PageResearchContainer';
import {ConfigProvider, ConfigConsumer} from './project_media/common/js/contexts/configContext';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './project_media/common/js/reducers';

import { connect } from 'react-redux';

import { setRemoteData , fetchRemoteData, fetchInitialData} from './project_media/common/js/actions';

import rootEpic from './project_media/common/js/epics';

import { createEpicMiddleware } from 'redux-observable';

import { throttle } from 'lodash';

import { saveState } from './project_media/common/js/localStorage';

const epicMiddleware = createEpicMiddleware();




const mapStateToProps = state => {

  const { loggingIn = false, loggedIn = false } = state.authentication;
  const {remoteData} = state;

  return {
    loggingIn,
    loggedIn,
    remoteData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRemoteData: (range = '') => {
      dispatch(fetchRemoteData(range))
    },
    setRemoteData: data => {
      dispatch(setRemoteData(data))
    },
    fetchInitialData: (user = '') => {
      dispatch(fetchInitialData(user))
    },
  }
}


const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);

const AuthStack = createStackNavigator({ SignIn: LoginPageContainer });



const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});


const AppStack = createStackNavigator({
  Home: {screen: PageResearchContainer}
});

let RootStack =   createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

let AppContainer = createAppContainer(RootStack);

const AppRoot = (props) => (
  <AppContainer screenProps={props} />
);

const AppHolderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRoot)



export default function  App (props){

  store.subscribe(() => console.log('getState',store.getState()));

  // // Every time the state changes, log it
  // // Note that subscribe() returns a function for unregistering the listener
  const unsubscribe = store.subscribe(throttle(() => {
    console.log('getState',store.getState());
    saveState({
      authentication: store.getState().authentication,
      initialData: store.getState().initialData,
      research: store.getState().research
    });
  }, 1000));

  return (
      <Provider store={store}>
        <ConfigProvider value={settings} >
          <AppHolderContainer/>
        </ConfigProvider>
      </Provider>
  )

}
