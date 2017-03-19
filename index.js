import React from 'react';
import { render } from 'react-dom';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import fetchJson from 'lib/fetch-json';
import { addItems } from 'data/items';
import { initializeChromecastApi } from 'lib/cast-helpers';
import appStateReducer from 'data/app-state-reducer';
import App from 'components/app';

const logger = createLogger({
  collapsed: true,
  timestamp: false
});

const store = createStore(appStateReducer, {}, applyMiddleware(logger));

fetchJson('/disco/all').then((items) => store.dispatch(addItems(items)));

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.body
);

initializeChromecastApi();
