import {SET_USER, SET_CHANNEL} from './actiontypes';
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

let defaultChannelState = {
    currentChannel: null
}

const channelReducer = (state = defaultChannelState, action) => {
    if (action.type === SET_CHANNEL) {
        let payload = action.payload;
        state = {...payload};
        return state;
    } else {
        return state;
    }
}



export const combinedReducers = combineReducers({user: userReducer, channel : channelReducer})

//reducer job is to return a new state based on action
// need to set inital state!
// function reducer(state =[] , action) {
//     if (action.type == '...'){
//     return 
// }
// }