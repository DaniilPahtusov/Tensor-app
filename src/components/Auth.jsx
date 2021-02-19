import React from 'react';
import InputInfo from './InputInfo';
import mainPNG from './images/main.jpg';
import './Auth.css';

export default function Auth(props) {
    return (
        <div>
            <div className="frukt-input-blocks">
                <div className="ws-ellipsis frukt-first-block">
                    <span className="frukt-login-name">Fruktogram</span>
                </div>
                <div className="frukt-login">
                    <InputInfo />
                    <div>
                        <a className="frukt-login-forgot frukt-link-decoration">Забыли пароль?</a>
                    </div>
                </div>
                <div>
                    <button className="frukt-login-button">
                        <span className="frukt-login-button-text" onClick={props.state.changeHistory}>Войти</span>
                    </button>
                </div>
                <div className="frukt-last-block">
                    <span className="frukt-login-none-text">Нет аккаунта?</span>
                    <button className="frukt-registr frukt-link-decoration">Зарегестрируйтесь!</button>
                </div>
            </div>
            <div>
                <div className="fruit-image-block ws-ellipsis">
                    <img className="fruit-image" src={mainPNG} />
                </div>
                <div className="fruit-image-back-block"></div>
            </div>
        </div>
    )
}