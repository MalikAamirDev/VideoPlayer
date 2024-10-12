import {StatusBar, StatusBarStyle} from 'react-native';
import React from 'react';
import {useIsFocused, useTheme} from '@react-navigation/native';
import {CustomTheme} from '../../theme';

export default function FocusAwareStatusBar(props: FocusAwareStatusBarType): JSX.Element | null {
  /*
   ** Props
   */
  const {barStyle = 'default', backgroundColor = ''} = props;
  /*
   ** Hooks
   */
  const isFocused = useIsFocused();
  const {colors} = useTheme() as CustomTheme;

  return isFocused ? <StatusBar barStyle={barStyle} backgroundColor={colors.statusBar || backgroundColor} /> : null;
}

interface FocusAwareStatusBarType {
  barStyle?: StatusBarStyle;
  backgroundColor?: string;
}
