import axios from 'axios';

const UPDATE_LAST_MESSAGE = 'UPDATE-LAST-MESSAGE';
const SET_DIALOGS = 'SET_DIALOGS';
const ACTIVATE_DIALOG = 'ACTIVATE-DIALOG';
const UPDATE_ERROR = 'UPDATE-ERROR';
const ADD_NEW_DIALOG = 'ADD-NEW-DIALOG';

let initalState = {
    dialogsData: [],
    firstLoad: true,
    activeDialog: false,
    errorMessage: null
};

const dialogsReducer = (state = initalState, action) => {
    switch(action.type) {
        case UPDATE_LAST_MESSAGE: {
            return {
                ...state,
                dialogsData: state.dialogsData.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, message: action.message, fromMe: action.fromMe}
                    }
                    return user;
                })
            }
        }
        case SET_DIALOGS: {
            let stateCopy = {...state};
            stateCopy.dialogsData = action.dialogs;
            stateCopy.firstLoad = false;
            return stateCopy;
        }
        case ACTIVATE_DIALOG: {
            let stateCopy = {...state};
            stateCopy.activeDialog = action.active;
            return stateCopy;
        }
        case UPDATE_ERROR: {
            let stateCopy = {...state};
            stateCopy.errorMessage = action.message;
            return stateCopy;
        }
        case ADD_NEW_DIALOG: {
            let stateCopy = {...state};
            axios.post('http://127.0.0.1:5000/new_dialog', {
                login: action.currentLogin,
                recipient: action.login
            }).then((response) => {
                if (response.data.result) {
                } else {
                    if (response.data.errorMessage === 'Not existing recipient') {
                        stateCopy.errorMessage = 'Данный пользователь не зарегестрирован!';
                    }
                }
            });
        }
        default:
            return state
    }  
}

export const updateLastMessageAC = (userId, message, fromMe) => ({type: UPDATE_LAST_MESSAGE, userId, message, fromMe});
export const setDialogsAC = (dialogs) => ({type: SET_DIALOGS, dialogs});
export const activateDialog = (active) => ({type: ACTIVATE_DIALOG, active});
export const updateErrorMessage = (message) => ({type: UPDATE_ERROR, message});
export const addNewDialog = (login, currentLogin) => ({type: ADD_NEW_DIALOG, login, currentLogin});

export default dialogsReducer;