'use client';
import { Box } from '@mui/material';
import { useLanguageNavigation } from '@/utils';
import { Button } from '../buttons';

type TButtonTypes = 'button' | 'submit' | 'reset';

const BUTTONS = [
  {
    label: 'LOGIN_BUTTON_LABEL',
    href: '/auth?mode=signin',
    type: 'button',
    mode: 'signin',
  },

  {
    label: 'REGISTER_BUTTON_LABEL',
    href: '/auth?mode=signup',
    type: 'button',
    mode: 'signup',
  },
];

export function AuthNavigation() {
  const { currentLang } = useLanguageNavigation();

  return (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      {BUTTONS.map((button) => {
        return (
          <Button
            key={button.label}
            href={`${currentLang}${button.href}`}
            type={button.type as TButtonTypes}
            label={button.label}
          />
        );
      })}
    </Box>
  );
}

export default AuthNavigation;
