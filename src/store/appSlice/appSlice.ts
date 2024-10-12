import {StateCreator} from 'zustand';
import {sliceResetFns} from '../utils';
import {appSlice, appStateType} from './types';

/*
 ** Initial states
 */
const initialState: appStateType = {
  theme: '',
  language: '',
};

export const createAppSlice: StateCreator<appSlice> = set => {
  sliceResetFns.add(() => set(initialState));
  return {
    ...initialState,

    setTheme: newTheme => set({theme: newTheme}),
    setLanguage: language => set({language}),
  };
};
