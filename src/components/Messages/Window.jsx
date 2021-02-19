import React from 'react';
import css from './Window.module.css';
import Message from './Message/Message';

export default function MainWindow(props) {
    let newMessage = React.createRef();

    let sendNewMessage = () => {
        props.sendNewMessage();
    }

    let onChangeMessage = () => {
        let message = newMessage.current.value;
        props.onChangeMessage(message);
    }

    let messagesData = props.messages.map((messageInfo) =>
        <Message messageInfo={messageInfo}/>
    );

    return (
        <div className={css.block}>
            <div className={css.window}>
                {messagesData}
            </div>
            <div className={css.input}>
                <input 
                    ref={newMessage} 
                    className={css.inputBlock} 
                    value={props.newMessage}
                    onChange={onChangeMessage}>
                </input>
                <button onClick={sendNewMessage}>Click</button>
            </div>
        </div>
    );
}