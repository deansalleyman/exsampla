import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

export default function HomeScreen(props){

      const {navigate} = props.navigation;

      _showMoreApp = () => {
        props.navigation.navigate('Other');
      };
    
      _signOutAsync = async () => {
        console.log('test')
      try{
        const asyncStorageKeys = await AsyncStorage.getAllKeys();
        if (asyncStorageKeys.length > 0) {
          AsyncStorage.clear();
        }
        props.navigation.navigate('Auth');
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
          <Button title="Show me more of the app" onPress={_showMoreApp} />
          <Button title="Actually, sign me out :)" onPress={_signOutAsync} />
        </View>
      );
   
  }

  HomeScreen.navigationOptions = {
    title: 'Welcome'
  };