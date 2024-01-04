import { configureStore, combineReducers } from "@reduxjs/toolkit";

import * as newest from "./newest.js";
import * as favoirites from "./favorites.js";
import * as toWatch from "./toWatch.js";

const store = configureStore({
    reducer: combineReducers({
        [newest.name]: newest.reducer,
        [favoirites.name]: favoirites.reducer,
        [toWatch.name]: toWatch.reducer,
    })
});

export default store;