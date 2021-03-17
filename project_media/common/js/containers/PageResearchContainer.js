import {connect} from 'react-redux'
import {userActions, appActions, researchActions} from '../actions'
import ResearchScreen from '../components/ResearchScreen';
import {userConstants, dataConstants, researchConstants} from '../constants';

function getPageById(state, id) {
  const {
    initialData: {
      data: {elements = {}},
    },
  } = state;

  const pagedata = Object.assign({},elements['page_' + id]);
  return pagedata;
}
function mapStateToProps(state) {
  const {
    initialData: {
      data: {
        pageElements = {},
        scripts,
        meta: {undefined: {start_page = '1', alert_page = '100', imageAssetsUrl} = {}} = {},
      } = {},
    } = {},
  } = state;



  const {currentResearchPage} = state.appData;

  const pageData = getPageById(state, currentResearchPage);


  return {
    currentResearchPage,
    pageData,
    scripts,
    imageAssetsUrl
  };
}

const mapDispatchToProps = dispatch => {
  return {
    navigateNext: id => {
      dispatch(appActions.currentResearchPage(id))
    },
    scriptCommand: payload => {
      dispatch(researchActions.scriptCommand(payload))
    }
  }
}

const PageResearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResearchScreen)

export default PageResearchContainer;
