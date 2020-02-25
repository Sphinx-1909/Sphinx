import React from 'react';
import { render } from 'react-dom';
//components
import App from './app';
//react-router-dom
import { BrowserRouter } from 'react-router-dom';
//redux
import { Provider } from 'react-redux';
//redux store
import Store from './redux/store';

render(
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
