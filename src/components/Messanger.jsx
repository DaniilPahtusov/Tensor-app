import React from 'react';

import DialogsContainer from './Dialogs/DialogsContainer';
import WindowContainer from './Messages/WindowContainer';

import css from './Messanger.module.css';

export default class Dialog extends React.Component {
    render() {
        return (
            <div className={css.objects}>
                <div className={css.dialogBlock}>
                    <DialogsContainer />
                </div>
                <div className={css.messagesBlock}>
                    <WindowContainer />
                </div>
                <div></div>
            </div>
        );
    }
}