import React from 'react';
import './styles.css';
import MyComponent  from './my_component' ;
import NameElement from './name_component';
import ClockComponent from './clock_component';
import LoginControlComponent from './login_control_component';
import ArrayComponent from './array_component';

import App from './components/App';
import { setRemoteData } from './actions';

const name = 'Dean';

class AppHolder extends React.Component {
  constructor(props) {
    super(props);
   // console.log('props',this.props); //.getState()
    this.state = {date: new Date()};
    const item = {}

    item.userId = '1';
    item.id = '2';
    item.title = 'test';
    item.completed = true;
    const testData = [];
    testData.push(item);
  //  console.log('testData', testData);
   // this.props.setRemoteData(testData);

   this.props.fetchRemoteData();
   this.props.fetchInitialData();
  }

 

  render() {
     return <div>
          <h1>Hello World</h1>
          <ClockComponent />
          <NameElement />
          <MyComponent name="CAstro"/>
          <LoginControlComponent />
          <ArrayComponent />
          <App />
      </div>
  }
}
export default AppHolder;