import React from 'react';
import ReactDOM from 'react-dom';
import { store } from 'store';
import { checkAuth } from 'store/ducks';
import './styles/index.css';
import App from './App';

store.dispatch(checkAuth());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
