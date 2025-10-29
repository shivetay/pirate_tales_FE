import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { mainTheme } from '@/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Use the appropriate theme based on system preference
  const theme = mainTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
