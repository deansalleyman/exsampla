

import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import PropTypes from 'prop-types';

export default function AuthLoadingScreen(props){

      //const {navigate} = props.navigation;
      const {loggingIn, loggedIn} = props.screenProps;
      const { navigate } = useNavigation();

      useEffect(() => {
        console.log('AuthLoadingScreen useEffect', loggingIn, loggedIn, props);
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
        navigate(loggedIn ? 'App' : 'Auth');
      });

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
