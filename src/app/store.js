import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { store as newest } from "app/pages/newest";
import { store as favoirites } from "app/pages/favorties";

const store = configureStore({
    reducer: combineReducers({
        [newest.name]: newest.reducer,
        [favoirites.name]: favoirites.reducer,
    })
});

export default store;