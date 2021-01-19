import * as actionTypes from './actionTypes';
import axios from 'axios';


export const auth = () => {
    return dispatch => {
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]'
        let url2 = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]'
        axios.post()
    }
}