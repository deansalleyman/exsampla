

import React, { useContext, useState, useEffect } from 'react';
import { ActivityIndicator, View} from 'react-native';
import { Text, Overlay } from 'react-native-elements';
import ConfigContext from '../contexts/configContext';




export default function AuthLoadingScreen(props){

  const settings = useContext(ConfigContext);
  const { loggingFailure, loginFailureReason, fetchRemoteFailureError,fetchRemoteFailureReason } = props;

  const {loadingScreen={}, auth={}} = settings;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {

 
    if(loggingFailure || fetchRemoteFailureError){
      setIsVisible( true);
    }


  },[loggingFailure, fetchRemoteFailureError]);

      return (
        <View style={{ flex: 1, alignItems: 'center',height:'100%', justifyContent: 'center',  flexDirection:'column', alignContent:'space-between' }}>

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

          <Text h1 style={loadingScreen.style}>{loadingScreen.title}</Text>

          <Text h3 style={loadingScreen.style}>{loadingScreen.loadingTitle}</Text>
          <ActivityIndicator size={loadingScreen.loader.size} color={loadingScreen.loader.color} />
        </View>
      );
   
  }

