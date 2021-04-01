import { connect } from 'react-redux';
import {
    updateLoginActionCreator, 
    updateErrorMessage, 
    updatePasswordActionCreator, 
    authorizationActionCreator, 
    activateDialog,
    updateRegLogin,
    updateRegPassword,
    updateRegPhoto,
    updateMainInfoUser} 
from '../redux/authReducer';
import Auth from './Auth';

let mapStateToProps = (state) => {
    return {
        login: state.userInfo.login,
        password: state.userInfo.password,
        activeDialog: state.userInfo.activeDialog,
        errorMessage: state.userInfo.errorMessage,
        photoSrc: state.userInfo.regPhoto,
        regLogin: state.userInfo.regLogin,
        regPassword: state.userInfo.regPassword
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChangePassword: (password) => {
            dispatch(updatePasswordActionCreator(password))
        },
        onChangeLogin: (login) => {
            dispatch(updateLoginActionCreator(login))
        },
        authorization: (history) => {
            dispatch(authorizationActionCreator(history))
        },
        activateDialog: (active) => {
            dispatch(activateDialog(active))
        },
        updateErrorMessage: (message) => {
            dispatch(updateErrorMessage(message));
        },
        updateRegLogin: (regLogin) => {
            dispatch(updateRegLogin(regLogin));
        },
        updateRegPassword: (regPassword) => {
            dispatch(updateRegPassword(regPassword));
        },
        updateRegPhoto: (regPhoto) => {
            dispatch(updateRegPhoto(regPhoto));
        },
        updateMainInfoUser: () => {
            dispatch(updateMainInfoUser());
        }
    }
}

const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth);

export default AuthContainer;