import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

export default function SignInScreen(props) {
    const { navigate } = useNavigation();

    // Declare a new state variable, which we'll call "username"
  const [credentials, setCredentials] = useState({
      username:'', 
      password:''
    });

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      });

      const printValues = e => {
        e.preventDefault();
        console.log(form.username, form.password);
      };
    
      const updateField = cred => {


        setCredentials({
          ...credentials,
          ...cred
      });
        console.log('cred updated', credentials);
      };

      const _signInAsync = async () => {

        try {
            console.log('_signInAsync', credentials);
            await AsyncStorage.setItem('userToken', 'abc');
           // navigate('App');
          } catch (error) {
            console.log('error', error);
            // Error saving data
          }

     
    };

      return (
        <View style={styles.container}>
            <TextInput
              style={{height: 40}}
              placeholder="Username"
              onChangeText={(username) => updateField({username})}
              value={credentials.username}
            ></TextInput>

            <TextInput
              style={{height: 40}}
              placeholder="Password"
              onChangeText={(password) => updateField({password})}
              value={credentials.password}
            ></TextInput>
          <Button title="Sign in!" onPress={_signInAsync} />
        </View>
      );

  

  }

  SignInScreen.navigationOptions = {
    title: 'Please sign in',
  };