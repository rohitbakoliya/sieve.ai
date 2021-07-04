import { DefaultTheme } from 'styled-components';

const colors = {
  primary: '#2d057f',
  secondary: '#8464ec',
  light: '#433f70',
  accent: '#f6f6ffb3',
  black: '#24292E',
  gray: '#444444',
  white: '#fff',
  offwhite: '#f4f5ff',
};

const shadows = {
  xsmall: `0px 5px 10px rgba(0, 0, 0, 0.05)`,
  small: `0 5px 10px rgba(0, 0, 0, 0.1)`,
  medium: `0px 10px 10px rgba(0, 0, 0, 0.2)`,
};
const theme: DefaultTheme = {
  colors,
  shadows,
  border: `2px solid ${colors.offwhite}`,
  space: {
    none: 0,
    small: 5,
    medium: 10,
    large: 15,
    xlarge: 30,
    huge: 40,
  },
  spacings: {
    top: 40,
    bottom: 40,
    left: 25,
    right: 25,
    my: '20px',
    mx: '20px',
  },
};

export default theme;
