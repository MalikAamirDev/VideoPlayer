import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {TxKeyPath} from '../../i18n/types';
import AppText from './AppText';
import {useTheme} from '@react-navigation/native';
import {CustomTheme} from '../../theme';

interface authHeaderType {
  text1: TxKeyPath;
  text2?: TxKeyPath;
  viewStyle?: ViewStyle;
  upperTextStyle?: ViewStyle;
}

export default function AuthHeader(props: authHeaderType): JSX.Element {
  /*
   ** Props
   */
  const {text1, text2, viewStyle = {}, upperTextStyle = {}} = props;
  /*
   ** Hooks
   */
  const {colors} = useTheme() as CustomTheme;

  return (
    <View style={[styles.mainView, viewStyle]}>
      <AppText presetStyle={'heading'} transText={text1} style={upperTextStyle} />
      <AppText
        presetStyle={'headingDescription'}
        transText={text2}
        style={styles.lowerTextStyle}
        textColor={colors.textDim}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lowerTextStyle: {marginTop: 10},
  mainView: {
    marginLeft: 21,
    marginVertical: 30,
  },
});
