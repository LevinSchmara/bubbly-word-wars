import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'en' | 'de' | 'es' | 'fr');
  };

  // Language names in their native language
  const languageNames = {
    en: 'English',
    de: 'Deutsch',
    es: 'Español',
    fr: 'Français'
  } as const;

  return (
    <div className="language-switcher">
      <select
        value={language}
        onChange={handleLanguageChange}
        className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={t('language.select')}
      >
        {Object.entries(languageNames).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
