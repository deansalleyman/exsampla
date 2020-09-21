
import React, { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import ConfigContext from '../contexts/configContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ResearchButtonBar({ dataObject =[], handleScript}) {


    const {button, buttons} = dataObject;
    const settings = useContext(ConfigContext);
    const {buttonsConfig={}, buttonResearchConfig = {}} = settings; 
    // Buttons for research page

    const ButtonsArray = ()=>{
     return buttons.map((item, i) => {
        const {title='Button', goto, script} = item;

      return (<Button 
          buttonStyle={buttonResearchConfig.style} 
          containerStyle={buttonResearchConfig.containerStyle}  
          titleStyle={buttonResearchConfig.titleStyle}  
          key={i.toString()} 
          onPress={e => handleScript((goto || script),e)} title={title} 
        />)
     
    })

    }
    if(Array.isArray(buttons)){

      return (
        <View style={buttonResearchConfig.buttonBar}> 
          <ButtonsArray/>
        </View>
     )
    } else if(button){

      // standalone action buttons
      const {title='Button', goto, script } = button;
      return (
        <View style={buttonResearchConfig.buttonBar}> 
      
          <Button 
            icon={
              <Icon
                name={buttonResearchConfig.icon.name}
                size={buttonResearchConfig.icon.size}
                color={buttonResearchConfig.icon.color}
              />
            }
          
          buttonStyle={buttonResearchConfig.style} 
            containerStyle={buttonResearchConfig.containerStyle} 
            titleStyle={buttonResearchConfig.titleStyle}  
            onPress={e => handleScript((goto || script),e)} 
            title={title} 
          />
        </View>
      )
    }
}