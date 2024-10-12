/*
 ** User slice type
 */

export interface userState {
  bears: number;
  userDogs: unknown[];
}
export interface userSlice extends userState {
  addBear: () => void;
}
