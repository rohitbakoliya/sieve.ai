import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { StoreState } from 'store';

const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  const isAuthenticated = useSelector((state: StoreState) => state.auth.isAuthenticated);
  const checkingAuthStatus = useSelector((state: StoreState) => state.loading['auth/CHECK_AUTH']);
  console.log(isAuthenticated, checkingAuthStatus);
  // https://stackoverflow.com/a/56175010/11922517

  return checkingAuthStatus ? (
    <></>
  ) : isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  );
};

export default PrivateRoute;
