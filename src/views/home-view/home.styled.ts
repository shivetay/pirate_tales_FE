'use client';
import { Box, styled } from '@mui/material';

export const HomeContainer = styled(Box)(() => ({
  width: '75%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  zIndex: 2,
}));

export const HomeList = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: '35%',
  left: '30%',
  transform: 'translate(-50%, -35%)',
  zIndex: 3,
  color: theme.palette.primary.contrastText,
  fontSize: theme.spacing(2),
}));
