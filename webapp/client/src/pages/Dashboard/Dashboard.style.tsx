import styled from 'styled-components';

export const DashboardWrapper = styled.section`
  min-height: 100%;
  background-color: ${p => p.theme.colors.offwhite};
  padding: 30px 60px;
  button {
    margin: 0 auto;
    display: flex;
  }
`;

export const DashboardNWrapper = styled.section`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CenterContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  box-shadow: ${p => p.theme.shadows.small};
`;

export const CenterNContainer = styled.div`
  padding: 30px 40px;
  margin: 50px auto;
  width: 80%;
  box-shadow: ${p => p.theme.shadows.small};
`;
