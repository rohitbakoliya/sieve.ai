import React from 'react';
import { Router } from 'react-router';
import MainRouter from 'routes/routes';
import { history } from 'utils/history';
import GlobalStyles from './styles/global';

const App = () => {
  return (
    <React.Fragment>
      <Router history={history}>
        <MainRouter />
        <GlobalStyles />
      </Router>
    </React.Fragment>
  );
};

export default App;
