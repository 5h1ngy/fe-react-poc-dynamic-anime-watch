import _ from 'lodash';
import { createSlice } from "@reduxjs/toolkit";

const favoritesContent = localStorage.getItem('favorites_content');

const initialState = {
    favorites: favoritesContent !== null
        ? JSON.parse(favoritesContent)
        : [],
}

const store = createSlice({
    name: 'routes/favorites',
    initialState,
    reducers: (create) => ({
        addFavorite: create.reducer((state, action) => {
            if (_.cloneDeep(state.favorites).filter(anime => _.isEqual(anime, action.payload.anime)).length === 0) {
                state.favorites.push(action.payload.anime)
                action.payload.callback(true)
            } else {
                action.payload.callback(false)
            }
        }),
        removeFavorite: create.reducer((state, action) => {
            state.favorites = _.cloneDeep(state.favorites)
                .filter(anime => !_.isEqual(anime, action.payload.anime));

            action.payload.callback(true)
        }),
    })
});

const { actions, reducer } = store;

export const { addFavorite, removeFavorite, setPagination } = actions;

export default { reducer, name: store.name };