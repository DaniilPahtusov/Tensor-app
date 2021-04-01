import React from 'react';
import axios from 'axios';

import './Registration.css';

export default class Registration extends React.Component {
    constructor() {
        super();
        this.registation = this.registation.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.onChangeRegLogin = this.onChangeRegLogin.bind(this);
        this.onChangeRegPassword = this.onChangeRegPassword.bind(this);
        this.onChangeRegPhoto = this.onChangeRegPhoto.bind(this);
    }
    
    login = React.createRef();
    password = React.createRef();
    photoSrc = React.createRef();

    onChangeRegLogin() {
        let newLogin = this.login.current.value;
        this.props.updateRegLogin(newLogin);
    }

    onChangeRegPassword() {
        let newPassword = this.password.current.value;
        this.props.updateRegPassword(newPassword);
    }

    onChangeRegPhoto() {
        let newPhoto = this.photoSrc.current.value;
        this.props.updateRegPhoto(newPhoto);
    }

    registation() {
        let login = this.login.current.value;
        let password = this.password.current.value;
        let image = this.photoSrc.current.value;
        if (!login) {
            this.props.updateErrorMessage('Пустой логин');
        } else if (!password) {
            this.props.updateErrorMessage('Пустой пароль');
        } else {
            axios.post('http://127.0.0.1:5000/registration', {
                login,
                password,
                image
            }).then((response) => {
                if (response.data.result) {
                    this.props.updateMainInfoUser();
                    this.props.history.push('/messanger');
                } else {
                    if (response.data.errorMessage === 'Already existing user') {
                        this.props.updateErrorMessage('Данный логин занят');
                    }
                }
            });
        }
    }

    closeDialog() {
        this.props.activateDialog(false);
        this.login.current.value = '';
        this.password.current.value = '';
        this.props.updateErrorMessage('');
    }

    render() {
        return(
            <div className={this.props.active ? 'window active' : 'window'}>
                <div className={this.props.active ? 'content_reg active' : 'content_reg'}>
                    <div className='inputInfoBlock'>
                        <div className='input'>
                            <div>
                                <div className='inputText'>
                                    Введите желаемый логин: 
                                </div>
                                <div>
                                    <input 
                                        ref={this.login} 
                                        className='inputBlock'
                                        value={this.props.regLogin} 
                                        onChange={this.onChangeRegLogin} />
                                </div>
                            </div>
                            <div className='inputPassword'>
                                <div className='inputText'>
                                    Введите пароль: 
                                </div>
                                <div>
                                    <input 
                                        ref={this.password} 
                                        className='inputBlock'
                                        value={this.props.regPassword} 
                                        onChange={this.onChangeRegPassword} />
                                </div>
                            </div>
                            <div className='errorTextBlock'>
                                <span className='errorText'>{this.props.errorMessage}</span>
                            </div>
                        </div>
                        <div className='inputPhotoBlock'>
                            <div className='photoBlock'>
                                <img className='photo' src={this.props.photoSrc}></img>
                            </div>
                            <div>
                            <div className='inputText'>
                                    Вставьте ссылку на фото: 
                                </div>
                                <div>
                                    <input 
                                        ref={this.photoSrc} 
                                        className='inputBlock'
                                        value={this.props.photoSrc} 
                                        onChange={this.onChangeRegPhoto} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='reg_buttons'>
                        <div className='reg_button'>
                            <button className='cancelButton' onClick={this.closeDialog}>
                                <span className='buttonText'>
                                    Отменить
                                </span>
                            </button>
                        </div>
                        <div>
                            <button className='regButton' onClick={this.registation}>
                                <span className='buttonText'>
                                    Зарегестрироваться
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}