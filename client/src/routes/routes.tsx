import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import LandingPage from 'pages/Landing/Landing';
import Dashboard from 'pages/Dashboard/Dashboard';
import PublicRoute from './PublicRoute';

const MainRouter: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute exact path="/" component={LandingPage} />
      <PublicRoute exact path="/dashboard" component={Dashboard} />
      <PublicRoute component={() => <div>404, page not found!</div>} />
    </Switch>
  </BrowserRouter>
);

export default MainRouter;
