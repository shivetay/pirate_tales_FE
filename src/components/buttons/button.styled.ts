import { Button, styled } from '@mui/material';
import theme from '@/theme/theme';

export const AuthButton = styled(Button)(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  height: '100px',
  width: '134px',

  '& img': {
    position: 'absolute',
  },

  '& a': {
    position: 'relative',
    zIndex: 2,
    color: theme.palette.common.white,
    textDecoration: 'none',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
  },
}));
