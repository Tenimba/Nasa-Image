import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: {
          // Ajoute ici les traductions
          "description": "Description en français"
        }
      },
      // Ajoute d'autres langues ici
    },
    lng: 'fr', // Langue par défaut
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false, // React déjà protège contre XSS
    },
  });

export default i18n;
