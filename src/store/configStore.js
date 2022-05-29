import {configureStore} from '@reduxjs/toolkit'
import ApiMiddleware from "./middleware/api";
import rootReducer from "./rootReducer";
const store=configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        ApiMiddleware
      ],})
export default store