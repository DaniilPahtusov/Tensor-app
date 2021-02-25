import messagesReducer from './messagesReducer';
import dialogsReducer from './dialogsReducer';
import authReducer from './authReducer';
import {combineReducers, createStore} from 'redux';

let reducers = combineReducers({
    messagesInfo: messagesReducer,
    dialogsInfo: dialogsReducer,
    userInfo: authReducer
});

let store = createStore(reducers);

export default store;