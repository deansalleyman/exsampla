
import React, { useContext, useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import ConfigContext from '../contexts/configContext';

import PropTypes from 'prop-types';
export default function ResearchLogo({dataObject = {}, imageAssetsUrl}) {

  const logoUrl = `${imageAssetsUrl}/${dataObject.logo}`;

    return ( 
    <Image
      containerStyle={{}}
        style={{ aspectRatio: 1,height:120}}
        source={{uri: logoUrl}}
        PlaceholderContent={<ActivityIndicator/>}
      />

      );
}

ResearchLogo.propTypes = {
    dataObject: PropTypes.object
  }

