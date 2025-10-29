'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { AuthButton } from './button.styled';

type TButtonProps = {
  label: string;
  type: 'button' | 'submit' | 'reset';
  href?: string;
  onClick?: () => void;
};

export function Button({ label, type, href, onClick }: TButtonProps) {
  const { t } = useTranslation();

  return (
    <AuthButton type={type} onClick={onClick}>
      <Image
        src="/assets/img/button.png"
        alt="login"
        width={120}
        height={100}
      />
      <Link href={href || ''}>{t(label)}</Link>
    </AuthButton>
  );
}

export default Button;
