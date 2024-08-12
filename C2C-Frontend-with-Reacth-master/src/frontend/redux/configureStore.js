import { applyMiddleware, createStore, compose } from 'redux';
import authReducer from './authReducer';
import thunk from 'redux-thunk';

import SecureLS from 'secure-ls';

const secureLs = new SecureLS();

const getStateFromStore = () => {
    const C2CAuth = secureLs.get('C2C-auth');
    let stateInLocalStore = {
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
    };
    if (C2CAuth) {

        return C2CAuth;

    }
    return stateInLocalStore;
}

const updateStateInStore = newState => {
    secureLs.set('C2C-auth', newState);
}
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const configureStore = () => {

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer, getStateFromStore(), composeEnhancers(applyMiddleware(thunk)));
    store.subscribe(() => {
        updateStateInStore(store.getState())
    });
    return store;
}
export default configureStore;