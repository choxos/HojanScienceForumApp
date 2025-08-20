import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// Import translations
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import kuSorani from '../locales/ku-sorani.json';
import kuKurmanji from '../locales/ku-kurmanji.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  'ku-sorani': { translation: kuSorani },
  'ku-kurmanji': { translation: kuKurmanji },
};

// Get device language
const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  if (Array.isArray(locales) && locales.length > 0) {
    const locale = locales[0];
    // Check if device language is Kurdish
    if (locale.languageCode === 'ku' || locale.languageTag.includes('ku')) {
      return 'ku-sorani'; // Default to Sorani
    }
    // Support French
    if (locale.languageCode === 'fr') {
      return 'fr';
    }
    return locale.languageCode;
  }
  return 'en'; // Default fallback
};

const initI18n = () => {
  return i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: getDeviceLanguage(),
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // React already does escaping
      },
      react: {
        useSuspense: false,
      },
    });
};

export default initI18n;
