import React from 'react';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import {setDialogsAC} from '../redux/dialogsReducer';

let mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsInfo.dialogsData
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setDialogs: (dialogs) => {
            dispatch(setDialogsAC(dialogs))
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;