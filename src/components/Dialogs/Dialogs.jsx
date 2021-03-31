import React from 'react';

import DialogItem from './DialogItem/DialogItem';
import * as axios from 'axios';
import css from './Dialogs.module.css';

export default class Dialogs extends React.Component {
    constructor() {
        super();
    }
    render() {
        let DialogData = [];
        if (this.props.dialogsData) {
            DialogData = this.props.dialogsData.map((el) => 
                <DialogItem 
                    id={el.name} 
                    name={el.name}
                    message={el.lastMessage}
                    photoId={el.photoId}
                    sendLogin={el.sender}
                    currentLogin={this.props.currentLogin}
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