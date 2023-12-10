import { connect } from "react-redux";

import { addFavorites, setPagination as setPaginationFavorites } from "../store.js"

import Favorites from "./Favorites.jsx";

function mapStateToProps(state) {
    return state['routes/favorites'];
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    addFavorites: (payload) => dispatch(addFavorites(payload)),
    setPaginationFavorites: (payload) => dispatch(setPaginationFavorites(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => ({
    state: stateProps,
    actions: dispatchProps,
    ...ownProps,
}))(Favorites)