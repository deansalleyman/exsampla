
import React, { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import ConfigContext from '../contexts/configContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ResearchLink({ dataObject, handleLink}) {

    const settings = useContext(ConfigContext);
    const {buttonLinksConfig={}} = settings; 

    const ButtonArray = ()=>{
    return  dataObject.map((item, i) => {
        const {link} = item;
        const {title='Link', url} = link;
        return (<Button 
          icon={
            <Icon
              name={buttonLinksConfig.icon.name}
              size={buttonLinksConfig.icon.size}
              color={buttonLinksConfig.icon.color}
            />
          }
      
          buttonStyle={buttonLinksConfig.style}
          containerStyle={buttonLinksConfig.containerStyle}  
          titleStyle={buttonLinksConfig.titleStyle}  
          key={i.toString()} 
          onPress={e => handleLink((url),e)}
          title={title} 
          />)
      
      })
    }

    if(Array.isArray(dataObject)){

        return (
          <View 
          style={buttonLinksConfig.backgroundContainerStyle}>

          <ButtonArray/>
       
         </View>
       )
      } else if(dataObject.link){

        const {title='Link', url} = dataObject.link;
        return (
          
            <Button 
              icon={
                <Icon
                  name={buttonLinksConfig.icon.name}
                  size={buttonLinksConfig.icon.size}
                  color={buttonLinksConfig.icon.color}
                />
              }
          
              buttonStyle={buttonLinksConfig.style}
              containerStyle={buttonLinksConfig.containerStyle}  
              titleStyle={buttonLinksConfig.titleStyle}  
              onPress={e => handleLink((url),e)} title={title} 
            />
       
        )
      }
}