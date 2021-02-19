import React from 'react';

import DialogsContainer from './Dialogs/DialogsContainer';
import WindowContainer from './Messages/WindowContainer';

import css from './Messanger.module.css';

export default function Dialog() {
    return (
        <div className={css.objects}>
            <div className={css.dialogBlock}>
                <div className={css.dataBlock}>
                    <DialogsContainer />
                </div>
            </div>
            <div className={css.messagesBlock}>
                <WindowContainer />
            </div>
            <div></div>
        </div>
    );
}