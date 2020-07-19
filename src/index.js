import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';

import App from './App';

const ReduxThunk = require('redux-thunk').default;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
