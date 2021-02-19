import messagesReducer from './messagesReducer';
import dialogsReducer from './dialogsReducer';
import {combineReducers, createStore} from 'redux';

let reducers = combineReducers({
    messagesInfo: messagesReducer,
    dialogsInfo: dialogsReducer
});

let store = createStore(reducers);

export default store;