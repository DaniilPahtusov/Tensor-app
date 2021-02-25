import axios from 'axios';

const ACTION_TYPE = {
    UPDATE_LOGIN: 'UPDATE-LOGIN',
    UPDATE_PASSWORD: 'UPDATE-PASSWORD',
    AUTHORIZATION: 'AUTHORIZATION'
}

let initalState = {
    currentId: null,
    login: '',
    password: ''
};

const authReducer = (state = initalState, action) => {
    switch(action.type) {
        case ACTION_TYPE.UPDATE_LOGIN: {
            let stateCopy = {...state};
            stateCopy.login = action.login;
            return stateCopy;
        }
        case ACTION_TYPE.UPDATE_PASSWORD: {
            let stateCopy = {...state};
            stateCopy.password = action.password;
            return stateCopy;
        }
        case ACTION_TYPE.AUTHORIZATION: {
            axios.post('http://127.0.0.1:5000/login', {
                login: state.login,
                password: state.password
            }).then((response) => {
                if (response.data.result) {
                    window.location.pathname = '/messanger';
                }
            });
        }
        default:
            return state
    }  
}

export const updateLoginActionCreator = (login) => {
    return {
        type: ACTION_TYPE.UPDATE_LOGIN,
        login
    }
}

export const updatePasswordActionCreator = (password) => {
    return {
        type: ACTION_TYPE.UPDATE_PASSWORD,
        password
    }
}

export const authorizationActionCreator = () => {
    return {
        type: ACTION_TYPE.AUTHORIZATION
    }
}

export default authReducer;