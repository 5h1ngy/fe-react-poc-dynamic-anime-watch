import { configureStore, combineReducers } from "@reduxjs/toolkit";
import newest from "./newest";

const store = configureStore({
    reducer: combineReducers({
        [newest.name]: newest.reducer,
    })
});

export default store;