
import { connect } from 'react-redux'
import { userActions, appActions, researchActions } from '../actions'
import ResearchScreen from '../components/ResearchScreen';
import { userConstants, dataConstants, researchConstants  } from '../constants';



function getPageById(state, id){
  const {initialData:{ data: {elements = {}} }}= state;

  const pagedata = elements['page_'+id] || {};
  return pagedata;

}
function mapStateToProps(state) {



  const {initialData:{ data: {pageElements = {}, scripts} }}= state;

  const { loginFailureReason } = state.authentication;
    const { data , fetchRemoteFailureReason} =  state.initialData;
    const { currentResearchPage} =  state.appData;

  //TODO only return data here for the specified page
  const pageData = getPageById(state, currentResearchPage);
  console.log('pageresearch container should get update on navigate - mapStateToProps')
    return {
      currentResearchPage,
      pageData,
      pagesArray: Object.keys(pageElements),
      scripts
    };
}

const mapDispatchToProps = dispatch => {
    return {
      onLoginUser: (username, cookie) => {
        dispatch(userActions.loginUser(username, cookie))
      },
      navigateNext: (id) => {

        console.log('navigateNext', id)
        dispatch(appActions.currentResearchPage(id))
      },
      addAnswer:(answer, id)=>{
        console.log('addAnswer',answer, id)
        dispatch(researchActions.addAnswer(answer,id))
      },
      completeResearch:(payload)=>{
        console.log('completeResearch',payload)
        dispatch(researchActions.completeResearch(payload))
      },
      scriptCommand: (payload)=>{
        // console.log('scriptCommand',payload)
        dispatch(researchActions.scriptCommand(payload))
      }
    }
  }

const PageResearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResearchScreen)

export default PageResearchContainer;

