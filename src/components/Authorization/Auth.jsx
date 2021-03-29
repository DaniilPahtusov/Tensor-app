import React from 'react';
import mainPNG from '../images/main.jpg';
import './Auth.css';

export default class Auth extends React.Component {
    constructor(props) {
        super();
    }
    
    login = React.createRef();
    password = React.createRef();

    onChangeLogin = () => {
        let newLogin = this.login.current.value;
        this.props.onChangeLogin(newLogin);
    }
    
    onChangePassword = () => {
        let newPassword = this.password.current.value;
        this.props.onChangePassword(newPassword);
    }
    
    authorization = () => {
        this.props.authorization(this.props.history);
    }

    render() {
        return (
            <div className="frukt-main-window">
                <div className="frukt-input-block-info">
                    <div className="ws-ellipsis frukt-first-block">
                        <span className="frukt-login-name">Fruktogram</span>
                    </div>
                    <div className="frukt-login">
                        <div className="frukt-login-first-input">
                            <div className="frukt-login-title">Логин</div>
                            <div>
                                <input
                                    ref={this.login} 
                                    value={this.props.login} 
                                    onChange={this.onChangeLogin}
                                    className="frukt-login-input"/>
                            </div>
                        </div>
                        <div>
                            <div className="frukt-login-title">Пароль</div>
                            <div>
                                <input 
                                    ref={this.password} 
                                    value={this.props.password} 
                                    onChange={this.onChangePassword}
                                    className="frukt-login-input"/>
                            </div>
                        </div>
                        <div>
                            <a className="frukt-login-forgot frukt-link-decoration">Забыли пароль?</a>
                        </div>
                    </div>
                    <div>
                        <button className="frukt-login-button"
                                onClick={this.authorization}>
                            <span 
                                className="frukt-login-button-text">
                                    Войти
                            </span>
                        </button>
                    </div>
                    <div className="frukt-last-block">
                        <span className="frukt-login-none-text">Нет аккаунта?</span>
                        <button className="frukt-registr frukt-link-decoration">Зарегестрируйтесь!</button>
                    </div>
                </div>
                <div className="frukt-input-block-image">
                    {/* <div className="fruit-image-block ws-ellipsis">
                        <img className="fruit-image" src={mainPNG} />
                    </div>
                    <div className="fruit-image-back-block"></div> */}
                </div>
            </div>
        )
    }
}