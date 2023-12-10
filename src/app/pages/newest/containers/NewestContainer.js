import { connect } from "react-redux";

import { getStatuses, getTypes, getNewest } from "../store.js"
import { setPagination as setPaginationNewest, setStatusSelected, setTypeSelected } from "../store.js"
import { setFavorites, setPagination as setPaginationFavorites } from "../../favorties/store.js"

import Newest from "./Newest";

function mapStateToProps(state) {
    return state['routes/newest'];
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getNewest: (offset, size, opts = { status: undefined, type: undefined }) => dispatch(getNewest({
        offset, size, status: opts.status, type: opts.type
    })),
    getStatuses: () => dispatch(getStatuses()),
    getTypes: () => dispatch(getTypes()),
    setPaginationNewest: (payload) => dispatch(setPaginationNewest(payload)),
    setStatusSelected: (payload) => dispatch(setStatusSelected(payload)),
    setTypeSelected: (payload) => dispatch(setTypeSelected(payload)),
    setFavorites: (payload) => dispatch(setFavorites(payload)),
    setPaginationFavorites: (payload) => dispatch(setPaginationFavorites(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => ({
    state: stateProps,
    actions: dispatchProps,
    ...ownProps,
}))(Newest)