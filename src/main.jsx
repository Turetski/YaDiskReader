import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from 'containers/App';

import configureStore from './store/configureStore';


const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter history={React.browserHistory}>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'),
);
