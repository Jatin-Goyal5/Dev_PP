import { combineReducers } from "redux";
import authReducer from './authReducer';
import educationReducer from './educationReducer';
import documentReducer from './documentReducer';
import contactReducer from './contactReducer';
import initialState from './initialState.json';
const appReducer = combineReducers({
    auth:authReducer,
    document :documentReducer,
    educationSection:educationReducer,
    contactSection :contactReducer,
})

const rootReducer = (state=initialState , action)=>{
    
    return appReducer(state,action);
}

export default rootReducer;