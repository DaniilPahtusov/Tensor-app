import axios from 'axios';

const ACTION_TYPE = {
    UPDATE_LOGIN: 'UPDATE-LOGIN',
    UPDATE_PASSWORD: 'UPDATE-PASSWORD',
    AUTHORIZATION: 'AUTHORIZATION'
}

let initalState = {
    currentId: null,
    login: '',
    password: '',
    self_id: null,
    dialogs: []
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
            let stateCopy = {...state};
            axios.post('http://127.0.0.1:5000/login', {
                login: state.login,
                password: state.password
            }).then((response) => {
                if (response.data.result) {
                    stateCopy.dialogs = response.data.userInfo.dialogs;
                    stateCopy.self_id = response.data.userInfo._id;
                    action.history.push('/messanger');
                    return stateCopy;
                }
            });
            return stateCopy;
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

export const authorizationActionCreator = (history) => {
    return {
        type: ACTION_TYPE.AUTHORIZATION,
        history
    }
}

export default authReducer;