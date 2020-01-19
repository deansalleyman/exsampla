import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

export default function HomeScreen(props){

  console.log('props', props)

     // const {navigate} = props.navigation;
      const { navigate } = useNavigation();

      _showMoreApp = () => {
        navigate('Profile');
      };
    
      _signOutAsync = async () => {
        console.log('test')
      try{
        const asyncStorageKeys = await AsyncStorage.getAllKeys();
        if (asyncStorageKeys.length > 0) {
          AsyncStorage.clear();
        }
        navigate('Auth');
      } catch (error) {
        console.log('error', error);
        // Error saving data
      }
      };

      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Jane's profile"
          onPress={() => navigate('Profile', {name: 'Jane'})}
        />
          <Button title="Show the Profile" onPress={_showMoreApp} />
          <Button title="Actually, sign me out :)" onPress={_signOutAsync} />
        </View>
      );
   
  }

  HomeScreen.navigationOptions = {
    title: 'Home Screen'
  };