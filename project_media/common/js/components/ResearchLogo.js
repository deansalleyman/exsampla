
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import PropTypes from 'prop-types';
export default function ResearchLogo({dataObject = {}, settings}) {
    console.log('ResearchLogo', dataObject, settings);
    const {imageAssetsUrl} = settings;
    return (  <Image
        style={{width: 50, height: 50}}
        source={{uri: imageAssetsUrl + dataObject.logo}}
      />);
}

ResearchLogo.propTypes = {
    dataObject: PropTypes.object
  }

