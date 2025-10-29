'use client';
import { useLanguageNavigation } from '@/utils/navigation';
import './language-switcher.css';

export function LanguageSwitcher() {
  const { currentLang, switchLanguage } = useLanguageNavigation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'pl', name: 'Polski' },
  ];

  return (
    <div className="language-switcher">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`lang-button ${currentLang === lang.code ? 'active' : ''}`}
          onClick={() => switchLanguage(lang.code)}
          type="button"
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
