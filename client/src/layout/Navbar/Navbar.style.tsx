import styled from 'styled-components';

export const NavbarWrapper = styled.header`
  width: 100%;
  min-height: 50px;
  background-color: ${p => p.theme.colors.primary};
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  align-items: center;
  a {
    transition: 0.2s;
    &:hover {
      transform: scale(1.03);
      color: ${p => p.theme.colors.white};
    }
  }
  a,
  button {
    color: ${p => p.theme.colors.white};
    padding: 0 20px;
    font-size: 17px;
  }
  .brand__info {
    color: ${p => p.theme.colors.white};
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100px;
  }
`;
