import { combineReducers } from 'redux'
import bugsReducer from './bugSlice'
import cartSlice from './cartSlice'
import itemsSlice from './itemsSlice'

const rootReducer=combineReducers({
    bugs:bugsReducer,
    items:itemsSlice,
    carts:cartSlice
})
export default rootReducer