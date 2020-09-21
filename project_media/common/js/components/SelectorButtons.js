
import React, { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import PropTypes from 'prop-types';
import ConfigContext from '../contexts/configContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SelectorButtons({ dataObject =[],setForkGoto, handleAnswer}) {

    const {selector} = dataObject;

    console.log('SelectorButtons', dataObject);

    const settings = useContext(ConfigContext);
    const {selectorButtonsConfig={}} = settings; 

    const [selectedIndex, updateIndex] = useState();

    const normalizedData = dataObject.reduce(function (acc, val) {
      const {selector={}} = val;
      return [...acc, ...[selector]];
    }, []);

    function buttonSelect(index){
      const {title, goto, value:answer} = normalizedData[index];
      setForkGoto(goto);
      handleAnswer(answer);
      updateIndex(index);
    }

  

    const buttons = dataObject.reduce(function (acc, val) {
      const {selector:{title='Button', goto, value:answer, subtitle}={}} = val;
      const element = () =>{ 
        return( <View style={selectorButtonsConfig.colContStyle}>  
            <View style={selectorButtonsConfig.iconColStyle}> 
              <Icon
                name={selectorButtonsConfig.icon.name}
                size={selectorButtonsConfig.icon.size}
                color={selectorButtonsConfig.icon.color}
              />
            </View>
            <View style={selectorButtonsConfig.style}>
              <Text  style={selectorButtonsConfig.titleStyle} >
            
                {title}</Text>
              {subtitle &&
              <Text style={selectorButtonsConfig.subTitleStyle}>{subtitle}</Text>
              }
               </View>
          </View>)
      };
      return [...acc, ...[{element}]];
  }, []);

  console.log('buttons',buttons, normalizedData)


    if(Array.isArray(dataObject)){

      return (
        <View style={selectorButtonsConfig.backgroundContainerStyle}> 
            <ButtonGroup
              onPress={buttonSelect}
              selectedIndex={selectedIndex}
              buttons={buttons}
              vertical={true}
              containerStyle={selectorButtonsConfig.containerStyle}
              selectedTextStyle={selectorButtonsConfig.selectedTextStyle}
              underlayColor="#f4511e"
            />
        </View>
     )
    } 
}