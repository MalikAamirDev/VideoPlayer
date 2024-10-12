import {useCallback} from 'react';
import Toast from 'react-native-simple-toast';
import {FALL_BACK_LANG, USER_LANGUAGE} from '../constants';
import {Language, TxKeyPath} from './types';
import {useMMKVString} from 'react-native-mmkv';
import i18n from 'i18next';
import {getLocales} from 'react-native-localize';
import {loadString} from '../utils/storage/storage';
// import {I18n} from 'i18n-js';

// const a = new I18n();

/**
 * Translates text.
 * @param {TxKeyPath} key - The i18n key.
 * @param {i18n.TranslateOptions} options - The i18n options.
 * @returns {string} - The translated text.
 * @example
 * Translations:
 *
 * ```en.ts
 * {
 *  "hello": "Hello, {{name}}!"
 * }
 * ```
 *
 * Usage:
 * ```ts
 * import { translate } from "i18n-js"
 *
 * translate("common.ok", { name: "world" })
 * // => "Hello world!"
 * ```
 */
// export function translate(key: TxKeyPath, options?: any): string {
//   return a.t(key, options);
// }
export const changeLanguage = async (lang: Language) => {
  try {
    const result = await i18n.changeLanguage(lang);
    console.log('🚀 ~ changeLanguage ~ result:', result);
  } catch (error) {
    Toast.show('Unable to change language', Toast.LONG);
    console.log('🚀 ~ changeLanguage ~ error:', error);
  }
  /*
   ** This is for if we support RTL languages
   */
  // if (lang === 'ar') {
  //   I18nManager.forceRTL(true);
  // } else {
  //   I18nManager.forceRTL(false);
  // }
  /*
   ** This is for if want to rerender whole app when language changes
   */
  // if (Platform.OS === 'ios' || Platform.OS === 'android') {
  //   if (__DEV__) NativeModules.DevSettings.reload();
  //   else RNRestart.restart();
  // } else if (Platform.OS === 'web') {
  //   window.location.reload();
  // }
};

/**
 * Custom hook to manage and return the current language.
 *
 * @returns {object} - An object containing the current language and a function to update it.
 * @returns {Language} language - The current language.
 * @returns {Function} setLanguage - Function to update the current language.
 * @example
 * const { language, setLanguage } = useSelectedLanguage();
 * console.log(language); // Outputs the current language
 * setLanguage('en'); // Sets the language to English
 **/
export const useSelectedLanguage = () => {
  const [language, setLang] = useMMKVString(USER_LANGUAGE);

  const setLanguage = useCallback(
    (lang: Language) => {
      setLang(lang);
      if (lang !== undefined) changeLanguage(lang as Language);
    },
    [setLang],
  );

  return {language: language as Language, setLanguage};
};
/*
 ** Getting sysytem local language
 */
export const renderSystemLang = () => {
  const systemLocale = getLocales()[0];
  const systemLocaleTag = systemLocale?.languageTag ?? 'en-US';
  /*
   ** Checking if i18n.translations contain  systemLocale language tag
   */
  /*
   ** Getting user language saved in local storage
   */
  const locallang = loadString(USER_LANGUAGE);

  if (locallang) {
    return locallang;
  } else if (i18n.languages?.includes(systemLocaleTag)) {
    return systemLocaleTag;
  } else {
    // spliting it to make it more general like en-US Tto en
    const generalLocale = systemLocaleTag.split('-')[0];
    if (i18n.languages?.includes(generalLocale)) {
      return generalLocale;
    } else {
      return FALL_BACK_LANG;
    }
  }
};
type TranslateOptions = Record<string, any>;

export const translate = (key: TxKeyPath, options?: TranslateOptions): string => {
  return i18n.t(key, options) as unknown as string;
};
