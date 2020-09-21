ResearchTitle
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import ConfigContext from '../contexts/configContext';

import HTML from "react-native-render-html";
import PropTypes from 'prop-types';
export default function ResearchTitle({ dataObject =[]}) {
  const settings = useContext(ConfigContext);
  const {tagsStyles, classesStyles, containerStyle } = settings.htmlText;

    if(Array.isArray(dataObject)){
      return (
        dataObject.map((item, i) =>{
        return (<View 
          key={i.toString()}
        style={containerStyle}
        >

          <HTML


            
            html={`<div class="content"> ${item.title}</div>`}
            tagsStyles={tagsStyles}
            classesStyles={classesStyles}
          />
        </View>

        )
       
      })
      )
    } else {
      return (<View style={containerStyle}>
          <HTML
            html={`<div class="content">${dataObject.title}</div>`}
            tagsStyles={tagsStyles}
            classesStyles={classesStyles}
          />

        </View>

      )
    }
}

ResearchTitle.propTypes = {
    dataObject: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  }
  