export type Regex = 'email' | 'password' | 'digit' | 'decimal' | 'letter' | 'spaceLetter' | 'address';

export const REGEX = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  otp: /^[0-9]{1,6}$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
  digit: /[^0-9]/g,
  decimal: /^\d*\.?\d+$/,
  letter: /[^a-zA-Z ]/,
  spaceLetter: /[^a-zA-Z ]/,
  name: /^[A-Za-z ]*$/,
  address: /^[0-9A-Za-z\s.,'-]{10,}$/,
  phoneNumber: '/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/',
  timeRegex: /^(1[0-2]|0?[1-9])\s?[APMapm]{2}$/,
  number: /^\d*$/,
  alphanumeric: /^(?=.*[A-Za-z])[a-zA-Z0-9 ]*$/,
};

export const checkRegex = (regex: Regex, text: string) => {
  return text.replace(REGEX[regex], '');
};
