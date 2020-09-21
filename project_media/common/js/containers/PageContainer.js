import {connect} from 'react-redux'
import {userActions} from '../actions'
import Page from '../components/Page';

import {userConstants, dataConstants} from '../constants';

function mapStateToProps(state) {
  const {loginFailureReason} = state.authentication;
  const {data, fetchRemoteFailureReason} = state.initialData;
  const {currentResearchPage} = state.appData;

  return {
    loginFailureReason,
    fetchRemoteFailureReason,
    data,
    currentResearchPage
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginUser: (username, cookie) => {
      dispatch(userActions.loginUser(username, cookie))
    }
  }
}

const PageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)

export default PageContainer;
