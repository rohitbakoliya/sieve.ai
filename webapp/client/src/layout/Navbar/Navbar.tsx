import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { NavbarWrapper } from './Navbar.style';
import Logo from 'assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'store';
import { Button, message } from 'antd';
import { logoutUser } from 'store/ducks';

const Navbar: React.FC = () => {
  const isAuthenticated = useSelector((state: StoreState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    if (isAuthenticated) {
      dispatch(logoutUser())
        .then(() => {
          message.success(`Logged out successfully!`);
          history.push('/');
        })
        .catch((err: string) => {
          message.error(err);
        });
    } else {
      history.push('/account-login');
    }
  };

  return (
    <NavbarWrapper>
      <div className="brand__info">
        <img src={Logo} alt="app logo" height="25px" />
        Sieve.ai
      </div>
      <div className="nav__links">
        <NavLink to="/" exact>
          Home
        </NavLink>
        {isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}
        <Button type="link" size="large" onClick={handleClick}>
          {isAuthenticated ? 'Logout' : 'Login'}
        </Button>
      </div>
    </NavbarWrapper>
  );
};
export default Navbar;
