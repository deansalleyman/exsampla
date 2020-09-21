
import React, { useContext, useState, useEffect } from 'react';
// import { View, Text, Button, Image } from 'react-native';
import { View, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import ConfigContext from '../contexts/configContext';

import PropTypes from 'prop-types';
export default function ResearchLogo({dataObject = {}, settings}) {

    const {imageAssetsUrl} = settings;
    return ( 
    <Image
      containerStyle={{}}
        style={{ aspectRatio: 1,height:120}}
        source={{uri: imageAssetsUrl + dataObject.logo}}
        PlaceholderContent={<ActivityIndicator/>}
      />

      );
}

ResearchLogo.propTypes = {
    dataObject: PropTypes.object
  }

