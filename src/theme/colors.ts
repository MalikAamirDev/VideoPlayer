import {Theme} from '@react-navigation/native';
import {Appearance} from 'react-native';
/*
 ** Default colors
 */
const defaultPalette = {
  neutral100: '#f5fff8',
  neutral200: '#d6ffd8',
  neutral300: '#b7ffb9',
  neutral400: '#98ff9a',
  neutral500: '#7aff7a',
  neutral600: '#60e460',
  neutral700: '#47cc47',
  neutral800: '#2eb32e',

  primary000: '#EAF3FF',
  primary100: '#D4E6F2',
  primary200: '#80a8f7',
  primary300: '#4071e6',
  primary400: '#1c47cc',
  primary500: '#0d2eab',
  primary600: '#064aac',
  primary700: '#053c93',

  secondary000: '#D0D0D0',
  secondary100: '#a6a6a6',
  secondary200: '#7a7a7a',
  secondary300: '#5e5e5e',
  secondary400: '#424242',
  secondary500: '#4f4f4f',
  secondary600: '#383838',
  secondary700: '#787878',

  accent100: '#FFEED4',
  accent200: '#FFE1B2',
  accent300: '#FDD495',
  accent400: '#FBC878',
  accent500: '#FFBB50',
  accent600: '#F2C94C',

  angry100: '#F2D6CD',
  angry500: '#EB5757',

  overlay20: 'rgba(25, 16, 21, 0.2)',
  overlay50: 'rgba(25, 16, 21, 0.5)',
  overlay100: 'rgba(6, 74, 172, 0.1)',

  white: '#ffffff',
  black: '#000000',
  primary: '#0093CB',
  titleColor: '#000000',
  textColor: '#000000',
  subTitleColor: '#000000',
} as const;
/*
 ** Dark Color theme
 */
const darkPalette = {
  neutral100: '#1e291e',
  neutral200: '#273427',
  neutral300: '#314131',
  neutral400: '#3a4d3a',
  neutral500: '#445944',
  neutral600: '#4e664e',
  neutral700: '#588258',
  neutral800: '#639f63',

  primary000: '#0d2eab',
  primary100: '#1c47cc',
  primary200: '#4071e6',
  primary300: '#80a8f7',
  primary400: '#d4e6f2',
  primary500: '#EAF3FF',
  primary600: '#f0f7ff',
  primary700: '#f5faff',

  secondary000: '#383838',
  secondary100: '#424242',
  secondary200: '#5e5e5e',
  secondary300: '#7a7a7a',
  secondary400: '#a6a6a6',
  secondary500: '#D0D0D0',
  secondary600: '#dbdbdb',
  secondary700: '#e6e6e6',

  accent100: '#5a3c00',
  accent200: '#6b4a00',
  accent300: '#7b5900',
  accent400: '#8c6700',
  accent500: '#9d7600',
  accent600: '#b98a00',

  angry100: '#8b3a36',
  angry500: '#FF6B6B',

  overlay20: 'rgba(230, 230, 230, 0.2)',
  overlay50: 'rgba(230, 230, 230, 0.5)',
  overlay100: 'rgba(240, 240, 240, 0.1)',

  white: '#ffffff',
  black: '#000000',
  primary: '#0093CB',
  titleColor: '#ffffff',
  textColor: '#ffffff',
  subTitleColor: '#ffffff',
} as const;

export const DEFAULT_COLORS = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette: defaultPalette,
  black: defaultPalette.black,
  white: defaultPalette.white,
  /*
   ** Primary color user in app
   */
  primary: defaultPalette.primary,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The default text color in many components.
   */
  text: defaultPalette.secondary500,
  /**
   * Secondary text information.
   */
  textDim: defaultPalette.secondary100,
  /**
   * The default color of the screen background.
   */
  background: defaultPalette.white,
  /**
   * The default color for header
   */
  header: darkPalette.primary700,
  /**
   * The default color of the button
   */
  card: defaultPalette.secondary400,
  /**
   * The default color of the button
   */
  button: defaultPalette.primary600,
  /**
   * The default color of the button border
   */
  buttonBorder: defaultPalette.primary600,
  /**
   * The default color of the button light
   */
  buttonLight: defaultPalette.primary100,
  /**
   * The default color of the button light
   */
  buttonTextPrimary: defaultPalette.white,
  /**
   * The default color of the button light
   */
  buttonTextSeconday: defaultPalette.secondary500,
  /*
   ** Default Status bar color
   */
  statusBar: defaultPalette.secondary000,
  /*
   ** Default loader color
   */
  loaderPrimary: defaultPalette.primary600,
  /*
   ** Default loader color
   */
  loaderSecondary: defaultPalette.secondary500,
  /**
   * The default border color.
   */
  border: defaultPalette.secondary000,
  /**
   * The main tinting color.
   */
  tint: defaultPalette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: defaultPalette.neutral400,
  /**
   * The default color of the notification.
   */
  notification: defaultPalette.accent400,
  /**
   * Error messages.
   */
  error: defaultPalette.angry500,
  /**
   * Error Background.
   */
  errorBackground: defaultPalette.angry100,
  textColor: defaultPalette.textColor,
  subTitleColor: defaultPalette.subTitleColor,
  titleColor: defaultPalette.titleColor,
};

export const DARK_COLORS = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette: darkPalette,
  black: darkPalette.black,
  white: darkPalette.white,
  /*
   ** Primary color user in app
   */
  primary: darkPalette.primary,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The default text color in many components.
   */
  text: darkPalette.secondary200,
  /**
   * Secondary text information.
   */
  textDim: darkPalette.secondary100,
  /**
   * The default color of the screen background.
   */
  background: darkPalette.black,
  /**
   * The default color for header
   */
  header: darkPalette.primary700,
  /**
   * The default color of the button
   */
  card: darkPalette.secondary400,
  /**
   * The default color of the button
   */
  button: darkPalette.primary600,
  /**
   * The default color of the button border
   */
  buttonBorder: darkPalette.primary600,
  /**
   * The default color of the button light
   */
  buttonLight: darkPalette.primary100,
  /**
   * The default color of the button light
   */
  buttonTextPrimary: defaultPalette.secondary200,
  /**
   * The default color of the button light
   */
  buttonTextSeconday: defaultPalette.secondary500,
  /*
   ** Default Status bar color
   */
  statusBar: darkPalette.secondary000,
  /*
   ** Default loader color
   */
  loaderPrimary: darkPalette.primary600,
  /*
   ** Default loader color
   */
  loaderSecondary: darkPalette.secondary500,
  /**
   * The default border color.
   */
  border: darkPalette.secondary000,
  /**
   * The main tinting color.
   */
  tint: darkPalette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: darkPalette.neutral400,
  /**
   * The default color of the notification.
   */
  notification: defaultPalette.accent400,
  /**
   * Error messages.
   */
  error: darkPalette.angry500,
  /**
   * Error Background.
   */
  errorBackground: darkPalette.angry100,
  textColor: darkPalette.textColor,
  subTitleColor: darkPalette.subTitleColor,
  titleColor: darkPalette.titleColor,
};
/*
 ** Returning theme based on user theme selection
 */
function getTheme() {
  const colorScheme = Appearance.getColorScheme();
  return colorScheme === 'dark' ? DARK_COLORS : DEFAULT_COLORS;
}

export const COLORS = getTheme();

export type Colors = typeof COLORS;
/*
 ** Custome theme for adding new colors into it
 */
export type CustomTheme = Theme & {
  colors: Colors;
};
