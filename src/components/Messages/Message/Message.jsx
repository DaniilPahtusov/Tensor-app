import React from 'react';

import css from './Message.module.css';

export default class Message extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        let message;
        if (this.props.currentLogin === this.props.messageInfo.login) {
            message =
                <div className={css.fromMe}>
                    <div className={css.text}>{this.props.messageInfo.message}</div>
                </div>
        } else {
            message = 
                <div className={css.notFromMe}>
                    <div className={css.text}>{this.props.messageInfo.message}</div>
                </div>
        }
        
        return (
            message
        )
    }
} 