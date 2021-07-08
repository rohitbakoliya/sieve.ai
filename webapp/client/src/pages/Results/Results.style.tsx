import styled from 'styled-components';

export const ResultsWrapper = styled.div`
  min-height: 100%;
  padding: 20px 60px;
`;

export const RTableContainer = styled.div`
  margin: 20px auto;
  padding: 10px;
  background-color: #fafafa;
  box-shadow: ${p => p.theme.shadows.small};
`;

export const RButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
