import React from 'react';

import DialogItem from './DialogItem/DialogItem';
import * as axios from 'axios';
import css from './Dialogs.module.css';

import Dialog from './AddDialog/AddDialog';

export default class Dialogs extends React.Component {
    constructor(props) {
        super(props);
        this.dialogClick = this.dialogClick.bind(this);
        this.activateDialog = this.activateDialog.bind(this);
        this.updateErrorMessage = this.updateErrorMessage.bind(this);
        this.addNewDialog = this.addNewDialog.bind(this);
        this.recursionUpdateMessage = this.recursionUpdateMessage.bind(this);
        this.recursionUpdateDialogs = this.recursionUpdateDialogs.bind(this);
    }
    
    active = false;
    callUpdateMessage = null;
    callUpdateDialogs = null;

    dialogClick(dialogID, name) {
        axios.post('http://127.0.0.1:5000/dialog', {
            dialogID: dialogID
        })
        .then((response) => {
            if (response.data.result) {
                this.props.setMessages(response.data.userInfo.messages, dialogID, name);
            }
        });
        if (this.callUpdateMessage) {
            clearInterval(this.callUpdateMessage);
        }
        this.callUpdateMessage = setInterval(this.recursionUpdateMessage, 1000, dialogID, name);
    }

    recursionUpdateMessage(dialogID, name) {
        axios.post('http://127.0.0.1:5000/dialog', {
            dialogID: dialogID
        })
        .then((response) => {
            if (response.data.result) {
                this.props.setMessages(response.data.userInfo.messages, dialogID, name);
            }
        });
    }

    recursionUpdateDialogs(userID) {
        axios.post('http://127.0.0.1:5000/dialogs', {
            userID
        })
        .then((response) => {
            if (response.data.result) {
                this.props.setDialogs(response.data.userInfo.dilogsData);
            }
        });
    }

    activateDialog(active) {
        this.props.activateDialog(active);
    }

    updateErrorMessage(message) {
        this.props.updateErrorMessage(message);
    }

    addNewDialog(newDialog) {
        this.props.addNewDialog(newDialog);
    }

    render() {
        let DialogData = [];
        if (!this.callUpdateDialogs) {
            this.props.setDialogs(this.props.userDialogs);
            this.callUpdateDialogs = setInterval(this.recursionUpdateDialogs, 3000, this.props.userID);
        }
        if (this.props.dialogsData) {
            DialogData = this.props.dialogsData.map((el) => 
                <DialogItem 
                    id={el.id} 
                    name={el.login}
                    message={el.last_message}
                    photoId={el.photoID}
                    sender={el.sender}
                    currentLogin={this.props.currentLogin}
                    dialogClick={this.dialogClick}
                    activeDialogId={this.props.activeDialogId}
                />
            );
        }
        return (
            <div className={css.dialogs}>
                <div>
                    {DialogData}
                </div>
                <div className={css.addNewDialogBlock}>
                    <button 
                        className={css.addNewDialog}
                        onClick={() => {this.activateDialog(true)}}
                        title="Добавить новый диалог">
                        <span className={css.buttonText}>+</span>
                    </button>
                </div>
                <Dialog 
                    active={this.props.activeDialog}
                    errorMessage={this.props.errorMessage}
                    activateDialog={this.activateDialog}
                    updateErrorMessage={this.updateErrorMessage}
                    currentLogin={this.props.currentLogin}
                    addNewDialog={this.addNewDialog}
                />
            </div>
        )
    }
}