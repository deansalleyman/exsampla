import { combineEpics } from 'redux-observable';
import fetchDataEpic from './fetchDataEpic';
import fetchInitialDataEpic from './fetchInitialDataEpic';
import scriptCommandEpic from './scriptCommandEpic';
import publishResearchEpic from './publishResearchEpic';



const rootEpic = combineEpics(
    fetchDataEpic,
    fetchInitialDataEpic,
    scriptCommandEpic,
    publishResearchEpic
);

export default rootEpic;
