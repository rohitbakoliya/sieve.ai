import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html, body {
    font-size: calc(12px + 0.4vw);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: inherit;
    height: 100vh;
    color: ${p => p.theme.colors.black};
    background: ${p => p.theme.colors.white};
  }

  input, button, select, textarea, optgroup, option {
    font-family: inherit;
    font-weight: inherit;
    font-size: 14px;
    color: ${p => p.theme.colors.black};
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.5em;
    font-family: inherit;
    font-weight: inherit;
  }

  p {
    font-size: 16px;
  }

  a {
    text-decoration: none;
    color: ${p => p.theme.colors.secondary};
    &:hover{
      color: ${p => p.theme.colors.primary};
    }
  }
`;

export default GlobalStyles;
