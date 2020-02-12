ResearchTitle
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import ConfigContext from '../contexts/configContext';

import HTML from "react-native-render-html";
import PropTypes from 'prop-types';
export default function ResearchTitle({ dataObject =[]}) {
  const settings = useContext(ConfigContext);
  const {tagsStyles, classesStyles } = settings.htmlText;


    if(Array.isArray(dataObject)){
      return (
        dataObject.map((item, i) =>{
        return (<View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>

          <HTML
            key={i.toString()}
            html={item.title}
            tagsStyles={tagsStyles}
            classesStyles={classesStyles}
          />
        </View>

        )
       
      })
      )
    } else {
      return (<View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
          <HTML
            html={dataObject.title}
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
  