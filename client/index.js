import React from 'react';
import { render } from 'react-dom';
//components
import App from './app';
//redux
import { Provider } from 'react-redux';
//React Router Dom
import { Router, Switch } from 'react-router-dom';
//redux store
import Store from './redux/store';
import history from './history';

render(
  <Provider store={Store}>
    <Router history={history}>
      <Switch>
        <App />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
