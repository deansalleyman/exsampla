

import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

export default function AuthLoadingScreen(props){

      //const {navigate} = props.navigation;
      const { navigate } = useNavigation();

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
