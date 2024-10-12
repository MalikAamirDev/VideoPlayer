import {z} from 'zod';
import {REGEX} from '../constants/regex';
import {translate} from '../i18n/utils';

/*
 ** Validation schema for email
 */
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, {message: translate('MESSAGES.emailRequired')})
    .email({message: translate('MESSAGES.emailInvalid')})
    .toLowerCase(),
});

/*
 ** Validation schema for password
 */
export const passwordSchema = z.object({
  password: z
    .string()
    .min(1, {message: translate('MESSAGES.passwordRequired')})
    .regex(REGEX.password, {
      message: translate('MESSAGES.passwordLength'),
    }),
});

/*
 ** Validation schema for confirmationCode
 */
export const confirmationCodeValidation = z.object({
  confirmationCode: z
    .string()
    .min(1, {message: translate('MESSAGES.otpRequired')})
    .length(6, {message: translate('MESSAGES.otpLength')}),
});

/*
 ** Login form schema
 */
export const loginSchema = emailSchema.merge(passwordSchema);

/*
 ** Validation schema for firstName as well as for lastName
 */
export const namesSchema = z.object({
  firstName: z
    .string()
    .min(1, {message: translate('MESSAGES.firstNameRequired')})
    .regex(REGEX.name, {
      message: translate('MESSAGES.firstNameInvalid'),
    })
    .max(30, translate('MESSAGES.firstNameLessLength'))
    .refine(value => value.trim().length >= 3, {
      message: translate('MESSAGES.firstNameShort'),
    }),

  lastName: z
    .string()
    .min(1, {message: translate('MESSAGES.lastNameRequired')})
    .regex(REGEX.name, {
      message: translate('MESSAGES.lastNameInvalid'),
    })
    .max(30, translate('MESSAGES.lastNameLessLength'))
    .refine(value => value.trim().length >= 3, {
      message: translate('MESSAGES.lastNameShort'),
    }),
});

/*
 ** Change password schema
 */
export const changePasswordSchema = z
  .object({
    password: z.string().regex(REGEX.password, {
      message: translate('MESSAGES.passwordLength'),
    }),
    confirmPassword: z.string().regex(REGEX.password, {
      message: translate('MESSAGES.passwordLength'),
    }),
    oldPassword: z
      .string()
      .regex(REGEX.password, {
        message: translate('MESSAGES.passwordLength'),
      })
      .optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: translate('MESSAGES.passwordNotMatch'),
    path: ['confirmPassword'],
  });

/*
 ** Validation schema for signup
 */
export const signupSchema = namesSchema.merge(loginSchema);
