/*
 ** AppSlicesTypes
 */
export interface appStateType {
  theme: string;
  language: string;
}

export interface appSlice extends appStateType {
  setTheme: (newTheme: string) => void;
  setLanguage: (language: string) => void;
}
