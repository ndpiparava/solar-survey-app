// emotion.d.ts
import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      background: string;
      text: string;
      primary: string;
      primaryHover: string;
      danger: string;
      border: string;
      label: string;
      spinnerTrack: string;
      spinner: string;
      success: string;
      info: string;
      warning: string;
    };
    fonts: {
      body: string;
      mono: string;
    };
    spacing: (factor: number) => string;
    radii: {
      sm: string;
      md: string;
      lg: string;
    };
    fontSizes: {
      sm: string;
      base: string;
      lg: string;
      xl: string;
    };
    fontWeights: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  }
}
