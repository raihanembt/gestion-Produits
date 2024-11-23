import {combineReducers, legacy_createStore,applyMiddleware} from "redux";
import achatReducer from "./reducers/achatReducer";
import {thunk} from "redux-thunk"
const reducers=combineReducers({
    achatReducer:achatReducer
})
const store =legacy_createStore(reducers,applyMiddleware(thunk))
export default store