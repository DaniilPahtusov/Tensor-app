import React from 'react';

import DialogItem from './DialogItem/DialogItem';
import * as axios from 'axios';
import css from './Dialogs.module.css';

export default class Dialogs extends React.Component {
    constructor() {
        super();
        this.dialogClick = this.dialogClick.bind(this);
    }
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
            <div>
                {DialogData}
            </div>
        )
    }
}