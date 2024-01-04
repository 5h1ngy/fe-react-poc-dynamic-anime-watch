import _ from 'lodash';
import { createSlice } from "@reduxjs/toolkit";

const toWatchContent = localStorage.getItem('toWatch_content');
const inProgressContent = localStorage.getItem('inProgress_content');
const completeContent = localStorage.getItem('complete_content');

const initialState = {
    toWatch: toWatchContent !== null
        ? JSON.parse(toWatchContent)
        : [],
    inProgress: inProgressContent !== null
        ? JSON.parse(inProgressContent)
        : [],
    complete: completeContent !== null
        ? JSON.parse(completeContent)
        : [],
}

const store = createSlice({
    name: 'routes/toWatch',
    initialState,
    reducers: (create) => ({
        addToWatch: create.reducer((state, action) => {
            if (_.cloneDeep(state.toWatch).filter(anime => _.isEqual(anime, action.payload.anime)).length === 0) {
                state.toWatch.push(action.payload.anime)
                if (action.payload?.callback) action.payload.callback(true)
            } else {
                if (action.payload?.callback) action.payload.callback(false)
            }
        }),
        removeToWatch: create.reducer((state, action) => {
            state.toWatch = _.cloneDeep(state.toWatch).filter(anime => !_.isEqual(anime, action.payload.anime));
            if (action.payload?.callback) action.payload.callback(true)
        }),

        addInProgress: create.reducer((state, action) => {
            if (_.cloneDeep(state.inProgress).filter(anime => _.isEqual(anime, action.payload.anime)).length === 0) {
                state.inProgress.push(action.payload.anime)
                if (action.payload?.callback) action.payload.callback(true)
            } else {
                if (action.payload?.callback) action.payload.callback(false)
            }
        }),
        removeInProgress: create.reducer((state, action) => {
            state.inProgress = _.cloneDeep(state.inProgress).filter(anime => !_.isEqual(anime, action.payload.anime));
            if (action.payload?.callback) action.payload.callback(true)
        }),

        addComplete: create.reducer((state, action) => {
            if (_.cloneDeep(state.complete).filter(anime => _.isEqual(anime, action.payload.anime)).length === 0) {
                state.complete.push(action.payload.anime)
                if (action.payload?.callback) action.payload.callback(true)
            } else {
                if (action.payload?.callback) action.payload.callback(false)
            }
        }),
        removeComplete: create.reducer((state, action) => {
            state.complete = _.cloneDeep(state.complete).filter(anime => !_.isEqual(anime, action.payload.anime));
            if (action.payload?.callback) action.payload.callback(true)
        }),
    })
});

export const { actions, reducer, name } = store;

export const {
    addToWatch, removeToWatch,
    addInProgress, removeInProgress,
    addComplete, removeComplete
} = actions;
