import React, { useEffect, useContext} from 'react';
import { View, Text} from 'react-native';

import { Slider } from 'react-native-elements';
import ConfigContext from '../contexts/configContext';



export default function AnswerSlider({ onValueChange, onSlidingComplete, answer,labelSelected,labels, iniSlider,...sliderProps }) {



  const settings = useContext(ConfigContext);
  const {viewContainer} = settings.slider;

  useEffect(() => {
    onValueChange(answer); 
  }, []);

  return (
    <View 
    style={viewContainer} >
    <View 
      style={{ 
        flex: 1 ,
        justifyContent: 'center', 
        margin:10,

        flexDirection:'row'
        }}>
        <View style={{
          flex: 0.5,
          alignItems: 'flex-start',
          flexDirection:'column',
          justifyContent:'space-between',
          paddingLeft: 10
        }} >
          {labels.map((label, index) => (
            <Text 
            key={index}
            style={{
              fontWeight: 'normal'
            }}
            >{label}</Text>
          ))}
        </View>


          <Slider
            {...sliderProps}
            value={iniSlider}
            onValueChange={onValueChange}
            onSlidingComplete={onSlidingComplete}
          />
   
        <View style={{flex: 0.5}} >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              color: '#CCCCCC'
            }}
          >
          {answer}
          </Text>
        </View>
      </View>
      <View style={{
        borderWidth:2,
        borderColor:'gray',
        borderRadius:50,
        backgroundColor:'white',
        padding:10,
        minHeight:20,
      
        margin:10}} >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 14,
              color: '#000000'
            }}>
              
            {labelSelected}
          </Text>
        </View>

    </View>
    );
  }



  