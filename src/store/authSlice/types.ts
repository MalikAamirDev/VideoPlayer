import {tokenType, userDataType} from '../../@types';

export interface emailPassType {
  email: string;
  password: string;
}

export interface SignUpParams {
  emailAddress: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  state?: string;
  city?: string;
}

/*
 ** Auth slice type
 */
export interface authState {
  userData: userDataType | undefined;
  tokens: tokenType;
}

export interface authSlice extends authState {
  updateToken: (tokens: tokenType) => void;
  updateUserData: (user: userDataType) => void;
  updateUserDataToken: (user: userDataType, tokens: tokenType) => void;
}
