import React, { useState, useEffect, useContext } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { Button , Text , Input, Overlay} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import PropTypes from 'prop-types';
import ConfigContext from '../contexts/configContext';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function auth(props) {
    // const { navigate } = useNavigation();
    const { onLoginUser, loggingIn, loggedIn,loggingFailure, loginFailureReason, fetchRemoteFailureError,fetchRemoteFailureReason, onLogOut } = props;
    const settings = useContext(ConfigContext);

    const {authButtonsConfig={},auth={}, loadingScreen={}} = settings; 
    const [isVisible, setIsVisible] = useState(false);
    const [emailErrorMsg, setUsernameErrorMsg] = useState();
    const [passwordErrorMsg, setPasswordErrorMsg] = useState();


    // Declare a new state variable, which we'll call "username"
  const [credentials, setCredentials] = useState({
      username:'', 
      password:''
    });

  useEffect(() => {

 
    if(loggingFailure || fetchRemoteFailureError){
      setIsVisible( true);
    }


  },[loggingFailure, fetchRemoteFailureError]);

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

    
      const updateField = cred => {



        setCredentials({
          ...credentials,
          ...cred
      });


      };

      const _signInAsync = async () => {

        const { username, password } = credentials;
        // validation messaging
        const validatedEmail = validateEmail(username);

      if (!username) {
        setUsernameErrorMsg(auth.error.setUsernameErrorMsg.none)
      } else if(!validatedEmail) {


        setUsernameErrorMsg(auth.error.setUsernameErrorMsg.validatedEmail)
      }

      if (!password) {
        setPasswordErrorMsg(auth.error.setPasswordErrorMsg.none)
      }
         try {


            if(auth.authPassword){

              if (username && password) {
                onLoginUser(username, password);
              }

            } else {
              if(username && auth.validatedEmail){
                if (validatedEmail ) {
                  onLoginUser(username);
                }
              } else if(username) {
                onLoginUser(username);
              }


            }

        

          } catch (error) {
            console.log('error', error);
            // Error saving data
          }

  

     
    };

      return (
        <View style={{ flex:1, alignItems: 'stretch', flexDirection:'column', justifyContent:'center' }}>
       
            <Overlay
              isVisible={isVisible}
              windowBackgroundColor={auth.error.windowBackgroundColor}
              overlayBackgroundColor={auth.error.overlayBackgroundColor}
              width="auto"
              height="auto"
              onBackdropPress={() => setIsVisible(false)}
            >
              <Text style={auth.error.style}>{loginFailureReason || fetchRemoteFailureReason} </Text>
            </Overlay>

            {loggingIn && 
              <ActivityIndicator size={loadingScreen.loader.size} color={loadingScreen.loader.color} />
            }
            
            <Input
              style={{height: 40}}
              placeholder={auth.usernameText}
              onChangeText={(username) => updateField({username})}
              value={credentials.username}
              errorStyle={{ color: 'red' }}
              errorMessage={emailErrorMsg}

            ></Input>
            {auth.authPassword  &&
              <Input
                style={{height: 40}}
                placeholder="Password"
                onChangeText={(password) => updateField({password})}
                value={credentials.password}
                errorStyle={{ color: 'red' }}
                errorMessage={passwordErrorMsg}
              ></Input>
            }

          <Button 
          icon={
            <Icon
              name={authButtonsConfig.icon.name}
              size={authButtonsConfig.icon.size}
              color={authButtonsConfig.icon.color}
            />
          }
      
          buttonStyle={authButtonsConfig.style}
          containerStyle={authButtonsConfig.containerStyle}  
          titleStyle={authButtonsConfig.titleStyle}  
          onPress={_signInAsync} 
          title={auth.continueText} 
        />

        </View>
      );

  

  }

  auth.navigationOptions = {
    title: 'Please sign in',
  };