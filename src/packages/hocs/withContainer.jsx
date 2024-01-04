import _ from 'lodash';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as newestActions from "app/store/newest";
import * as favoritesActions from "app/store/favorites";
import * as toWatchActions from "app/store/toWatch";

export default function withContainer(stateActionsList, statesList, WrappedComponent) {
    const mapStateToProps = (state) => {
        const localState = {};

        if (_.includes(statesList, 'newest')) {
            Object.assign(localState, { ...state['routes/newest'] })
        }
        if (_.includes(statesList, 'favorites')) {
            Object.assign(localState, { ...state['routes/favorites'] })
        }
        if (_.includes(statesList, 'toWatch')) {
            Object.assign(localState, { ...state['routes/toWatch'] })
        }

        return localState;
    }

    const mapDispatchToProps = (dispatch) => {
        const localActions = {};

        if (_.includes(stateActionsList, 'newest')) {
            const newestActionCreators = bindActionCreators(newestActions, dispatch);
            Object.assign(localActions, { newest: newestActionCreators })
        }
        if (_.includes(stateActionsList, 'favorites')) {
            const favoritesActionCreators = bindActionCreators(favoritesActions, dispatch);
            Object.assign(localActions, { favorites: favoritesActionCreators })
        }
        if (_.includes(stateActionsList, 'toWatch')) {
            const toWatchActionCreators = bindActionCreators(toWatchActions, dispatch);
            Object.assign(localActions, { toWatch: toWatchActionCreators })
        }

        return localActions;
    };

    return connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => ({
        state: stateProps,
        actions: dispatchProps,
        ...ownProps,
    }))(WrappedComponent)
}
