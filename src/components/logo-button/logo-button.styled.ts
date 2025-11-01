import { Button, styled } from '@mui/material';

export const LogoButton = styled(Button)(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  '& img': {
    borderRadius: '20px',
  },

  '&:hover': {
    transform: 'translateY(0)',
    opacity: 0.8,
    transition: 'all 0.2s ease',
  },
  '&:active': {
    transform: 'translateY(0)',
    opacity: 0.6,
    transition: 'all 0.2s ease',
  },
}));
