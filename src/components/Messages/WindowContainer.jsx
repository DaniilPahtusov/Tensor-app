import { connect } from 'react-redux';
import {updateNewMessageActionCreator, sendMessageActionCreator} from '../redux/messagesReducer';
import MainWindow from './Window';

let mapStateToProps = (state) => {
    return {
        messages: state.messagesInfo.messages,
        newMessage: state.messagesInfo.newMessage,
        currentLogin: state.userInfo.login,
        dialogsData: state.dialogsInfo.dialogsData,
        activeDialog: state.messagesInfo.activeDialog
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