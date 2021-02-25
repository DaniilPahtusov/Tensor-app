import { connect } from 'react-redux';
import {updateLoginActionCreator, updatePasswordActionCreator, authorizationActionCreator} from '../redux/authReducer';
import Auth from './Auth';

let mapStateToProps = (state) => {
    return {
        login: state.userInfo.login,
        password: state.userInfo.password
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
        authorization: () => {
            dispatch(authorizationActionCreator())
        }
    }
}

const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth);

export default AuthContainer;