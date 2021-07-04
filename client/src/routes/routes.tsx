import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';
import LandingPage from 'pages/Landing/Landing';
import Dashboard from 'pages/Dashboard/Dashboard';
import AddJobDashboard from 'pages/Dashboard/AddJobDashboard';
import Results from 'pages/Results/Results';
import ResultInfo from 'pages/ResultInfo/ResultInfo';
import Login from 'pages/Login/Login';

const MainRouter: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute exact path="/" component={LandingPage} />
      <RestrictedRoute path="/account-login" component={Login} />

      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/dashboard/new" component={AddJobDashboard} />
      <PrivateRoute exact path="/result" component={ResultInfo} />
      <PrivateRoute exact path="/results/:jobId" component={Results} />

      <PublicRoute component={() => <div>404, page not found!</div>} />
    </Switch>
  </BrowserRouter>
);

export default MainRouter;
