const ACTION_TYPE = {
    UPDATE_NEW_MESSAGE: 'UPDATE-NEW-MESSAGE',
    SEND_MESSAGE: 'SEND-MESSAGE',
    SET_MESSAGES: 'SET-MESSAGES'
}

const initialState = {
    messages: [],
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
                id: state.messages.length,
                fromMe: true,
                message: state.newMessage
            });
            stateCopy.newMessage = '';
            return stateCopy;
        }
        case ACTION_TYPE.SET_MESSAGES: {
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

export const sendMessageActionCreator = () => {
    return {
        type: ACTION_TYPE.SEND_MESSAGE
    }
}

export const setMessages = (messages) => ({type: ACTION_TYPE.SET_MESSAGES, messages});

export default messagesReducer;