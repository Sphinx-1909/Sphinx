import React from 'react';
import { render } from 'react-dom';
//components
import App from './app';
//redux
import { Provider } from 'react-redux';
//React Router Dom
import { BrowserRouter, Switch } from 'react-router-dom';
//redux store
import Store from './redux/store';

render(
  <Provider store={Store}>
    <BrowserRouter>
      <Switch>
        <App />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
