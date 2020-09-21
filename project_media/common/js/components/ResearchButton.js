
import React, { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import ConfigContext from '../contexts/configContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ResearchButton({ dataObject =[], handleScript}) {
  const settings = useContext(ConfigContext);
  const {buttonsConfig={}} = settings; 


    if(Array.isArray(dataObject)){
      return (
        dataObject.map((item, i) =>{
          const {button:{title='Button', goto, script}={}} = item;

        return (<Button 
          icon={
            <Icon
              name={buttonsConfig.icon.name}
              size={buttonsConfig.icon.size}
              color={buttonsConfig.icon.color}
            />
          }
        
          buttonStyle={buttonsConfig.style}  
            containerStyle={buttonsConfig.containerStyle}  
            titleStyle={buttonsConfig.titleStyle}  
            key={i.toString()} 
            onPress={e => handleScript((goto || script),e)} 
            title={title} 
          />)
       
      })
      )
    } else {

      const {button:{title='Button', goto, script}={}} = dataObject;
      return (
        <Button 
          icon={
            <Icon
              name={buttonsConfig.icon.name}
              size={buttonsConfig.icon.size}
              color={buttonsConfig.icon.color}
            />
          }
      
          buttonStyle={buttonsConfig.style}
          containerStyle={buttonsConfig.containerStyle}  
          titleStyle={buttonsConfig.titleStyle}  
          onPress={e => handleScript((goto || script),e)} 
          title={title} 
        />
      )
    }
}

ResearchButton.propTypes = {
    dataObject: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  }