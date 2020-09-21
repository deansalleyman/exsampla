
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { Input } from 'react-native-elements';
export default function ResearchAnswerText({ dataObject, handleAnswer}) {

    const {text} = dataObject;
    return (<Input
        onChangeText={handleAnswer}
        placeholder={text.placeholder}
      />);
}