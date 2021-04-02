import React from 'react';
import ReactDOM from 'react-dom';
import css from './Window.module.css';
import Message from './Message/Message';
import emptyImage from './emptyImage.png';

export default class MainWindow extends React.Component {
    constructor(props) {
        super();
        this.sendNewMessage = this.sendNewMessage.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    newMessage = React.createRef();
    messagesData;
    oldMessages = [];
    needScrollBottom = false;

    sendNewMessage = () => {
        this.props.sendNewMessage(this.props.currentLogin);
        this.scrollToBottom();
    }

    scrollToBottom() {
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    onChangeMessage = () => {
        let message = this.newMessage.current.value;
        this.props.onChangeMessage(message);
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        if (this.needScrollBottom) {
            this.needScrollBottom = false;
            this.scrollToBottom();
        }
    }

    render() {
        if (this.props.messages) {
            if (this.props.messages.length === 0) {
                this.messagesData = 
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
                this.messagesData = this.props.messages?.map((messageInfo) =>
                    <Message messageInfo={messageInfo} currentLogin={this.props.currentLogin}/>
                );
                if (this.oldMessages.length !== this.messagesData.length) {
                    this.needScrollBottom = true;
                }
                this.oldMessages = this.messagesData;
            }
        }

        return (
            <div className={css.block}>
                <div className={css.window} ref={(el) => { this.messagesContainer = el; }}>
                    {this.messagesData}
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