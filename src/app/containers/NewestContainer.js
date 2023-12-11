import { connect } from "react-redux";

import { getStatuses, getTypes, getNewest } from "app/store/newest"
import { setPagination as setPaginationNewest, setStatus, setType } from "app/store/newest"
import { addFavorites, setPagination as setPaginationFavorites } from "app/store/favorites"
import { addToWatch, setPagination as setPaginationToWatch } from "app/store/toWatch"

import Newest from "./Newest";

const mapStateToProps = (state) => ({
    ...state['routes/newest']
})

const mapDispatchToProps = (dispatch, _ownProps) => ({

    /** newest Actions: REQUESTS */
    getNewest: (offset, size, opts = { statuses: undefined, type: undefined }) => {
        dispatch(getNewest({ offset, size, ...opts }))
    },
    getStatuses: () => {
        dispatch(getStatuses())
    },
    getTypes: () => {
        dispatch(getTypes())
    },

    /** newest Actions */
    setPaginationNewest: (payload) => {
        dispatch(setPaginationNewest(payload))
    },
    setStatus: (payload) => {
        dispatch(setStatus(payload))
    },
    setType: (payload) => {
        dispatch(setType(payload))
    },

    /** favorites Actions */
    addFavorites: (payload) => {
        dispatch(addFavorites(payload))
    },
    setPaginationFavorites: (payload) => {
        dispatch(setPaginationFavorites(payload))
    },

    /** toWatch Actions */
    addToWatch: (payload) => {
        dispatch(addToWatch(payload))
    },
    setPaginationToWatch: (payload) => {
        dispatch(setPaginationToWatch(payload))
    },
})

export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => ({
    state: stateProps,
    actions: dispatchProps,
    ...ownProps,
}))(Newest)