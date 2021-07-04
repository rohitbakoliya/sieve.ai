import styled from 'styled-components';

export const DashboardWrapper = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CenterContainer = styled.div`
  padding: 30px 40px;
  width: 80%;
  align-items: center;
  background-color: ${p => p.theme.colors.offwhite};
  box-shadow: ${p => p.theme.shadows.small};
`;
