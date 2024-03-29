import React from 'react';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import {setDialogsAC, activateDialog, updateErrorMessage, addNewDialog} from '../redux/dialogsReducer';
import {setMessages} from '../redux/messagesReducer';

let mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsInfo.dialogsData,
        activeDialog: state.dialogsInfo.activeDialog,
        errorMessage: state.dialogsInfo.errorMessage,
        userDialogs: state.userInfo.dialogs,
        currentLogin: state.userInfo.login,
        userID: state.userInfo.self_id,
        activeDialogId: state.messagesInfo.activeDialog
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setDialogs: (dialogs) => {
            dispatch(setDialogsAC(dialogs))
        },
        setMessages: (messages, dialogID, name) => {
            dispatch(setMessages(messages, dialogID, name))
        },
        activateDialog: (active) => {
            dispatch(activateDialog(active))
        },
        updateErrorMessage: (message) => {
            dispatch(updateErrorMessage(message));
        },
        addNewDialog: (newDialog) => {
            dispatch(addNewDialog(newDialog));
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;