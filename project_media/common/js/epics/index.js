import { combineEpics } from 'redux-observable';
import fetchInitialDataEpic from './fetchInitialDataEpic';
import scriptCommandEpic from './scriptCommandEpic';
import publishResearchEpic from './publishResearchEpic';



const rootEpic = combineEpics(
    fetchInitialDataEpic,
    scriptCommandEpic,
    publishResearchEpic
);

export default rootEpic;
