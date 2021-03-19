import React, { useEffect, useContext} from 'react';
import { View, Text} from 'react-native';

import { Slider } from 'react-native-elements';
import ConfigContext from '../contexts/configContext';



const AnswerSlider = ({ onValueChange, onSlidingComplete, answer,labelSelected,labels, iniSlider,...sliderProps }) => {

  const {maximumValue} = sliderProps;

  const settings = useContext(ConfigContext);
  const {viewContainer} = settings.slider;

  useEffect(() => {
    onValueChange(answer); 
  }, []);

  // let labelValue = 100;

  

  // useEffect(() => {
  //   labelValue = Math.round((maximumValue - answer));
  // }, [answer]);

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
          {Math.round((maximumValue - answer))}
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


  export default AnswerSlider
  