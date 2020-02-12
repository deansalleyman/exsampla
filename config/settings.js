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
      tagsStyles: { b: { color: 'grey' }, i: { textAlign: 'center', fontStyle: 'italic', color: 'grey' } },
      classesStyles: { 'last-paragraph': { } }
   
    }
}

export default settings;
