import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar/Navbar';

const ChildrendWrapper = styled.main`
  background: ${p => p.theme.colors.accent};
  padding-top: 20px;
  min-height: calc(100vh - 50px);
  /* https://stackoverflow.com/a/21836870/11922517 */
  height: 1px; 
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
