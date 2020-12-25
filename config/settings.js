const settings = {
  debug: {
    notifcations: false
  },
  theme: {
    dark: false,
    colors: {
      primary: '#000000',
      background: '#DBDBDB',
      card: 'rgb(255, 255, 255)',
      text: '#000000',
      border: 'rgb(199, 199, 204)',
    },
  },
  viewContainer: {
    style: {
      flex: 1,
      alignItems: 'stretch',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  },
  loadingScreen: {
    title: 'Exsampla',
    loadingTitle: 'Fetching survey data',
    loader: {
      color: '#666666',
      size: 'large',
    },
    style: {
      color: '#666666'
    }
  },
  auth: {
    use: true,
    authPassword: true,
    usernameText: 'Email',
    continueText: 'Next',
    validatedEmail: true,
    error: {
      windowBackgroundColor: 'rgba(255, 255, 255, .5)',
      overlayBackgroundColor: '#CCCCCC',
      setUsernameErrorMsg: {
        none: 'Please enter your Email',
        validatedEmail: 'Please enter a valid Email',
      },
      setPasswordErrorMsg: {
        none: 'Please enter your Password',
      },
      style: {
        fontWeight: 'normal',
        fontSize: 22,
        padding: 10,
        color: '#b40808'
      }
    },
    resetText: 'Reset Survey'
  },
  imageAssetsUrl: 'https://leanos.app/RT/images/',
  api: 'https://jw5p7mtbyj.execute-api.us-west-2.amazonaws.com/Prod/',
  pageTitles: {
    loading: 'LOADING',
    auth: 'SIGN IN',
    1: 'WELCOME',
    session: 'MEDITATION SESSION',
    10: 'THANK YOU'
  },
  authButtonsConfig: {
    icon: {
      name: 'label-variant',
      size: 28,
      color: '#f4511e',
    },
    titleStyle: {
      color: '#000000'
    },
    containerStyle: {
      marginTop: 20
    },
    style: {
      paddingVertical: 10,
      borderWidth: 2,
      borderColor: '#cccccc',

      backgroundColor: '#FFFFFF',
    },
  },
  buttonsConfig: {
    icon: {
      name: 'label-variant',
      size: 28,
      color: '#f4511e',
    },
    titleStyle: {
      color: '#000000'
    },
    containerStyle: {
      marginTop: 10,
      flex: 1,
      height: '100%'
    },
    style: {
      paddingVertical: 10,
      borderWidth: 2,
      borderColor: '#cccccc',

      backgroundColor: '#FFFFFF',
    }
  },
  selectorButtonsConfig: {
    icon: {
      name: 'label-variant',
      size: 28,
      color: '#f4511e',
    },
    titleStyle: {
      color: '#000000',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18
    },
    subTitleStyle: {
      color: '#000000',
      textAlign: 'center',
      fontSize: 14
    },
    containerStyle: {
      backgroundColor: '#FFFFFF',
      flex: 1,
      height: 100
    },
    colContStyle: {
      flexDirection: 'row',
      flex: 1
    },
    iconColStyle: {
      width: 40,
      alignItems: 'center',
      justifyContent: 'center'
    },
    style: {
      padding: 10,
      flexDirection: 'column',
      flex: 1,
      alignItems: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    },

    selectedTextStyle: {
      paddingVertical: 10,
    },
    backgroundContainerStyle: {
      flex: 1,

      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: 0,
      backgroundColor: '#DBDBDB'
    }
  },
  buttonLinksConfig: {
    icon: {
      name: 'information-variant',
      size: 28,
      color: '#000000',
    },
    titleStyle: {
      color: '#000000'
    },
    containerStyle: {
      flex: 1,
      backgroundColor: '#DBDBDB'
    },
    backgroundContainerStyle: {
      flex: 1,

      flexDirection: 'column',
      justifyContent: 'flex-start',

      backgroundColor: '#DBDBDB'
    },
    style: {
      backgroundColor: '#CCCCCC',
    },
  },
  buttonResearchConfig: {
    icon: {
      name: 'label-variant',
      size: 28,
      color: 'red',
    },
    titleStyle: {
      color: '#000000'
    },
    containerStyle: {
      flex: 1,
      height: '100%'
    },
    style: {
      borderWidth: 2,
      borderColor: '#cccccc',
      backgroundColor: '#FFFFFF',
    },
    buttonBar: {
      backgroundColor: '#DBDBDB',
      paddingTop: 20,
      paddingBottom: 40,

      flexDirection: 'row',
    },
  },
  header: {
    title: 'Welcome',
    style: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
  htmlText: {
    containerStyle: {
      minHeight: '10%',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 10,
      backgroundColor: '#DBDBDB',
      paddingTop: 20,
      paddingBottom: 20
    },
    tagsStyles: {
      p: {color: '#000000'},
      b: {color: '#000000'},
      i: {textAlign: 'center', fontStyle: 'italic', color: 'grey'},
    },
    classesStyles: {content: {fontSize: 18, color: '#000000'}}
  },
  slider: {
    viewContainer: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#FFFFFF'
    },
    thumbTintColor: '#f4511e',
    minimumTrackTintColor: '#9a9a9a',
    style: {
      track: {
        height: 14,
        borderRadius: 2,
        backgroundColor: 'white',
        borderColor: '#f4511e',
        borderWidth: 1,
      },
      thumb: {
        width: 30,
        height: 30,
        shadowColor: '#cccccc',
        shadowOffset: {width: -5, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 1
      }
    }
  },
  notifications: {
    startPage: 100,
    title: 'Exampla Questionnaire Request',
    message: 'Please complete the sample questions',
    dayRanges: [[9, 12], [12, 17], [17, 21]],
    minGap: 90
  },
  surveyDataSource: {
    expireInDays: 30
  }
}

export default settings;
