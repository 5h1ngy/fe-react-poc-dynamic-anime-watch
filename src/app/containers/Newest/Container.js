import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as newestActions from "app/store/newest";
import * as favoritesActions from "app/store/favorites";
import * as toWatchActions from "app/store/toWatch";

const mapStateToProps = (state) => ({
  ...state['routes/newest']
})

const mapDispatchToProps = (dispatch) => {
  const newestActionCreators = bindActionCreators(newestActions, dispatch);
  const favoritesActionCreators = bindActionCreators(favoritesActions, dispatch);
  const toWatchActionCreators = bindActionCreators(toWatchActions, dispatch);

  return {
    newest: newestActionCreators,
    favorites: favoritesActionCreators,
    toWatch: toWatchActionCreators,
  };
};

export default (Component) => connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => ({
  state: stateProps,
  actions: dispatchProps,
  ...ownProps,
}))(Component)