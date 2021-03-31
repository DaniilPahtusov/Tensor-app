import React from 'react';

import './AddDialog.css';

export default class Dialog extends React.Component {
    constructor() {
        super();
        this.addNewDialog = this.addNewDialog.bind(this);
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
                this.props.addNewDialog(this.recipient.current.value);
            }
        }
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
                        <div>
                            <span className='errorText'>{this.props.errorMessage}</span>
                        </div>
                    </div>
                    <div className='buttons'>
                        <div className='button'>
                            <button className='cancelButton' onClick={() => {this.props.activateDialog(false)}}>
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