import React from 'react';
import css from './Window.module.css';
import Message from './Message/Message';
import emptyImage from './emptyImage.png';

export default class MainWindow extends React.Component {
    constructor(props) {
        super();
    }

    newMessage = React.createRef();

    sendNewMessage = () => {
        this.props.sendNewMessage(this.props.currentLogin);
    }

    onChangeMessage = () => {
        let message = this.newMessage.current.value;
        this.props.onChangeMessage(message);
    }

    render() {
        let messagesData;
        if (this.props.messages) {
            if (this.props.messages.length === 0) {
                messagesData = 
                <div className={css.emptyBlock}>
                    <div className={css.emptyText}>
                        <div>
                            У вас пока нет ни одного сообщения с данным пользователем.
                        </div>
                        <div className={css.startChatText}>
                            Начните общение первым :)
                        </div>
                        <img
                            src={emptyImage} 
                            className={css.emptyImage}></img>
                    </div>
                </div>
            } else {
                messagesData = this.props.messages?.map((messageInfo) =>
                    <Message messageInfo={messageInfo} currentLogin={this.props.currentLogin}/>
                );
            }
        }

        return (
            <div className={css.block}>
                <div className={css.window}>
                    {messagesData}
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