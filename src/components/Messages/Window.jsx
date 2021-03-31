import React from 'react';
import css from './Window.module.css';
import Message from './Message/Message';

export default class MainWindow extends React.Component {
    constructor(props) {
        super();
    }

    newMessage = React.createRef();

    sendNewMessage = () => {
        this.props.sendNewMessage();
    }

    onChangeMessage = () => {
        let message = this.newMessage.current.value;
        this.props.onChangeMessage(message);
    }

    render() {

        let messagesData = this.props.messages.map((messageInfo) =>
            <Message messageInfo={messageInfo} currentLogin={this.props.currentLogin}/>
        );

        return (
            <div className={css.block}>
                <div className={css.window}>
                    {messagesData}
                </div>
                <div className={css.login}>
                    {this.props.currentLogin}
                </div>
                <div className={css.input}>
                    <input 
                        ref={this.newMessage} 
                        className={css.inputBlock} 
                        value={this.props.newMessage}
                        onChange={this.onChangeMessage}>
                    </input>
                    <button 
                        className={css.sendButton}
                        onClick={this.sendNewMessage}>
                        <span className={css.buttonText}>Отправить</span>
                    </button>
                </div>
            </div>
        );
    }
}