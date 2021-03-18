import React, { useState, useEffect , useContext} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Slider } from 'react-native-elements';
import toNumber from 'lodash/toNumber';

import indexOf from 'lodash/indexOf';
import debounce from 'lodash/debounce';
import ConfigContext from '../contexts/configContext';
import  AnswerSlider  from './AnswerSlider';



export default function ResearchAnswerSlider({ dataObject, handleAnswer}) {
  const {default:defaultValue, labels = [],max ,min ,steps ,type ,var:variable } = dataObject.v_slider;

  const minimumValue = toNumber(min);
  const maximumValue = toNumber(max);
  let defaultValueInt = toNumber(defaultValue);
  console.log('defaultValueInt', answer, defaultValue)



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

  const bouncedFn =  debounce(() => handleAnswer(answer), 1000);
  const bouncedFnChange = debounce((val) =>setAnswer(Math.round((maximumValue - val))),100)

  useEffect(() => {
 

    setAnswer( defaultValueInt);

  },[variable]);

  useEffect(() => {


    const output = numberRangeArray.reduce((prev, curr) => {
      return (Math.abs(curr - answer) < Math.abs(prev - answer) ? curr : prev)
    },0);
    const theLabelIndex = labelsReversed[indexOf(numberRangeArray, output)]

    setLabelSelected(theLabelIndex);
    defaultValueInt = answer;


  },[answer,variable]);

 const iniSlider =  (maximumValue - defaultValueInt);

 
 

 const onValueChange =  (val) => {
  setAnswer(Math.round((maximumValue - val)));

  }
 const onSlidingComplete = () => {
  handleAnswer(answer);
  }


  const [sliderProps, setSliderProps] = useState({
    minimumTrackTintColor:minimumTrackTintColor,
    thumbStyle:sliderStyles.thumb,
    thumbTintColor:thumbTintColor,
    minimumValue:minimumValue,
    step:toNumber(steps),
    maximumValue:maximumValue,
    orientation:'vertical'
  });


  return (<AnswerSlider 
          {...sliderProps}
          onValueChange={onValueChange}
          onSlidingComplete={onSlidingComplete}
          answer={answer}
          labelSelected={labelSelected}
          labels={labels}
          iniSlider={answer}
          />);
  }
