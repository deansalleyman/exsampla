import React, { useState, useEffect , useContext} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Slider } from 'react-native-elements';
import toNumber from 'lodash/toNumber';

import indexOf from 'lodash/indexOf';
import ConfigContext from '../contexts/configContext';



export default function ResearchAnswerSlider({ dataObject, handleAnswer}) {
  const {default:defaultValue, labels = [],max ,min ,steps ,type ,var:variable } = dataObject.v_slider;

  const minimumValue = toNumber(min);
  const maximumValue = toNumber(max);
  const defaultValueInt = toNumber(defaultValue);



  const [answer, setAnswer] = useState(defaultValueInt);
  const [labelSelected, setLabelSelected] = useState('');


  const settings = useContext(ConfigContext);
  const {style, minimumTrackTintColor , thumbTintColor} = settings.slider;

  const sliderStyles = StyleSheet.create(style);

  function range(start, stop, step) {
    var a = [start], b = start;
    while (b < stop) {
        a.push(b += step || 1);
    }
    console.log('a',a,start, stop, step);
    return a;
}
  const numberRangeArray = range(minimumValue, maximumValue, (maximumValue / (labels.length-1)) );

  console.log('minimumValue', minimumValue,'maximumValue', maximumValue)
 
  const labelsC = [...labels]
  const labelsReversed = [...labelsC.reverse()];

  function closest(num, arr) {
    var curr = arr[0];
    var diff = Math.abs (num - curr);
    for (var val = 0; val < arr.length; val++) {
        var newdiff = Math.abs (num - arr[val]);
        if (newdiff < diff) {
            diff = newdiff;
            curr = arr[val];
        }
    }
    return curr;
}



  useEffect(() => {
 

    setAnswer( defaultValueInt);

    console.log('useEffect reset', defaultValueInt, 'answer',answer )

  },[variable]);

  useEffect(() => {
 

    const output = numberRangeArray.reduce((prev, curr) => {
     // console.log('reduce', answer, Math.abs(curr - answer), Math.abs(prev - answer))
      return (Math.abs(curr - answer) < Math.abs(prev - answer) ? curr : prev)
    },0);
    const theLabelIndex = labelsReversed[indexOf(numberRangeArray, output)]

    setLabelSelected(theLabelIndex);

// console.log(closest(answer, numberRangeArray));

    console.log('useEffect',answer,'output:',output,'output2:',closest(answer, numberRangeArray), 'numberRangeArray:', numberRangeArray ,'index:',indexOf(numberRangeArray, output),'theLabelIndex:', theLabelIndex,'labelsReversed:',labelsReversed);


  },[answer,variable]);

 const iniSlider =  (maximumValue - defaultValueInt);


console.log('slider', min, max, defaultValue,'iniSlider: ', iniSlider ,answer)
  return (
    <View 
    style={{ 
      flex: 1 ,
      flexDirection:'column'
    }} >
    <View 
      style={{ 
        flex: 1 ,
        justifyContent: 'center', 
        // alignItems: 'stretch', 
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
            thumbImage={require('./img/thumb.png')}
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
            onSlidingComplete={value => handleAnswer(answer)}
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
        backgroundColor:'white',
        minHeight:20}} >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
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
  