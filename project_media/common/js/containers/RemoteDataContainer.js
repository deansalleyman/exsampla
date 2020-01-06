import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import DisplayData from '../components/DisplayData';



const mapStateToProps = state => {
  return {
    remoteData: state.remoteData
  }
}


const RemoteDataContainer = connect(
  mapStateToProps
)(DisplayData)

export default RemoteDataContainer;