import {SET_USER} from './actiontypes';
import { combineReducers } from "redux";

let defaultUserState = {
    currentUser : null
}

const userReducer = (state = defaultUserState, action) => {
    if (action.type === SET_USER) {
        let payload = action.payload;
        state = {...payload};
        return state;
    } else {
        return state;
    }
}

export const combinedReducers = combineReducers({user: userReducer})