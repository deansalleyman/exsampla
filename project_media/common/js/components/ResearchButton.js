
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
export default function ResearchButton({ dataObject =[], handleScript}) {
    console.log('ResearchButton text', dataObject);
    if(Array.isArray(dataObject)){
      return (
        dataObject.map((item, i) =>{
          const {button:{title='Button', goto, script}={}} = item;
          console.log('ResearchButton sub', title, goto, script);  
        return (<Button key={i.toString()} onPress={e => handleScript((goto || script),e)} title={title} />)
       
      })
      )
    } else {
      console.log('ResearchButton not array', dataObject);
      const {button:{title='Button', goto, script}={}} = dataObject;
      return (
        <Button onPress={e => handleScript((goto || script),e)} title={title} />
      )
    }
}

ResearchButton.propTypes = {
    dataObject: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  }