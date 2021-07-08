import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar/Navbar';

const ChildrendWrapper = styled.main`
  background: ${p => p.theme.colors.accent};
  min-height: calc(100vh - 50px);
  /* https://stackoverflow.com/a/21836870/11922517 */
  height: auto;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <ChildrendWrapper>{children}</ChildrendWrapper>
    </React.Fragment>
  );
};
export default Layout;
