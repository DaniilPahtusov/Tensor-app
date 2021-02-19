import React from 'react';
import './InputInfo.css';

const InputInfo = () => {
    return <div>
        <div className="frukt-login-first-input">
            <div className="frukt-login-title">Логин</div>
            <div>
                <input className="frukt-login-input"/>
            </div>
        </div>
        <div>
            <div className="frukt-login-title">Пароль</div>
            <div>
                <input className="frukt-login-input"/>
            </div>
        </div>
    </div>
}

export default InputInfo;