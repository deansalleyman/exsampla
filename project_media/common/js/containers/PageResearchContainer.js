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

  const pagedata = elements['page_' + id] || {}
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

  const startPage = parseInt(start_page, 10);
  const alertPage = parseInt(alert_page, 10);

  const {loginFailureReason} = state.authentication;
  const {data, fetchRemoteFailureReason} = state.initialData;
  const {currentResearchPage} = state.appData;

  const pageData = getPageById(state, currentResearchPage);


  return {
    startPage,
    alertPage,
    currentResearchPage,
    pageData,
    pagesArray: Object.keys(pageElements),
    scripts,
    imageAssetsUrl
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginUser: (username, cookie) => {
      dispatch(userActions.loginUser(username, cookie))
    },
    navigateNext: id => {
      dispatch(appActions.currentResearchPage(id))
    },
    addAnswer: (answer, id) => {
      dispatch(researchActions.addAnswer(answer, id))
    },
    completeResearch: payload => {
      dispatch(researchActions.completeResearch(payload))
    },
    scriptCommand: payload => {
      dispatch(researchActions.scriptCommand(payload))
    },
    onLogOut: () => {
      dispatch(userActions.logOut())
    }
  }
}

const PageResearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResearchScreen)

export default PageResearchContainer;
