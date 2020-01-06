import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useNavigation, useNavigationParam, useNavigationState } from 'react-navigation-hooks';

export default function ProfileScreen(props){
  const { navigate } = useNavigation();
  const name = useNavigationParam('name');
  const { routeName } = useNavigationState();

    //  const {navigate, state:{routeName='test', params:{name="Default"}={}}={}} = props.navigation;
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen {routeName} for {name}</Text>
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


