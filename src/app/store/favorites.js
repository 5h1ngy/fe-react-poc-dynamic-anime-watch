import _ from 'lodash';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: [],
    pagination: { size: 50, offset: 1, total: 0 }
}

const store = createSlice({
    name: 'routes/favorites',
    initialState,
    reducers: (create) => ({
        addFavorites: create.reducer((state, action) => {
            if (_.cloneDeep(state.favorites).filter(anime => _.isEqual(anime, action.payload)).length === 0) {
                state.favorites.push(action.payload)
            }
        }),
        setPagination: create.reducer((state, action) => {
            state.pagination = { ...action.payload }
        }),
    })
});

const { actions, reducer } = store;

export const { addFavorites, setPagination } = actions;

export default { reducer, name: store.name };