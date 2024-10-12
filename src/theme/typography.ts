// markdown file and add links from here

import {StyleSheet} from 'react-native';

// import {Platform} from 'react-native';

const fonts = {
  spaceGrotesk: {
    // Cross-platform Google font.
    light: 'spaceGroteskLight',
    normal: 'spaceGroteskRegular',
    medium: 'spaceGroteskMedium',
    semiBold: 'spaceGroteskSemiBold',
    bold: 'spaceGroteskBold',
  },
  poppins: {
    Black: 'Poppins-Black',
    Bold: 'Poppins-Bold',
    Light: 'Poppins-Light',
    Medium: 'Poppins-Medium',
    Regular: 'Poppins-Regular',
    Thin: 'Poppins-Thin',
  },
};

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.poppins,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  // secondary: Platform.select({ios: fonts.helveticaNeue, android: fonts.sansSerif}),
  /**
   * Lets get fancy with a monospace font!
   */
  // code: Platform.select({ios: fonts.courier, android: fonts.monospace}),
};

export const Globaltypography = StyleSheet.create({
  button: {
    fontFamily: typography.primary.Medium,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
  },
  default: {
    fontFamily: typography.primary.Regular,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
  },
  formLabel: {
    fontFamily: typography.primary.Regular,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 21,
  },

  heading: {
    fontFamily: typography.primary.Bold,
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 30,
  },

  headingDescription: {
    fontFamily: typography.primary.Medium,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
  },

  smallButton: {
    fontFamily: typography.primary.Regular,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 15,
  },
  subHeading: {
    fontFamily: typography.primary.Bold,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 23,
  },
  textInputHeading: {
    fontFamily: typography.primary.Medium,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16,
  },
});
