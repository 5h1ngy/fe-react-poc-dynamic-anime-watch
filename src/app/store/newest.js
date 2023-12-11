import _ from 'lodash';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "app/services/newest";

const initialState = {
    statuses: [],
    types: [],
    newest: [],
    filters: {
        statuses: [],
        types: [],
    },
    loading: {
        statuses: false,
        types: false,
        newest: false,
    },
    pagination: {
        size: 50,
        offset: 1,
        total: 0
    },
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
            statuses: payload.statuses,
            type: payload.type
        })
    }
)

const store = createSlice({
    name: 'routes/newest',
    initialState,
    reducers: (create) => ({
        setStatus: create.reducer((state, action) => {
            if (!_.includes(state.filters.statuses, action.payload)) {
                state.filters.statuses.push(action.payload)
            } else {
                state.filters.statuses = state.filters.statuses.filter(select => select !== action.payload)
            }
        }),
        setType: create.reducer((state, action) => {
            if (!_.includes(state.filters.types, action.payload)) {
                state.filters.types.push(action.payload)
            } else {
                state.filters.types = state.filters.types.filter(type => type !== action.payload)
            }
        }),
        setPagination: create.reducer((state, action) => {
            state.pagination = { ...action.payload }
        }),
    }),
    extraReducers: (builder) => {
        builder.addCase(getStatuses.pending, (state) => {
            state.loading.statuses = true;
        })
        builder.addCase(getStatuses.fulfilled, (state, action) => {
            state.loading.statuses = false;
            state.statuses = action.payload;
        })
        builder.addCase(getStatuses.rejected, (state) => {
            state.loading.statuses = false;
            state.statuses = [];
        })

        builder.addCase(getTypes.pending, (state,) => {
            state.loading.types = true;
        })
        builder.addCase(getTypes.fulfilled, (state, action) => {
            state.loading.types = false;
            state.types = action.payload;
        })
        builder.addCase(getTypes.rejected, (state,) => {
            state.loading.types = false;
            state.types = [];
        })

        builder.addCase(getNewest.pending, (state) => {
            state.loading.newest = true;
        })
        builder.addCase(getNewest.fulfilled, (state, action) => {
            state.loading.newest = false;
            state.newest = action.payload.data;
            state.pagination.total = action.payload.total;
        })
        builder.addCase(getNewest.rejected, (state) => {
            state.loading.newest = false;
            state.newest = [];
        })
    }
});

const { actions, reducer } = store;

export const { setPagination, setType, setStatus } = actions;

export default { reducer, name: store.name };