import * as ACTIONS from './Constants'

import { login as loginClick } from '../../admin/Components/apiCall'

export const logoutSuccess = () => {
    return {
        type: ACTIONS.LOGOUT_SUCCESS
    }
}

export const loginSuccess = authState => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState
    }
}

export const loginHandler = credentials => {
    return async function (dispatch) {
        const response = await loginClick(credentials);
        const authState = {
            ...response.data,
            userPassword: credentials.password
        }
        dispatch(loginSuccess(authState));

        return response;
    }
}