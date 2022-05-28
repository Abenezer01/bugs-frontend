import {configureStore} from '@reduxjs/toolkit'
import bugsReducer from "./bugsReducer";
import ApiMiddleware from "./middleware/api";
const store=configureStore({
    reducer:bugsReducer,
    middleware:(getDefaultMiddleware)=>[...getDefaultMiddleware(),ApiMiddleware]
})
export default store