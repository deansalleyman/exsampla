import React, { useState, useEffect , useContext} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Slider } from 'react-native-elements';
import toNumber from 'lodash/toNumber';
import inRange from 'lodash/inRange';
import range from 'lodash/range';
import findIndex from 'lodash/findIndex';
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
  const numberRangeArray = range(minimumValue, maximumValue, (maximumValue / labels.length));
 
  const labelsC = [...labels]
  const labelsReversed = [...labelsC.reverse()];

  useEffect(() => {
    const theLabelIndex = numberRangeArray.reduce((sum, current, i, c) => {
      const startRange = (c[i-1])|| 0;
    const labelI =  (inRange(answer, startRange, current  ));

    sum =  (labelI)? (labelsReversed[i] || '') : sum;
    return sum;
    }, '')
    setLabelSelected(theLabelIndex);
console.log('numberRangeArray', numberRangeArray, labelSelected)
  },[answer]);


console.log('slider', min, max, defaultValue)
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
            value={(maximumValue - defaultValueInt)}
            orientation='vertical'
            onValueChange={value => setAnswer((maximumValue - value))}
            onSlidingComplete={value => handleAnswer((maximumValue - value))}
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
  