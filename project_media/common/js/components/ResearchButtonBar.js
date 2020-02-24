
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
export default function ResearchButtonBar({ dataObject =[], handleScript}) {

    const {button, buttons} = dataObject;
    if(Array.isArray(buttons)){
      return (
        buttons.map((item, i) => {
          const {title='Button', goto, script} = item;

        return (<Button key={i.toString()} onPress={e => handleScript((goto || script),e)} title={title} />)
       
      })

     )
    } else if(button){
      console.log('ResearchButton bar not array', button);
      const {title='Button', goto, script } = button;
      return (
        <Button onPress={e => handleScript((goto || script),e)} title={title} />
      )
    }
}