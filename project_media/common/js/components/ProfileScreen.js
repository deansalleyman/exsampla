import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default function ProfileScreen(props){


      const {navigate} = props.navigation;
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
        <Button
          title="Go to Home page"
          onPress={() => navigate('Home')}
        />
        </View>
      );

  }


  ProfileScreen.navigationOptions = {
    title: 'Profile'
  };


