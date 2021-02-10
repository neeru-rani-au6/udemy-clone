import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./reducer/user";
import thunk from 'redux-thunk';
import videoReducer from './reducer/video';
import adminReducer from './reducer/admin';
const rootReducer = combineReducers({ userState: userReducer, videoReducer, adminReducer })
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;