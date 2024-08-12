import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthenticationContext from './frontend/shared/AuthenticationContext';
import { Provider } from 'react-redux';
import configureStore from '../src/frontend/redux/configureStore';



const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('wrapper'));
root.render(<Provider store={store}>
    <App />
</Provider>);


/*ReactDOM.render(
    <AuthenticationContext>
        <App />
    </AuthenticationContext>,
    document.getElementById('wrapper')
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
