
import { connect } from 'react-redux'
import { userActions, appActions, researchActions } from '../actions'
import PageResearch from '../components/PageResearch';

import { userConstants, dataConstants, researchConstants  } from '../constants';


function getPageById(state, id){
  const {initialData:{ data: {elements = {}} }}= state;

  const pagedata = elements['page_'+id] || {};
  return pagedata;

}
function mapStateToProps(state, ownProps) {
  const {id} = ownProps;
  const {initialData:{ data: {pageElements = {}, scripts} }}= state;
  //TODO only return data here for the specified page
  const pageData = getPageById(state, id);
  console.log('pageresearch container should get update on navigate - mapStateToProps', pageData, id )
    return {
      id,
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
        console.log('scriptCommand',payload)
        dispatch(researchActions.scriptCommand(payload))
      }
    }
  }

const PageResearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageResearch)

export default PageResearchContainer;

