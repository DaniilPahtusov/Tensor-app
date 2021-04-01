import React from 'react';
import axios from 'axios';

import './AddDialog.css';

export default class Dialog extends React.Component {
    constructor() {
        super();
        this.addNewDialog = this.addNewDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }
    
    recipient = React.createRef();

    addNewDialog() {
        let recipientLogin = this.recipient.current.value;
        if (!recipientLogin) {
            this.props.updateErrorMessage('Пустое поле');
        } else {
            if (this.recipient.current.value === this.props.currentLogin) {
                this.props.updateErrorMessage('Вы не можете добавить сами себя!');
            } else {
                axios.post('http://127.0.0.1:5000/new_dialog', {
                    sender: this.props.currentLogin,
                    recipient: recipientLogin
                }).then((response) => {
                    if (response.data.result) {
                        let userInfo = response.data.userInfo;
                        this.props.addNewDialog({
                            id: userInfo.dialogID,
                            lastMessage: '',
                            photoId: userInfo.image,
                            login: userInfo.login,
                            sender: ''
                        });
                        this.props.activateDialog(false);
                        this.recipient.current.value = '';
                        this.props.updateErrorMessage('');
                    } else {
                        if (response.data.errorMessage === 'Not existing recipient') {
                            this.props.updateErrorMessage('Данный пользователь не зарегестрирован');
                        } else if (response.data.errorMessage === 'already existing dialog') {
                            this.props.updateErrorMessage('Вы уже общаетесь с этим пользователем');
                        }
                    }
                });
            }
        }
    }

    closeDialog() {
        this.props.activateDialog(false);
        this.recipient.current.value = '';
        this.props.updateErrorMessage('');
    }

    render() {
        return(
            <div className={this.props.active ? 'window active' : 'window'}>
                <div className={this.props.active ? 'content active' : 'content'}>
                    <div className='input'>
                        <div className='inputText'>
                            Введите логин друга: 
                        </div>
                        <div>
                            <input 
                                ref={this.recipient} 
                                className='inputBlock' />
                        </div>
                        <div className='errorTextBlock'>
                            <span className='errorText'>{this.props.errorMessage}</span>
                        </div>
                    </div>
                    <div className='buttons'>
                        <div className='button'>
                            <button className='cancelButton' onClick={this.closeDialog}>
                                <span className='buttonText'>
                                    Отменить
                                </span>
                            </button>
                        </div>
                        <div>
                            <button className='addButton' onClick={this.addNewDialog}>
                                <span className='buttonText'>
                                    Добавить
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}