import React from 'react';
import {StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle} from 'react-native';
import {TxKeyPath} from '../../i18n/types';
import {useTranslation} from 'react-i18next';
import {Globaltypography} from '../../theme';
import {useTheme} from '@react-navigation/native';

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  transText?: TxKeyPath;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;
  /**
   * One of the different types of text presets.
   */
  presetStyle?: keyof typeof presets;
  /**
   * Children components.
   */
  children?: React.ReactNode;
  /*
   ** TextColor
   */
  textColor?: string;
}

export default function AppText(props: TextProps) {
  const {transText, children, style, presetStyle, textColor, ...TextProps} = props;
  /*
   ** Hooks
   */
  const {t} = useTranslation();
  const {colors} = useTheme();
  /*
   ** Constructing style for text
   */
  const textStyle: StyleProp<TextStyle> = [
    presetStyle && presets[presetStyle],
    {color: textColor || colors.text},
    style,
  ];

  return (
    <RNText style={textStyle} {...TextProps}>
      {transText ? t(transText) : children}
    </RNText>
  );
}
/*
 ** Already define presets
 */
const presets = {
  ...Globaltypography,
};
