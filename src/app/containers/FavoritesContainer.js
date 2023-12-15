import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as favoritesActions from "app/store/favorites";
import Favorites from "./Favorites";

const mapStateToProps = (state) => ({
  ...state['routes/favorites']
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(favoritesActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => ({
  state: stateProps,
  actions: dispatchProps,
  ...ownProps,
}))(Favorites)