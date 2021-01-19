import * as actionTypes from './actionTypes';
import axios from 'axios';


export const auth = (values, isSignUp) => {
    return dispatch => {
        const key = 'AIzaSyAgT-VC_Nmzn-SYCmxe8BhS6HjTzWaNlEw'
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
        if(!isSignUp){
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`
        }
        axios.post(url,values)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        })
    }
}