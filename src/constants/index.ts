import {API_KEY_DEV, API_KEY_PROD} from '@env';
export const API_KEY =
  process.env.NODE_ENV === 'development' ? API_KEY_DEV : API_KEY_PROD;
export const ASYNC_TOKEN_KEY = 'USER_TOKEN';
export const ASYNC_USER_DATA_KEY = 'USER_DATA';
export const USER_LANGUAGE = 'USER_LANGUAGE';
export const FALL_BACK_LANG = 'en-US';
export const API_SECRET =
  'live_FrlSoz7LDC3z4D9GOyiIHPYNTFSoDIztdTbHEY8wXhUQboQEkX5KjpWxnd7eFZfO';

export const bannerAddKey = 'ca-app-pub-6806642040204494/9938747031';
export const appOpenAddKey = 'ca-app-pub-6806642040204494/7299107418';
export const INTERTSIAL_KEY = 'ca-app-pub-6806642040204494/1669374773';
export const APP_ID = 'ca-app-pub-6806642040204494~1628840738';
