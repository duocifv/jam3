"use client"
import i18n  from 'i18next';
import { initReactI18next } from 'react-i18next';
//import vi from './src/locales/vi.json';
import Backend from 'i18next-http-backend';

// i18n 
//   .use(initReactI18next)
//   .init({
//     resources: {
//       vi: {
//         translation: vi
//       }
//     },
//     lng: 'vi',
//     fallbackLng: 'vi',
//     interpolation: {
//       escapeValue: false
//     }
//   });


i18n
  .use(Backend) 
  .use(initReactI18next) 
  .init({
    fallbackLng: 'vi',
    debug: false,
    interpolation: {
      escapeValue: false, 
    },
    backend: {
      loadPath: 'http://localhost:3000/locales/{{lng}}.json',
    },
  });

export default i18n;
