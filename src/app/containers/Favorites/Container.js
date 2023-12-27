import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as favoritesActions from "app/store/favorites";

const mapStateToProps = (state) => ({
  ...state['routes/favorites']
})

const mapDispatchToProps = (dispatch) => {
  const favoritesActionCreators = bindActionCreators(favoritesActions, dispatch);

  return {
    favorites: favoritesActionCreators,
  };
};

export default (Component) => connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => ({
  state: stateProps,
  actions: dispatchProps,
  ...ownProps,
}))(Component)