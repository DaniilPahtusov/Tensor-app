import axios from 'axios';

const ACTION_TYPE = {
    UPDATE_LOGIN: 'UPDATE-LOGIN',
    UPDATE_PASSWORD: 'UPDATE-PASSWORD',
    AUTHORIZATION: 'AUTHORIZATION',
    ACTIVATE_DIALOG: 'ACTIVATE-DIALOG',
    UPDATE_ERROR: 'UPDATE-ERROR',
    UPDATE_REG_LOGIN: 'UPDATE-REG-LOGIN',
    UPDATE_REG_PASSWORD: 'UPDATE-REG-PASSWORD',
    UPDATE_REG_PHOTO: 'UPDATE-REG-PHOTO',
    UPDATE_MAIN_INFO: 'UPDATE-MAIN-INFO'
}

let initalState = {
    currentId: null,
    login: '',
    password: '',
    self_id: null,
    dialogs: [],
    activeDialog: false,
    errorMessage: null,
    regLogin: '',
    regPassword: '',
    regPhoto: 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png'
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
        case ACTION_TYPE.UPDATE_REG_LOGIN: {
            let stateCopy = {...state};
            stateCopy.regLogin = action.regLogin;
            return stateCopy;
        }
        case ACTION_TYPE.UPDATE_REG_PASSWORD: {
            let stateCopy = {...state};
            stateCopy.regPassword = action.regPassword;
            return stateCopy;
        }
        case ACTION_TYPE.UPDATE_REG_PHOTO: {
            let stateCopy = {...state};
            stateCopy.regPhoto = action.regPhoto;
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
                    stateCopy.self_id = response.data.userInfo.userID;
                    action.history.push('/messanger');
                    return stateCopy;
                }
            });
            return stateCopy;
        }
        case ACTION_TYPE.ACTIVATE_DIALOG: {
            let stateCopy = {...state};
            stateCopy.activeDialog = action.active;
            return stateCopy;
        }
        case ACTION_TYPE.UPDATE_ERROR: {
            let stateCopy = {...state};
            stateCopy.errorMessage = action.message;
            return stateCopy;
        }
        case ACTION_TYPE.UPDATE_MAIN_INFO: {
            let stateCopy = {...state};
            stateCopy.login = stateCopy.regLogin;
            stateCopy.regLogin = stateCopy.regPassword = '';
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


export const activateDialog = (active) => ({type: ACTION_TYPE.ACTIVATE_DIALOG, active});
export const updateErrorMessage = (message) => ({type: ACTION_TYPE.UPDATE_ERROR, message});
export const updateRegLogin = (regLogin) => ({type: ACTION_TYPE.UPDATE_REG_LOGIN, regLogin});
export const updateRegPassword = (regPassword) => ({type: ACTION_TYPE.UPDATE_REG_PASSWORD, regPassword});
export const updateRegPhoto = (regPhoto) => ({type: ACTION_TYPE.UPDATE_REG_PHOTO, regPhoto});
export const updateMainInfoUser = () => ({type: ACTION_TYPE.UPDATE_MAIN_INFO});

export default authReducer;