import React from 'react';
import {ActivityIndicator, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Colors, WIDTH, CustomTheme, COLORS} from '../../theme';
import {TxKeyPath} from '../../i18n/types';
import AppText from './AppText';

export default function AppButton(props: appBtnType): JSX.Element {
  /*
   ** Props
   */
  const {
    title = '',
    onPress,
    disabled = false,
    loading = false,
    loadingColor,
    btnStyle = {},
    textStyle = {},
    activeOpacity = 0.8,
    RightChild = null,
    leftChild = null,
    smallBtn = false,
  } = props;

  /*
   ** Hooks
   */
  const {colors} = useTheme() as CustomTheme;

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={[styles.defaultBtnStyle, smallBtn ? $smallBtnStyle(colors) : $largeBtnStyle(colors), btnStyle]}>
      {RightChild && <View style={styles.childrenViewStyle}>{RightChild}</View>}
      {title && (
        <AppText
          style={textStyle}
          numberOfLines={1}
          presetStyle={'button'}
          transText={title}
          textColor={colors.buttonTextPrimary}
        />
      )}
      {leftChild && <View style={styles.childrenViewStyle}>{leftChild}</View>}

      {loading && <ActivityIndicator color={loadingColor || colors.background} style={styles.loading} size={'small'} />}
    </TouchableOpacity>
  );
}
/*
 ** This style approach is used for synamic styles
 */
const $largeBtnStyle = (colors: Colors): ViewStyle => {
  return {
    backgroundColor: colors.button,
    borderColor: colors.buttonBorder,
    width: WIDTH - 40,
  };
};

const $smallBtnStyle = (colors: Colors): ViewStyle => {
  return {
    backgroundColor: colors.button,
    borderColor: colors.buttonBorder,
    width: WIDTH * 0.4,
  };
};

const styles = StyleSheet.create({
  childrenViewStyle: {
    marginRight: 20,
  },
  defaultBtnStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.button,
    borderColor: COLORS.buttonBorder,
    borderRadius: 8,
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    marginTop: 20,
    width: WIDTH - 40,
  },
  loading: {
    marginLeft: 10,
  },
});

interface appBtnType {
  title: TxKeyPath;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingColor?: string;
  btnStyle?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;
  RightChild?: JSX.Element | null;
  leftChild?: JSX.Element | null;
  smallBtn?: boolean;
}
