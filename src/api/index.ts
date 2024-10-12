import axios from 'axios';
import {API_KEY} from '../constants';
import Toast from 'react-native-simple-toast';
import {useAppStore} from '../store';
import {tokenType} from '../@types';

// local storage

// SeTTing up base url

export const API = axios.create({
  baseURL: API_KEY,
});

export const AUTH_API = axios.create({
  baseURL: API_KEY,
});

/*
 ** Before every api request following be taken
 1 - we are getting accessToken as well as refresh token from the api
 2 - then we are decoding accesToken by external library
 3 - then we are cheking the xpiry time for the token
 4 - if the token is expire then we calling api to get latest token from the server
 5 - if token is not expire we are simply injecting our accessToken into header
 */
/*
 ** This mechnism every time when request gets
 */
API.interceptors.request.use(
  async function (config) {
    // getting access token
    const {accessToken} = useAppStore.getState().tokens;
    // injecting our token into header
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
/*
 ** When axios returns something
 */
API.interceptors.response.use(
  response => response,
  async error => {
    /*
     ** Original api that gets failed
     */
    const originalRequest = error.config;
    /*
     ** Checking if token gets expire
     */
    if (error.response && error.response.status === 401) {
      // Access token has expired, attempt to refresh
      const {refreshToken} = useAppStore.getState().tokens;

      try {
        const response = await axios.post(`${API_KEY}/auth/token`, {
          refreshToken,
        });
        console.log('response refresh token', response);

        if (response?.status === 200 && response?.data?.tokens) {
          const newTokens = response.data?.tokens as tokenType;

          // Save new tokens
          useAppStore.getState().updateToken(newTokens);

          // Update the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${newTokens?.accessToken}`;

          // Retry the original request with the new token
          return API(originalRequest);
        }
      } catch (refreshError: unknown | any) {
        console.log('🚀 ~ refreshError:', refreshError);
        Toast.show('Session expired. Please log in again.', Toast.LONG);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
/*
 ** When axios return something
 */

AUTH_API.interceptors.response.use(
  request => request,
  error => {
    return Promise.reject(error);
  },
);
