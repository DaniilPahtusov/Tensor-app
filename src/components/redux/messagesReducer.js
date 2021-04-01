import axios from 'axios';

const ACTION_TYPE = {
    UPDATE_NEW_MESSAGE: 'UPDATE-NEW-MESSAGE',
    SEND_MESSAGE: 'SEND-MESSAGE',
    SET_MESSAGES: 'SET-MESSAGES',
    UPDATE_MESSAGES: 'UPDATE-MESSAGES'
}

const initialState = {
    messages: [],
    activeDialog: null,
    name: '',
    newMessage: '123'
};

const messagesReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPE.UPDATE_NEW_MESSAGE: {
            let stateCopy = {...state};
            stateCopy.newMessage = action.newMessage;
            return stateCopy;
        }
        case ACTION_TYPE.SEND_MESSAGE: {
            let stateCopy = {...state};
            stateCopy.messages = [...state.messages];
            stateCopy.messages.push({
                login: action.sender,
                message: state.newMessage
            });
            stateCopy.newMessage = '';
            axios.post('http://127.0.0.1:5000/send_message', {
                sender: action.sender,
                recipient: state.name,
                dialogID: state.activeDialog,
                message: state.newMessage
            });
            return stateCopy;
        }
        case ACTION_TYPE.SET_MESSAGES: {
            let stateCopy = {...state};
            stateCopy.messages = action.messages;
            stateCopy.activeDialog = action.dialogID;
            stateCopy.name = action.name;
            return stateCopy;
        }
        case ACTION_TYPE.UPDATE_MESSAGES: {
            let stateCopy = {...state};
            stateCopy.messages = action.messages;
            return stateCopy;
        }
        default: 
            return state;
    }
}

export const updateNewMessageActionCreator = (message) => {
    return {
        type: ACTION_TYPE.UPDATE_NEW_MESSAGE,
        newMessage: message
    }
}

export const sendMessageActionCreator = (sender) => {
    return {
        type: ACTION_TYPE.SEND_MESSAGE,
        sender
    }
}

export const setMessages = (messages, dialogID, name) => ({type: ACTION_TYPE.SET_MESSAGES, messages, dialogID, name});

export default messagesReducer;