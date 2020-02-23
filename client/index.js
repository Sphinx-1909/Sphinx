import React from 'react';
import { render } from 'react-dom';
//components
import App from './app';
//react-router-dom
import { BrowserRouter } from 'react-router-dom';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
