import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'de' | 'es' | 'fr';

type Translations = {
  [key: string]: {
    en: string;
    de: string;
    es: string;
    fr: string;
  };
};

const translations: Translations = {
  // Common
  'app.title': {
    en: 'Bubbly Word Wars',
    de: 'Blubbernde Wortkriege',
    es: 'Guerras de Palabras Burbujeantes',
    fr: 'Guerres de Mots Pétillantes',
  },
  // Language selection
  'language.en': { en: 'English', de: 'Englisch', es: 'Inglés', fr: 'Anglais' },
  'language.de': { en: 'German', de: 'Deutsch', es: 'Alemán', fr: 'Allemand' },
  'language.es': { en: 'Spanish', de: 'Spanisch', es: 'Español', fr: 'Espagnol' },
  'language.fr': { en: 'French', de: 'Französisch', es: 'Francés', fr: 'Français' },
  'language.select': {
    en: 'Select Language',
    de: 'Sprache auswählen',
    es: 'Seleccionar idioma',
    fr: 'Choisir la langue',
  },
  // Error pages
  'error.notFound.title': {
    en: 'Page Not Found',
    de: 'Seite nicht gefunden',
    es: 'Página no encontrada',
    fr: 'Page non trouvée',
  },
  'error.notFound.message': {
    en: 'The page you are looking for might have been removed or is temporarily unavailable.',
    de: 'Die gesuchte Seite wurde möglicherweise verschoben oder ist vorübergehend nicht verfügbar.',
    es: 'La página que buscas podría haber sido eliminada o no está disponible temporalmente.',
    fr: 'La page que vous recherchez a peut-être été supprimée ou est temporairement indisponible.',
  },
  'error.notFound.backToHome': {
    en: 'Back to Home',
    de: 'Zurück zur Startseite',
    es: 'Volver al inicio',
    fr: 'Retour à l\'accueil',
  },
  // Game Lobby
  'gameLobby.title': {
    en: 'Word Race',
    de: 'Word Race',
    es: 'Word Race',
    fr: 'Word Race',
  },
  'gameLobby.createTab': {
    en: 'Create Game',
    de: 'Spiel erstellen',
    es: 'Crear partida',
    fr: 'Créer une partie',
  },
  'gameLobby.joinTab': {
    en: 'Join Game',
    de: 'Spiel beitreten',
    es: 'Unirse a partida',
    fr: 'Rejoindre une partie',
  },
  'gameLobby.yourName': {
    en: 'Your Name',
    de: 'Dein Name',
    es: 'Tu nombre',
    fr: 'Ton nom',
  },
  'gameLobby.namePlaceholder': {
    en: 'Enter your name',
    de: 'Gib deinen Namen ein',
    es: 'Ingresa tu nombre',
    fr: 'Entre ton nom',
  },
  'gameLobby.gameName': {
    en: 'Game Name',
    de: 'Spielname',
    es: 'Nombre de la partida',
    fr: 'Nom de la partie',
  },
  'gameLobby.gameNamePlaceholder': {
    en: 'Enter game name',
    de: 'Spielnamen eingeben',
    es: 'Ingresa nombre de partida',
    fr: 'Entrez le nom de la partie',
  },
  'gameLobby.gameId': {
    en: 'Game ID',
    de: 'Spiel-ID',
    es: 'ID de partida',
    fr: 'ID de partie',
  },
  'gameLobby.gameIdPlaceholder': {
    en: 'Enter game ID',
    de: 'Spiel-ID eingeben',
    es: 'Ingresa ID de partida',
    fr: 'Entrez l\'ID de la partie',
  },
  'gameLobby.creating': {
    en: 'Creating...',
    de: 'Erstelle...',
    es: 'Creando...',
    fr: 'Création...',
  },
  'gameLobby.createGame': {
    en: 'Create Game',
    de: 'Spiel erstellen',
    es: 'Crear partida',
    fr: 'Créer la partie',
  },
  'gameLobby.joining': {
    en: 'Joining...',
    de: 'Beitrete...',
    es: 'Uniéndose...',
    fr: 'Connexion...',
  },
  'gameLobby.joinGame': {
    en: 'Join Game',
    de: 'Spiel beitreten',
    es: 'Unirse a partida',
    fr: 'Rejoindre la partie',
  },
  // Add more translations as needed
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load saved language from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
    if (savedLanguage && ['en', 'de', 'es', 'fr'].includes(savedLanguage)) {
      setLanguage(savedLanguage as Language);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0] as Language;
      if (['en', 'de', 'es', 'fr'].includes(browserLang)) {
        setLanguage(browserLang);
      }
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const t = (key: string): string => {
    if (!translations[key]) return key; // Return key if translation not found
    return translations[key][language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Helper component to render translated text
export const T: React.FC<{ k: string }> = ({ k }) => {
  const { t } = useLanguage();
  return <>{t(k)}</>;
};

export default LanguageContext;
