import React, { useState, useEffect , useContext} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Slider } from 'react-native-elements';
import toNumber from 'lodash/toNumber';

import indexOf from 'lodash/indexOf';
import debounce from 'lodash/debounce';
import ConfigContext from '../contexts/configContext';



export default function ResearchAnswerSlider({ dataObject, handleAnswer}) {
  const {default:defaultValue, labels = [],max ,min ,steps ,type ,var:variable } = dataObject.v_slider;

  const minimumValue = toNumber(min);
  const maximumValue = toNumber(max);
  const defaultValueInt = toNumber(defaultValue);



  const [answer, setAnswer] = useState(defaultValueInt);
  const [labelSelected, setLabelSelected] = useState('');


  const settings = useContext(ConfigContext);
  const {style, minimumTrackTintColor , thumbTintColor, viewContainer} = settings.slider;

  const sliderStyles = StyleSheet.create(style);

  function range(start, stop, step) {
    var a = [start], b = start;
    while (b < stop) {
        a.push(b += step || 1);
    }

    return a;
}
  const numberRangeArray = range(minimumValue, maximumValue, (maximumValue / (labels.length-1)) );


 
  const labelsC = [...labels]
  const labelsReversed = [...labelsC.reverse()];

  const bouncedFn =  debounce(() => handleAnswer(answer), 1000)

  useEffect(() => {
 

    setAnswer( defaultValueInt);


  },[variable]);

  useEffect(() => {


    const output = numberRangeArray.reduce((prev, curr) => {
      return (Math.abs(curr - answer) < Math.abs(prev - answer) ? curr : prev)
    },0);
    const theLabelIndex = labelsReversed[indexOf(numberRangeArray, output)]

    setLabelSelected(theLabelIndex);
    bouncedFn();

  },[answer,variable]);

 const iniSlider =  (maximumValue - defaultValueInt);


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
            minimumTrackTintColor={minimumTrackTintColor}
 
            thumbStyle={sliderStyles.thumb}
            thumbTintColor={thumbTintColor}


            minimumValue={minimumValue}
            step={toNumber(steps)}
            maximumValue={maximumValue}
            value={iniSlider}
            orientation='vertical'
            onValueChange={value => {
              setAnswer(Math.round((maximumValue - value)))}
            }
        
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

ResearchAnswerSlider.defaultProps = {
  v_slider:{
    default:"1",
    labels: [],
    max:"1",
    min: "0",
    steps: "1",
    type : "labels",
    var:""
  }
}

ResearchAnswerSlider.propTypes = {
    dataObject: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  }
  