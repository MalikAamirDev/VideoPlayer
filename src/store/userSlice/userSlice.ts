import {StateCreator} from 'zustand';
import {sliceResetFns} from '../utils';
import {userSlice, userState} from './types';

/*
 ** Initial states
 */
const initialState: userState = {
  bears: 0,
  userDogs: [],
};

export const createUserSlice: StateCreator<userSlice> = set => {
  sliceResetFns.add(() => set(initialState));
  return {
    ...initialState,
    addBear: () => set(state => ({bears: state.bears + 1})),
  };
};
