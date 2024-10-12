import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {FALL_BACK_LANG} from '../constants';
import {resources} from './resources';
import {renderSystemLang} from './utils';
/*
 ** Initalizing react i18n
 */
i18n.use(initReactI18next).init({
  resources,
  // if user has changed langugae it can then retrive from locak storage if not then system local language is placed
  lng: renderSystemLang(),
  fallbackLng: FALL_BACK_LANG,
  compatibilityJSON: 'v3',

  // allows integrating dynamic values into translations.
  interpolation: {
    escapeValue: false,
  },
});
