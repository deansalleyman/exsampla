import React from 'react';
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function SignInScreen(props) {

  
      return (
        <View style={styles.container}>
          <Button title="Sign in!" onPress={_signInAsync} />
        </View>
      );

  
    _signInAsync = async () => {

        try {
            await AsyncStorage.setItem('userToken', 'abc');
            props.navigation.navigate('App');
          } catch (error) {
            // Error saving data
          }

     
    };
  }

  SignInScreen.navigationOptions = {
    title: 'Please sign in',
  };