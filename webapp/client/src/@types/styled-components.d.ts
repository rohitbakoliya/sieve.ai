// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as styled from 'styled-components';

// extending default theme interface
declare module 'styled-components' {
  interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      light: string;
      black: string;
      white: string;
      offwhite: string;
      accent: string;
      gray: string;
    };
    shadows: {
      xsmall: string;
      small: string;
      medium: string;
    };
    space: {
      none: number;
      small: number;
      medium: number;
      large: number;
      xlarge: number;
      huge: number;
    };
    border: string;
    spacings: {
      top: number;
      bottom: number;
      left: number;
      right: number;
      my: string;
      mx: string;
    };
  }
}
