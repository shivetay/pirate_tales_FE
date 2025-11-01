'use client';
import Image from 'next/image';
import { useLanguageNavigation } from '@/utils';
import { LogoButton as LogoButtonComponent } from './logo-button.styled';

export function LogoButton() {
  const { navigateToCurrentLanguage } = useLanguageNavigation();

  return (
    <LogoButtonComponent onClick={() => navigateToCurrentLanguage('')}>
      <Image
        src="/assets/img/pt_logo.png"
        alt="logo"
        width={100}
        height={100}
      />
    </LogoButtonComponent>
  );
}

export default LogoButton;
