'use client';
import { useParams, useRouter } from 'next/navigation';

export const useLanguageNavigation = () => {
  const router = useRouter();
  const params = useParams();
  const currentLang = params.lang as string;

  const navigateToLanguage = (lang: string, path: string = '') => {
    const targetPath = path ? `/${lang}${path}` : `/${lang}`;
    router.push(targetPath);
  };

  const navigateToCurrentLanguage = (path: string) => {
    router.push(`/${currentLang}${path}`);
  };

  const switchLanguage = (newLang: string) => {
    // Get current path without language prefix
    const currentPath =
      window.location.pathname.replace(`/${currentLang}`, '') || '';
    navigateToLanguage(newLang, currentPath);
  };

  return {
    currentLang,
    navigateToLanguage,
    navigateToCurrentLanguage,
    switchLanguage,
  };
};
