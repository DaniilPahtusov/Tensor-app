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
    }
    
    active = false;

    dialogClick(dialogID) {
        axios.post('http://127.0.0.1:5000/dialog', {
            dialogID: dialogID
        })
        .then((response) => {
            if (response.data.result) {
                this.props.setMessages(response.data.userInfo.messages);
            }
        });
    }

    activateDialog(active) {
        this.props.activateDialog(active);
    }

    updateErrorMessage(message) {
        this.props.updateErrorMessage(message);
    }

    addNewDialog(login) {
        this.props.addNewDialog(login, this.props.currentLogin);
    }

    render() {
        let DialogData = [];
        if (this.props.dialogsData) {
            DialogData = this.props.dialogsData.map((el) => 
                <DialogItem 
                    id={el.id} 
                    name={el.name}
                    message={el.lastMessage}
                    photoId={el.photoId}
                    sendLogin={el.sender}
                    currentLogin={this.props.currentLogin}
                    dialogClick={this.dialogClick}
                />
            );
        }
        return (
            <div className={css.dialogs}>
                <div>
                    {DialogData}
                </div>
                <div>
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