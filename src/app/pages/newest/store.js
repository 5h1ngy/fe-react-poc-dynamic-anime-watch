import _ from 'lodash';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "app/services/newest";

const initialState = {
    status: { selected: [], value: [], loading: false, },
    types: { selected: [], value: [], loading: false, },
    newest: { value: [], loading: false, },
    pagination: { size: 50, offset: 1, total: 0 }
}

export const getStatuses = createAsyncThunk(
    'routes/newest/GET.Statuses',
    async () => await api.getStatuses()
)

export const getTypes = createAsyncThunk(
    'routes/newest/GET.Types',
    async () => await api.getTypes()
)

export const getNewest = createAsyncThunk(
    'routes/newest/GET.Newest',
    async (payload) => {
        return await api.getNewest(payload.offset, payload.size, {
            status: payload.status,
            type: payload.type
        })
    }
)

const newestSlice = createSlice({
    name: 'routes/newest',
    initialState,
    reducers: (create) => ({
        setStatusSelected: create.reducer((state, action) => {
            if (!_.includes(_.cloneDeep(state.status.selected), action.payload)) {
                state.status.selected.push(action.payload)
            } else {
                state.status.selected = state.status.selected.filter(select => select !== action.payload)
            }
        }),
        setTypeSelected: create.reducer((state, action) => {
            if (!_.includes(_.cloneDeep(state.types.selected), action.payload)) {
                state.types.selected.push(action.payload)
            } else {
                state.types.selected = state.types.selected.filter(type => type !== action.payload)
            }
        }),
        setPagination: create.reducer((state, action) => {
            state.pagination = { ...action.payload }
        }),
    }),
    extraReducers: (builder) => {
        builder.addCase(getStatuses.pending, (state) => {
            state.status.loading = true;
        })
        builder.addCase(getStatuses.fulfilled, (state, action) => {
            state.status.loading = false;
            state.status.value = action.payload;
        })
        builder.addCase(getStatuses.rejected, (state) => {
            state.status.loading = false;
            state.status.value = [];
        })
        builder.addCase(getTypes.pending, (state,) => {
            state.types.loading = true;
        })
        builder.addCase(getTypes.fulfilled, (state, action) => {
            state.types.loading = false;
            state.types.value = action.payload;
        })
        builder.addCase(getTypes.rejected, (state,) => {
            state.types.loading = false;
            state.types.value = [];
        })
        builder.addCase(getNewest.pending, (state) => {
            state.newest.loading = true;
        })
        builder.addCase(getNewest.fulfilled, (state, action) => {
            state.newest.loading = false;
            state.newest.value = action.payload.data;
            state.pagination.total = action.payload.total;
        })
        builder.addCase(getNewest.rejected, (state) => {
            state.newest.loading = false;
            state.newest.value = [];
        })
    }
});

const { actions, reducer } = newestSlice;

export const { setPagination, setTypeSelected, setStatusSelected } = actions;

export default { reducer, name: newestSlice.name };