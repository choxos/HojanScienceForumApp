import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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

// Get device language safely (without crashing if RNLocalize native module is missing)
const getDeviceLanguage = () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const RNLocalize = require('react-native-localize');
    if (RNLocalize && typeof RNLocalize.getLocales === 'function') {
      const locales = RNLocalize.getLocales();
      if (Array.isArray(locales) && locales.length > 0) {
        const locale = locales[0];
        if (locale.languageCode === 'ku' || String(locale.languageTag || '').includes('ku')) {
          return 'ku-sorani';
        }
        if (locale.languageCode === 'fr') {
          return 'fr';
        }
        return locale.languageCode || 'en';
      }
    }
  } catch {}
  return 'en';
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
