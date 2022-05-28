const { combineReducers } = require("redux");
import bugsReducer from './bugsReducer'
const rootReducer=combineReducers({
    bugs:bugsReducer
})
export default rootReducer