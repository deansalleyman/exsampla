'use strict';
import React from 'react';
import { render} from 'react-dom';
import AppHolder from './app_holder';


import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers';

import { connect } from 'react-redux';

import {fetchInitialData} from './actions';

import rootEpic from './epics';

import { createEpicMiddleware } from 'redux-observable';

import { throttle } from 'lodash';

import { saveState } from './localStorage';

const epicMiddleware = createEpicMiddleware();




const mapStateToProps = state => {
  
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialData: (user = '') => {
      dispatch(fetchInitialData(user))
    },
  }
}


const AppHolderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHolder)


const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);



module.exports = function () {

  // Log the initial state
// console.log(store.getState())
store.subscribe(() => console.log('getState',store.getState()))

// const unsubscribe = store.subscribe(() => );

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


  var element = document.getElementById("root");

  const App = (props) => (
    <AppHolderContainer />
  );

  render(
    <Provider store={store}>
      <App />
    </Provider>
  ,element);


};