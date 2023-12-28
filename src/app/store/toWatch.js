import _ from 'lodash';
import { createSlice } from "@reduxjs/toolkit";

const toWatchContent = localStorage.getItem('toWatch_content');

const initialState = {
    toWatch: toWatchContent !== null
        ? JSON.parse(toWatchContent)
        : [],
}

const store = createSlice({
    name: 'routes/toWatch',
    initialState,
    reducers: (create) => ({
        addToWatch: create.reducer((state, action) => {
            if (_.cloneDeep(state.toWatch).filter(anime => _.isEqual(anime, action.payload.anime)).length === 0) {
                state.toWatch.push(action.payload.anime)
                action.payload.callback(true)
            } else {
                action.payload.callback(false)
            }
        }),
        removeToWatch: create.reducer((state, action) => {
            state.toWatch = _.cloneDeep(state.toWatch)
                .filter(anime => !_.isEqual(anime, action.payload.anime));

            action.payload.callback(true)
        }),
    })
});

const { actions, reducer } = store;

export const { addToWatch, removeToWatch } = actions;

export default { reducer, name: store.name };