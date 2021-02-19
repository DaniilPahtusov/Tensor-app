const UPDATE_LAST_MESSAGE = 'UPDATE-LAST-MESSAGE';
const SET_DIALOGS = 'SET_DIALOGS';

let initalState = {
    dialogsData: []
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
            return {
                ...state,
                dialogsData: [ ...state.dialogsData, ...action.dialogs ]
            }
        }
        default:
            return state
    }
        
}

export const updateLastMessageAC = (userId, message, fromMe) => ({type: UPDATE_LAST_MESSAGE, userId, message, fromMe});
export const setDialogsAC = (dialogs) => ({type: SET_DIALOGS, dialogs});

export default dialogsReducer;