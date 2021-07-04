import React from 'react';
import { Router } from 'react-router';
import MainRouter from 'routes/routes';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { history } from 'utils/history';
import GlobalStyles from './styles/global';
import { store } from 'store';
import theme from 'config/theme';
import 'styles/App.less';

const App = () => {
  return (
    <React.Fragment>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <MainRouter />
            <GlobalStyles />
          </Router>
        </ThemeProvider>
      </StoreProvider>
    </React.Fragment>
  );
};

export default App;
