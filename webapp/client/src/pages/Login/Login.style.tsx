import styled from 'styled-components';

export const LoginWrapper = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormsContainer = styled.div`
  width: 450px;
  padding: 50px;
  background-color: ${p => p.theme.colors.offwhite};
  box-shadow: ${p => p.theme.shadows.small};
`;
