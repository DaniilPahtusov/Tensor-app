import React from 'react';

import css from './Message.module.css';

export default function Message(props) {
    let message;
    if (props.messageInfo.fromMe) {
        message =
            <div className={css.fromMe}>
                {props.messageInfo.message}
            </div>
    } else {
        message = 
            <div className={css.notFromMe}>
                {props.messageInfo.message}
            </div>
    }
    
    return (
        message
    )
} 