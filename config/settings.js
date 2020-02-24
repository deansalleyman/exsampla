const settings = {
    auth:false,
    imageAssetsUrl:'https://leanos.app/RT/images/',
    api:'https://leanos.app/RT/',
    pageTitles:{
        auth: 'SIGN IN',
        1: 'WELCOME',
        session: 'MEDITATION SESSION'
    },
    header:{
        title: 'Welcome',
        style: {
            headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }}
    },
    htmlText:{
      tagsStyles: { b: { color: '#000000' }, i: { textAlign: 'center', fontStyle: 'italic', color: 'grey' } },
      classesStyles: { 'last-paragraph': { } }
   
    },
    slider:{
      thumbTintColor:'#f4511e',
      minimumTrackTintColor: '#9a9a9a',
      style:{

        track: {
          height: 14,
          borderRadius: 2,
          backgroundColor: 'white',
          borderColor:  '#f4511e',
          borderWidth: 1,
        },
        thumb: {
          width: 30,
          height: 30,
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.5,
          shadowRadius: 1,
        }
      }
    }
}

export default settings;
