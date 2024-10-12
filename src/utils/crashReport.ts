/**
 * If you're using Crashlytics: https://rnfirebase.io/crashlytics/usage
 */
// import crashlytics from '@react-native-firebase/crashlytics';

/**
 * Error classifications used to sort errors on error reporting services.
 */
export enum ErrorType {
  /**
   * An error that would normally cause a red screen in dev
   * and force the user to sign out and restart.
   */
  FATAL = 'Fatal',
  /**
   * An error caught by try/catch
   */
  HANDLED = 'Handled',
}

/**
 * Manually report a handled error.
 */
export const reportCrash = (error: Error, type: ErrorType = ErrorType.FATAL) => {
  if (__DEV__ || process.env.NODE_ENV === 'development') {
    // Log to console and Reactotron in development
    const message = error?.message || 'Unknown';
    console.error(error);
    console.log(message, type);
  } else {
    // crashlytics().recordError(error);
  }
};
