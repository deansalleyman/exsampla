import React from 'react';
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

export default function SignInScreen(props) {
    const { navigate } = useNavigation();

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      });
      const _signInAsync = async () => {

        try {
            console.log('_signInAsync');
            await AsyncStorage.setItem('userToken', 'abc');
            navigate('App');
          } catch (error) {
            console.log('error', error);
            // Error saving data
          }

     
    };

      return (
        <View style={styles.container}>
          <Button title="Sign in!" onPress={_signInAsync} />
        </View>
      );

  

  }

  SignInScreen.navigationOptions = {
    title: 'Please sign in',
  };