import { createTheme } from '@mui/material/styles';

export const palette = {
  ink: '#1A1A1A',
  cream: '#F6F6F4',
  terracotta: '#7B2C3A',
  sage: '#757575',
  sand: '#E0E0E0',
  paper: '#EEEEEE',
};

const theme = createTheme({
  palette: {
    primary: {
      main: palette.terracotta,
    },
    secondary: {
      main: palette.sage,
    },
    background: {
      default: palette.cream,
      paper: palette.paper,
    },
    text: {
      primary: palette.ink,
    },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: {
      fontFamily: '"Instrument Serif", serif',
      fontSize: '4rem',
      lineHeight: 1.3,
    },
    h2: {
      fontFamily: '"Instrument Serif", serif',
      fontSize: '2.75rem',
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: '"Instrument Serif", serif',
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: '"Instrument Serif", serif',
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: '"Instrument Serif", serif',
      lineHeight: 1.3,
    },
    h6: {
      fontFamily: '"Instrument Serif", serif',
      lineHeight: 1.3,
    },
    body1: {
      fontFamily: '"DM Sans", sans-serif',
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: '"DM Sans", sans-serif',
      lineHeight: 1.7,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          textTransform: 'none',
          borderRadius: 4,
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: palette.terracotta,
          color: palette.cream,
          '&:hover': {
            backgroundColor: '#A03A24',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          elevation: 0,
          boxShadow: 'none',
          border: `1px solid ${palette.sand}`,
          borderRadius: 2,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
        outlined: {
          borderColor: palette.sage,
          color: palette.sage,
        },
      },
      defaultProps: {
        variant: 'outlined',
        color: 'secondary',
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: palette.sand,
        },
      },
    },
  },
});

export default theme;
