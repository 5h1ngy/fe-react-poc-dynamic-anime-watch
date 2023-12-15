import { configureStore, combineReducers } from "@reduxjs/toolkit";

import newest from "./newest.js";
import favoirites from "./favorites.js";
import toWatch from "./toWatch.js";

const store = configureStore({
    reducer: combineReducers({
        [newest.name]: newest.reducer,
        [favoirites.name]: favoirites.reducer,
        [toWatch.name]: toWatch.reducer,
    })
});

export default store;