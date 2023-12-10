import _ from 'lodash';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toWatch: [],
    pagination: { size: 50, offset: 1, total: 0 }
}

const toWatch = createSlice({
    name: 'routes/toWatch',
    initialState,
    reducers: (create) => ({
        addToWatch: create.reducer((state, action) => {
            if (_.cloneDeep(state.toWatch).filter(anime => _.isEqual(anime, action.payload)).length === 0) {
                state.toWatch.push(action.payload)
            }
        }),
        setPagination: create.reducer((state, action) => {
            state.pagination = { ...action.payload }
        }),
    })
});

const { actions, reducer } = toWatch;

export const { addToWatch, setPagination } = actions;

export default { reducer, name: toWatch.name };