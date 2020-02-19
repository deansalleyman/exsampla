import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';
import { Slider } from 'react-native-elements';
import toNumber from 'lodash/toNumber';




export default function ResearchAnswerSlider({ dataObject, handleAnswer}) {
  const {default:defaultValue, labels,max ,min ,steps ,type ,var:variable } = dataObject.v_slider;

  const [answer, setAnswer] = useState(toNumber(defaultValue));
  return (<View style={{ flex: 1, justifyContent: 'center',  backgroundColor: '#0000CC'}}>
  <Slider
    value={toNumber(answer)}
    minimumValue={toNumber(min)}
    step={toNumber(steps)}
    maximumValue={toNumber(max)}
    orientation='vertical'
    onValueChange={value => setAnswer(value)}
    onSlidingComplete={value => handleAnswer({value})}
  />
  <Text>Value: </Text>
</View>);
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
  