import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as toWatchActions from "app/store/toWatch";

const mapStateToProps = (state) => ({
  ...state['routes/toWatch']
})

const mapDispatchToProps = (dispatch) => {
  const toWatchActionCreators = bindActionCreators(toWatchActions, dispatch);

  return {
    toWatch: toWatchActionCreators,
  };
};

export default (Component) => connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => ({
  state: stateProps,
  actions: dispatchProps,
  ...ownProps,
}))(Component)