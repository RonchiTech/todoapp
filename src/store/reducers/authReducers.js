import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isLoading: false,
    localId: null,
    idToken: null,
    expiresIn: null
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                localId: action.localId,
                idToken: action.idToken,
                expiresIn: action.expiresIn,
                error: null
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state;
    
    
    }
}
export default reducers;