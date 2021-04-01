import React from 'react';
import { connect } from 'react-redux';
import {updateNewMessageActionCreator, sendMessageActionCreator} from '../redux/messagesReducer';
import MainWindow from './Window';

let mapStateToProps = (state) => {
    return {
        messages: state.messagesInfo.messages,
        newMessage: state.messagesInfo.newMessage,
        currentLogin: state.userInfo.login,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendNewMessage: (sender) => {
            dispatch(sendMessageActionCreator(sender))
        },
        onChangeMessage: (text) => {
            dispatch(updateNewMessageActionCreator(text))
        }
    }
}

const WindowContainer = connect(mapStateToProps, mapDispatchToProps)(MainWindow);

export default WindowContainer;