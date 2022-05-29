import { combineReducers } from 'redux'
import bugsReducer from './bugSlice'
const rootReducer=combineReducers({
    bugs:bugsReducer
})
export default rootReducer