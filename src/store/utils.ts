import {clearStorage} from '../utils/storage/storage';

/*
 ** set object to us to contain each slice reset function
 */
export const sliceResetFns = new Set<() => void>();
/*
 ** Resetting each slice state
 */
export const resetAllSlices = () => {
  sliceResetFns.forEach(resetFn => {
    resetFn();
  });
  clearStorage();
};
