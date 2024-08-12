import * as ACTIONS from './Constants'

const defaultState = {
    isLoggedIn: false,
    userFirstName: undefined,
    userLastName: undefined,
    userName: undefined,
    userPassword: undefined,
    userMail: undefined,
    userCountry: undefined,
    userRegisterDate: undefined,
    userAbout: undefined,
    userSeller: undefined,
    coverImage_imageUrl: undefined,
    profileImage_imageUrl: undefined,
}

const authReducer = (state = { ...defaultState }, action) => {

    if (action.type === ACTIONS.LOGOUT_SUCCESS) {
        return defaultState;
    } else if (action.type === ACTIONS.LOGIN_SUCCESS) {
        return {
            ...action.payload,
            isLoggedIn: true
        }
    }
    return state;
};

export default authReducer;