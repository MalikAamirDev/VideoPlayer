import {create} from 'zustand';
import {authSlice} from './authSlice/types';
import {appSlice} from './appSlice/types';
import {userSlice} from './userSlice/types';
import {createUserSlice} from './userSlice/userSlice';
import {createAuthSlice} from './authSlice/authSlice';
import {createAppSlice} from './appSlice/appSlice';
/*
 ** Main zustand store
 */
export const useAppStore = create<authSlice & appSlice & userSlice>()((...a) => ({
  ...createUserSlice(...a),
  ...createAuthSlice(...a),
  ...createAppSlice(...a),
}));
