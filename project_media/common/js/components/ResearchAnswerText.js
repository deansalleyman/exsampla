
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { Input } from 'react-native-elements';
export default function ResearchAnswerText({ dataObject, handleAnswer}) {
    console.log('ResearchAnswerText', dataObject);
    const {text} = dataObject;
    return (<Input
    onChange
        placeholder={text.placeholder}
      />);
}