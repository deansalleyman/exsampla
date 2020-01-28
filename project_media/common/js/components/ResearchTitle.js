ResearchTitle
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';
export default function ResearchTitle({ dataObject =[]}) {

    console.log('ResearchTitle text', dataObject);
    if(Array.isArray(dataObject)){
      return (
        dataObject.map((item, i) =>{
        return (
        <Text key={i.toString()}>{item.title}</Text>

        )
       
      })
      )
    } else {
      return (
        <Text>{dataObject.title}</Text>

      )
    }
}

ResearchTitle.propTypes = {
    dataObject: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  }
  