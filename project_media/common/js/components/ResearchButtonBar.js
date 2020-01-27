
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';
export default function ResearchButtonBar({ dataObject =[], handleScript}) {
    console.log('ResearchButton bar text', dataObject);
    const {button, buttons} = dataObject;
    if(Array.isArray(buttons)){
      return (
        buttons.map((item, i) =>{
          const {title='Button', goto, script} = item;
          console.log('ResearchButton sub', title, goto, script);  
        return (<Button key={i.toString()} onPress={e => handleScript((goto || script),e)} title={title} />
        )
       
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