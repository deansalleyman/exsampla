

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import PropTypes from 'prop-types';
import ConfigContext from '../contexts/configContext';

export default function AuthLoadingScreen(props){

      //const {navigate} = props.navigation;
      const {loggingIn, loggedIn, isFetching, fetchInitialData, dataLoaded} = props.screenProps;

      const { navigate } = useNavigation();
      const settings = useContext(ConfigContext);

      useEffect(() => {
        console.log('AuthLoadingScreen useEffect',dataLoaded, isFetching, loggingIn, loggedIn, props, settings);
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          if (settings.auth){
            // in auth stack mode, check if already logged in otherwise redirect to sign in
            navigate(loggedIn ? 'App' : 'Auth');

          } else if(dataLoaded === false) { 
            fetchInitialData();
          } else {
            navigate('App');
          }

      },[isFetching]);

      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Auth Loading Screen</Text>
        <Button
          title="Go to Jane's profile"
          onPress={() => navigate('Profile', {name: 'Jane'})}
        />
        </View>
      );
   
  }

  AuthLoadingScreen.navigationOptions = {
    title: 'Auth Loading',
  };
