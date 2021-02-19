import React from 'react';
import { connect } from 'react-redux';
import {updateNewMessageActionCreator, sendMessageActionCreator} from '../redux/messagesReducer';
import MainWindow from './Window';

let mapStateToProps = (state) => {
    return {
        messages: state.messagesInfo.messages,
        newMessage: state.messagesInfo.newMessage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendNewMessage: () => {
            dispatch(sendMessageActionCreator())
        },
        onChangeMessage: (text) => {
            dispatch(updateNewMessageActionCreator(text))
        }
    }
}

const WindowContainer = connect(mapStateToProps, mapDispatchToProps)(MainWindow);

export default WindowContainer;