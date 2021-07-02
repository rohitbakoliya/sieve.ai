import styled from 'styled-components';

export const ResultsWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RTableContainer = styled.div`
  padding: 30px 40px;
  width: 80%;
  align-items: center;
  background-color: #fafafa;
  box-shadow: ${p => p.theme.shadows.small};
`;
