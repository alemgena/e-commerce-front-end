import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationTI from './locales/ti/translation.json';
import translationOM from './locales/om/translation.json';
import translationSO from './locales/so/translation.json';
import translationAM from './locales/am/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    lng: 'en',
    resources: {
      en: {
        translation: translationEN,
      },
      am: {
        translation: translationAM,
      },
      ti: {
        translation: translationTI,
      },
      om: {
        translation: translationOM,
      },
      so: {
        translation: translationSO,
      },
    },
  });

export default i18n;
