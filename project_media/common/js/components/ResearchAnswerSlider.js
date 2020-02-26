import React, { useState, useEffect , useContext} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Slider } from 'react-native-elements';
import toNumber from 'lodash/toNumber';
import ConfigContext from '../contexts/configContext';



export default function ResearchAnswerSlider({ dataObject, handleAnswer}) {
  const {default:defaultValue, labels,max ,min ,steps ,type ,var:variable } = dataObject.v_slider;

  const minimumValue = toNumber(min);
  const maximumValue = toNumber(max);
  const defaultValueInt = toNumber(defaultValue);

  const [answer, setAnswer] = useState(defaultValueInt);
  const settings = useContext(ConfigContext);
  const {style, minimumTrackTintColor , thumbTintColor} = settings.slider;

  const sliderStyles = StyleSheet.create(style);




console.log('slider', min, max, defaultValue)
  return (
    <View 
      style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection:'row'
        }}>
      <View style={{backgroundColor: 'blue', flex: 0.3}} />

      <Slider
        minimumTrackTintColor={minimumTrackTintColor}
        thumbImage={require('./img/thumb.png')}
        thumbStyle={sliderStyles.thumb}
        thumbTintColor={thumbTintColor}

        minimumValue={minimumValue}
        step={toNumber(steps)}
        maximumValue={maximumValue}
        value={(maximumValue - defaultValueInt)}
        orientation='vertical'
        onValueChange={value => setAnswer((maximumValue - value))}
        onSlidingComplete={value => handleAnswer((maximumValue - value))}
      />
   
      <View style={{backgroundColor: 'red', flex: 0.5}} >
        <Text>Value: {answer}</Text>
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
  