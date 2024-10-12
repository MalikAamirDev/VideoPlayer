// authApiService.ts
import {AUTH_API} from '../../api';
import {loadStorage} from '../../utils/storage/storage';
import {ASYNC_TOKEN_KEY, ASYNC_USER_DATA_KEY} from '../../constants';
import {resetAllSlices} from '../utils';
import Toast from 'react-native-simple-toast';
import {navigate} from '../../routes/navigationUtilities';
import {useAppStore} from '..';
import {tokenType, userDataType} from '../../@types';
import {emailPassType, SignUpParams} from './types';

export const signIn = async (params: emailPassType) => {
  try {
    const response = await AUTH_API.post('/auth/signin', {
      emailAddress: params.email,
      password: params.password,
    });

    console.log('🚀 ~ signIn: ~ response:', response);
    const user = response.data;
    if (user?.data && user?.tokens) {
      /*
       ** updating user data as well as tokens
       */
      useAppStore.getState().updateUserDataToken(user?.data, user?.tokens);
    }
  } catch (error: any | unknown) {
    console.log('🚀 ~ signIn: ~ error:', error);
    if (error?.response?.data?.message === 'User not confirmed') {
      resendConfirmationCode(params.email);
      Toast.show('User is not confirmed', Toast.LONG);
      navigate('ConfirmSignupScreen', {
        email: params.email,
        password: params.password,
      });
      return;
    }
    handleAuthContextError('signIn', error);
  }
};

export const signUp = async (params: SignUpParams) => {
  try {
    const response = await AUTH_API.post('/auth/signup', params);
    console.log('🚀 ~ signUp: ~ response:', response);
    Toast.show('Verification code has been sent to your email address', Toast.LONG);
  } catch (error: any) {
    console.log('🚀 ~ signUp: ~ error:', error);
    handleAuthContextError('signUp', error);
    throw new Error(error.message || 'Sign-up failed');
  }
};

export const forgotPassword = async (emailAddress: string) => {
  try {
    const response = await AUTH_API.post('/auth/forgot/password', {emailAddress});
    console.log('🚀 ~ forgotPassword: ~ response:', response);
    Toast.show('Password reset email sent successfully', Toast.LONG);
  } catch (error: any) {
    console.log('🚀 ~ forgotPassword: ~ error:', error);
    handleAuthContextError('forgotPassword', error);
    throw new Error(error.message || 'Forgot password failed');
  }
};

export const forgotChangePassword = async (emailAddress: string, password: string, confirmationCode: string) => {
  try {
    const response = await AUTH_API.post('/auth/forgot/change/password', {
      emailAddress,
      password,
      confirmationCode,
    });
    console.log('🚀 ~ forgotChangePassword: ~ response:', response);
    Toast.show('Password changed successfully', Toast.LONG);
  } catch (error: any) {
    console.log('🚀 ~ forgotChangePassword: ~ error:', error);
    handleAuthContextError('forgotChangePassword', error);
    throw new Error(error.message || 'Change password failed');
  }
};

export const confirmSignup = async (emailAddress: string, confirmationCode: string, password: string) => {
  try {
    const response = await AUTH_API.post('/auth/confirm', {emailAddress, confirmationCode});
    console.log('🚀 ~ confirmSignup: ~ response:', response);
    Toast.show('Account confirmed successfully', Toast.LONG);
    signIn({email: emailAddress, password});
  } catch (error: any) {
    console.log('🚀 ~ confirmSignup: ~ error:', error);
    handleAuthContextError('confirmSignup', error);
  }
};

export const resendConfirmationCode = async (emailAddress: string) => {
  try {
    const response = await AUTH_API.post('/auth/code', {emailAddress});
    console.log('🚀 ~ resendCode: ~ response:', response);
    Toast.show('Code sent successfully', Toast.LONG);
  } catch (error: any) {
    console.log('🚀 ~ resendCode: ~ error:', error);
    handleAuthContextError('resendCode', error);
  }
};

export const signOut = async (userId: string, accessToken: string) => {
  try {
    const response = await AUTH_API.post('/auth/logout', {userId, accessToken});
    console.log('🚀 ~ signOut: ~ response:', response);

    resetAllSlices();
  } catch (error: any) {
    console.log('🚀 ~ signOut: ~ error:', error);
    handleAuthContextError('signOut', error);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await AUTH_API.delete(`/user/${userId}`);
    console.log('🚀 ~ deleteUser: ~ response:', response);
    Toast.show('User deleted successfully', Toast.LONG);
  } catch (error: any) {
    console.log('🚀 ~ deleteUser: ~ error:', error);
    handleAuthContextError('deleteUser', error);
  }
};

export const fetchUserDataLocal = async () => {
  try {
    let user = loadStorage(ASYNC_USER_DATA_KEY) as userDataType;
    console.log('🚀 ~ fetchUserDataLocal ~ user:', user);
    const userToken = loadStorage(ASYNC_TOKEN_KEY) as tokenType;
    console.log('🚀 ~ fetchUserDataLocal ~ userToken:', userToken);

    if (user && 'PK' in user && 'accessToken' in userToken) {
      console.log('User is logged in');

      useAppStore.setState({userData: user, tokens: userToken});
      const response = await AUTH_API.get(`/user/${user.PK}`);
      console.log('🚀 ~ fetchUserDataLocal: ~ response:', response);
      user = response?.data?.data;
      useAppStore.getState().updateUserData(user);
    }
  } catch (error: any) {
    console.log('🚀 ~ fetchUserDataLocal: ~ error:', error);
    handleAuthContextError('fetchUserDataLocal', error);
  }
};
const handleAuthContextError = (funcName = '', error: unknown | any) => {
  console.log(`ERROR[${funcName}]`, error);
  if (error?.message === 'Internal server error') {
    Toast.show('Something went wrong, try again later', Toast.LONG);
    return;
  }
  if (error?.response?.data?.message === 'Internal Server Error') {
    Toast.show('Something went wrong, try again later', Toast.LONG);
    return;
  }
  if (error?.response?.data?.message === 'User is disabled.') {
    Toast.show('User is disabled, kindly contact admin', Toast.LONG);
    navigate('AccountDisabledScreen');
    return;
  }
  if (error?.response?.data?.message === 'Access Token has been revoked') {
    resetAllSlices();
    return;
  }
  if (error?.response?.data?.message === 'Unable to verify user') {
    Toast.show('User is disabled or deleted, kindly contact admin', Toast.LONG);
    navigate('AccountDisabledScreen');
    return;
  }
  if (error?.message === 'Network Error') {
    Toast.show('Internet Connection error. Try again later', Toast.LONG);
    return;
  }

  if (error?.response?.data?.message) {
    const extractData = error.response.data.message;
    return Toast.show(extractData, Toast.LONG);
  }
  return Toast.show(error, Toast.LONG);
};
