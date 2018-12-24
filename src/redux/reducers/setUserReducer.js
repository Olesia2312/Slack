import * as actionTypes from '../actions/types';

const initialUserState = {
    currentUser: null,
    isLoading: true
};

const user = (state = initialUserState, action ) => {
    switch(action.type) {
        case actionTypes.SET_USER:
        return {
            currentUser: action.payload.currentUser,
            isLoading: false,
        }
        case actionTypes.CLEAR_USER:
            return {
                currentUser: null,
                isLoading: false,
            }
        default :
            return state;
    }
};

export default user;