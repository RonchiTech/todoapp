import * as actionTypes from './actionTypes';
import axios from 'axios';


export const auth = (email,password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAgT-VC_Nmzn-SYCmxe8BhS6HjTzWaNlEw';
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAgT-VC_Nmzn-SYCmxe8BhS6HjTzWaNlEw'
        }
        axios.post(url,authData)
        .then(response => {
            localStorage.setItem('localId', response.data.localId)
            localStorage.setItem('idToken', response.data.idToken)
            localStorage.setItem('expiresIn', response.data.expiresIn)
            dispatch(authSuccess(response.data));
            
        })
        .catch(error => {
           dispatch(authFailed(error.response.data.error.message));
        })
    }
}
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = () => {
     const localId = localStorage.getItem('localId');
     const idToken = localStorage.getItem('idToken');
     const expiresIn = localStorage.getItem('expiresIn');
   return {
    type: actionTypes.AUTH_SUCCESS,
    localId: localId,
    idToken: idToken,
    expiresIn: expiresIn
   }
        
    
}

export const authFailed = (error) => {
  
 return {
     type: actionTypes.AUTH_FAILED,
     error
 }
    
}

export const logout = () => {
    return dispatch => {
        localStorage.clear();
        
    }
    
}

export const checkLogout = () => {

}