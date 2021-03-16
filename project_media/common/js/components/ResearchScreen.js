import React, {useState, useEffect, useContext} from 'react'

import {View, Text, Button, Linking} from 'react-native'

import ConfigContext from '../contexts/configContext'

import keys from 'lodash/keys'
import get from 'lodash/get'
import find from 'lodash/find'
import isUndefined from 'lodash/isUndefined'
import isNumber from 'lodash/isNumber'
import isEmpty from 'lodash/isEmpty';
import qs from 'qs'

import ResearchTitle from './ResearchTitle'
import ResearchAnswerSlider from './ResearchAnswerSlider'
import ResearchAnswerText from './ResearchAnswerText'
import ResearchButton from './ResearchButton'
import ResearchButtonBar from './ResearchButtonBar'
import ResearchLink from './ResearchLink'
import PropTypes from 'prop-types'
import ResearchLogo from './ResearchLogo'
import SelectorButtons from './SelectorButtons'

export default function ResearchScreen(props) {
  const settings = useContext(ConfigContext)

  const {pageTitles = {}, viewContainer = {}, auth = {}} = settings

  const {
    navigation,
    pageData = {},
    scripts,
    navigateNext,
    scriptCommand,
    imageAssetsUrl
  } = props

  useEffect(() => {
    const {currentResearchPage} = props

    const PageTitle = pageTitles[currentResearchPage]
      ? pageTitles[currentResearchPage]
      : pageTitles['session']

    changeThisTitle(PageTitle);
  }, [props.currentResearchPage])

  const [answer, setAnswer] = useState()
  const [forkGoto, setForkGoto] = useState()

  changeThisTitle = titleText => {
    navigation.setOptions({title: titleText})
  };

  handleLink = (url = '', e) => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
        } else {
          return Linking.openURL(url)
        }
      })
      .catch(err => console.error('An error occurred', err))
  }
  /**
   * handleScript
   * value: <string> = "save?var=alert2&goto=110" | "saveFatigued" | "103"
   */
  handleScript = (value = '', e) => {
    const params = value.split(/[?]+/)
    /**
     * scriptKey = save | saveFatigued
     * if scriptKey = save then parsed = { goto: "110", var: "alert2" }
     */
    const [scriptKey, path] = params
    const parsed = qs.parse(path, {ignoreQueryPrefix: true})
    /**
     * The looked up script found from loaded data obj
     */
    const selected = Object.assign({}, scripts[scriptKey])
    // branch the code to decide if navigation save var or combination of both

    /**
     * If there has been a standard go to page index integer passed
     */
    const gotoStandard = parseInt(value, 10)

    if (!isEmpty(selected)) {
      /**
     * selected:
        id: "save"
        script: [
        save: {var: "%var%"},
        goto: {id: "%goto%"}
      ]
     */
      const selectedEnriched = selected.script.map(item => {
        /**
         * theKey
         * Top level command of each script item ie.
         * 'save' | 'goto' | 'submit'
         */
        const [theKey = ''] = keys(item)
        /**
         * theTarget
         * each sub item of script array ie.
         * for theKey = 'save' the Target= {var: "%var%"}
         */
        const theTarget = Object.assign({}, item[theKey])
        /**
         * valueKey
         * the 1st key of theTarget object ie.
         * 'var'
         */
        const [valueKey = {}] = keys(theTarget)
        /**
         * lookUpkeyVar
         * The value of the theTarget object ie.
         * '%var%'
         */
        const lookUpkeyVar = theTarget[valueKey] || ''
        /**
         * lookUpkey
         * The parsed value of lookUpkeyVar ie.
         * 'var'
         */
        const lookUpkey = lookUpkeyVar.replace(/%/gi, '')

        // NOTE needs to handle timer script command
        // so only set if parsed to send?
        if (!isEmpty(parsed) && parsed.hasOwnProperty(lookUpkey)) {
          theTarget[valueKey] = parsed[lookUpkey]
        }

        if (theKey == 'save' && !isUndefined(answer)) {
          theTarget.answer = answer
          // reset answer
          setAnswer(undefined);
        }

        if (lookUpkey == 'goto' && !isUndefined(forkGoto)) {
          theTarget.id = forkGoto
          // reset goto page
          setForkGoto(undefined);

      }

        return {[theKey]: theTarget}
      })
      const answerSession =
        find(selectedEnriched, 'save') &&
        find(selectedEnriched, 'goto') &&
        !find(selectedEnriched, 'timer')


      const {save:{answer:answered} = {}} = find(selectedEnriched, 'save') || {};

      // Only proceed if an answer has been set
      if ((answerSession && !isUndefined(answered)) || !answerSession ){
        scriptCommand({id: selected.id, script: selectedEnriched})
      }
    } else if (isNumber(gotoStandard)){
      // simply page number as a string parsed from script 'goto'

      navigateNext(gotoStandard)
    }
  }

  return (
    <View style={viewContainer.style}>
      {pageData && pageData.logo && imageAssetsUrl && (
        <ResearchLogo dataObject={pageData.logo} imageAssetsUrl={imageAssetsUrl} />
      )}

      {pageData && pageData.title && (
        <ResearchTitle dataObject={pageData.title} />
      )}

      {pageData.v_slider && (
        <ResearchAnswerSlider
          dataObject={pageData.v_slider}
          handleAnswer={setAnswer}
        />
      )}

      {pageData && pageData.text && (
        <ResearchAnswerText
          dataObject={pageData.text}
          handleAnswer={setAnswer}
        />
      )}

      {pageData && pageData.selector && (
        <SelectorButtons
          dataObject={pageData.selector}
          setForkGoto={setForkGoto}
          handleAnswer={setAnswer}
        />
      )}

      {pageData && pageData.link && (
        <ResearchLink dataObject={pageData.link} handleLink={handleLink} />
      )}


      {pageData && pageData.button && (
        <ResearchButton
          dataObject={pageData.button}
          handleScript={handleScript}
        />
      )}
      {pageData && pageData.button_bar && pageData.button_bar.button_bar && (
        <ResearchButtonBar
          dataObject={pageData.button_bar.button_bar}
          handleScript={handleScript}
        />
      )}





      </View>
  )
}
