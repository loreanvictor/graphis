import { createTheme } from '@codedoc/core/transport';


export const theme = /*#__PURE__*/createTheme({
  light: {
    primary: '#313552'
  },
  dark: {
    primary: '#e6f4ff',
    background: '#1b1d2b',
  },
  toc: {
    dark: {
      background: '#1a1c27',
      border: '#292b3e',
    }
  },
  code: {
    wmbar: false,
    light: {
      shadow: 'none',
    },
    dark: {
      shadow: 'none',
    }
  }
});
