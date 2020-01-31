
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import PropTypes from 'prop-types';
export default function ResearchLogo(dataObject = {}) {
    console.log('ResearchLogo', dataObject)
    return (  <Image
        style={{width: 50, height: 50}}
        source={{uri: dataObject.logo}}
      />);
}

ResearchLogo.propTypes = {
    dataObject: PropTypes.object
  }

