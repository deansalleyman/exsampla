import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useNavigation, useNavigationParam, useNavigationState } from 'react-navigation-hooks';

import keys from 'lodash/keys';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import isNumber from 'lodash/isNumber';
import isEmpty from 'lodash/isEmpty'
import qs from 'qs';

import ResearchTitle from './ResearchTitle';
import ResearchAnswerSlider from './ResearchAnswerSlider';
import ResearchAnswerText from './ResearchAnswerText';
import ResearchButton from './ResearchButton';
import ResearchButtonBar from './ResearchButtonBar';
import ResearchLink from './ResearchLink';
import PropTypes from 'prop-types';

export default function ResearchScreen(props){
  const { navigate } = useNavigation();
  const name = useNavigationParam('name');
  const { routeName } = useNavigationState();

  const { pageData, id ,scripts, navigateNext, pagesArray, addAnswer, scriptCommand} = props;

  const [answer, setAnswer] = useState();

handleScript = (value='', e)  => {
  e.preventDefault();
  const params = value.split(/[?]+/);
  const [scriptKey, path] = params;
  const parsed = qs.parse(path, { ignoreQueryPrefix: true });

  const selected = Object.assign({},scripts[scriptKey]);
  // branch the code to decide if navigation save var or combination of both


  const gotoStandard = parseInt(value, 10);

  console.log('handleScript top:',value, params, parsed, selected)


  if(!isEmpty(selected)){
    /**
     * selected:
        id: "save"
        script: [
        save: {var: "%var%"},
        goto: {id: "%goto%"}
      ]
     */
  const selectedEnriched = selected.script.map((item)=>{
    const [theKey = '']= keys(item);
    const theTarget = Object.assign({},item[theKey]);
    const [valueKey = {}] = keys(theTarget);
    const lookUpkeyVar = theTarget[valueKey] || '';
      const lookUpkey = lookUpkeyVar.replace(/%/gi, '');

      // NOTE needs to handle timer script command
      // so only set if parsed to send?
      if(!isEmpty(parsed) && parsed.hasOwnProperty(lookUpkey)){
        theTarget[valueKey] = parsed[lookUpkey];
      }


      if (lookUpkey == 'var' && !isUndefined(answer)){
        theTarget.answer = answer;
      }



    console.log('mergeWith item', item, parsed, theTarget,lookUpkey, lookUpkeyVar);
    return ({[theKey]:theTarget});
  });

    console.log('handleScript',parsed, selected);
      scriptCommand({id:selected.id, script: selectedEnriched});
    } else if(isNumber(gotoStandard)){

      navigateNext(gotoStandard);
    }

  }


  handleAnswer = (answer,e) => {
    e.preventDefault();
    setAnswer({ answer });
    console.log('handleAnswer', answer)
  }


  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Research Screen {routeName} for {name}</Text>

      {pageData && pageData.title &&
          <ResearchTitle dataObject={pageData.title} />
        }

      </View>
    );

  }


  ResearchScreen.navigationOptions = {
    title: 'Research'
  };
