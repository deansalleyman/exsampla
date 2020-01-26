ResearchTitle
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';
export default function ResearchTitle({ dataObject =[]}) {

    console.log('ResearchTitle text', dataObject);
    // if(Array.isArray(dataObject)){
    //   return (
    //     dataObject.map((item, i) =>{
    //     return (<p key={i.toString()}
    //     dangerouslySetInnerHTML={{__html:item.title}} />
    //     )
       
    //   })
    //   )
    // } else {
    //   return (
    //     <p dangerouslySetInnerHTML={{__html:dataObject.title}}/>
    //   )
    // }
}

ResearchTitle.propTypes = {
    dataObject: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  }
  