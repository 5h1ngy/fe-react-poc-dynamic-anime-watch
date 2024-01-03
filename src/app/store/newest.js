import _ from 'lodash';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "app/services/newest";

const initialState = {
    statuses: [],
    types: [],
    newest: [],
    loading: {
        statuses: false,
        types: false,
        newest: false,
    },
    searchForm: {
        statuses: [],
        types: [],
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
    async (payload) => await api.getNewest(payload.offset, payload.size, payload.types, payload.statuses)
)

const store = createSlice({
    name: 'routes/newest',
    initialState,
    reducers: (create) => ({
        setStatus: create.reducer((state, action) => {
            if (!_.includes(state.searchForm.statuses, action.payload)) {
                state.searchForm.statuses.push(action.payload)
            } else {
                state.searchForm.statuses = state.searchForm.statuses.filter(select => select !== action.payload)
            }
        }),
        setType: create.reducer((state, action) => {
            if (!_.includes(state.searchForm.types, action.payload)) {
                state.searchForm.types.push(action.payload)
            } else {
                state.searchForm.types = state.searchForm.types.filter(type => type !== action.payload)
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

export const { actions, reducer, name } = store;

export const { setPagination, setType, setStatus } = actions;
