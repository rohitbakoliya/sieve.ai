import styled from 'styled-components';

export const DashboardWrapper = styled.section`
  padding-top: 30px;
  min-height: 100%;
  background-color: ${p => p.theme.colors.offwhite};
  padding-bottom: 30px;
  button {
    margin: 0 auto;
    display: flex;
  }
`;

export const DashboardNWrapper = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CenterContainer = styled.div`
  margin: 0 auto;
  padding: 30px 40px;
  width: 80%;
  box-shadow: ${p => p.theme.shadows.small};
`;
