'use client';
import { createTheme } from '@mui/material/styles';

// Define custom colors based on your globals.css
const colors = {
  background: '#ffffff',
  foreground: '#171717',
  textPrimary: '#202020',
  textSecondary: '#c14a4a', // Red color from your theme
  textGold: '#ffd700', // Gold color from your theme
  textInfill: 'rgba(0, 0, 0, 0.35)',
};

// Create the light theme
export const mainTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.textSecondary, // Red (#c14a4a)
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.textGold, // Gold (#ffd700)
      light: '#ffeb3b',
      dark: '#f57f17',
      contrastText: '#000000',
    },
    background: {
      default: colors.background, // White (#ffffff)
      paper: '#f5f5f5',
    },
    text: {
      primary: colors.textPrimary, // Dark (#202020)
      secondary: colors.textInfill, // Gray with opacity
    },
    error: {
      main: colors.textSecondary, // Red for errors
    },
    warning: {
      main: colors.textGold, // Gold for warnings
    },
  },
  typography: {
    htmlFontSize: 16, // Set 1 rem = 16px
    fontFamily: '"Pirata One", Arial, Helvetica, sans-serif',
    h1: {
      fontFamily: '"Pirata One", Arial, Helvetica, sans-serif',
      fontSize: '2.5rem',
      fontWeight: 400,
      color: colors.textPrimary,
    },
    h2: {
      fontFamily: '"Pirata One", Arial, Helvetica, sans-serif',
      fontSize: '2rem',
      fontWeight: 400,
      color: colors.textPrimary,
    },
    h3: {
      fontFamily: '"Pirata One", Arial, Helvetica, sans-serif',
      fontSize: '1.75rem',
      fontWeight: 400,
      color: colors.textPrimary,
    },
    h4: {
      fontFamily: '"Pirata One", Arial, Helvetica, sans-serif',
      fontSize: '1.5rem',
      fontWeight: 400,
      color: colors.textPrimary,
    },
    h5: {
      fontFamily: '"Pirata One", Arial, Helvetica, sans-serif',
      fontSize: '1.25rem',
      fontWeight: 400,
      color: colors.textPrimary,
    },
    h6: {
      fontFamily: '"Pirata One", Arial, Helvetica, sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
      color: colors.textPrimary,
    },
    body1: {
      fontFamily: '"Pirata One", Arial, Helvetica, sans-serif',
      color: colors.textPrimary,
    },
    body2: {
      fontFamily: '"Pirata One", Arial, Helvetica, sans-serif',
      color: colors.textInfill,
    },
    button: {
      fontFamily: '"Pirata One", Arial, Helvetica, sans-serif',
      textTransform: 'none', // Disable uppercase transformation
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '16px', // Ensure 1 rem = 16px
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontFamily: '"Pirata One", Arial, Helvetica, sans-serif',
          textTransform: 'none',
          fontWeight: 400,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:active': {
            transform: 'translateY(0)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            fontFamily: '"Pirata One", Arial, Helvetica, sans-serif',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default mainTheme;
