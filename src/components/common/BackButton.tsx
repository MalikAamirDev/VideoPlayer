import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {SVG} from '../../assets';
import {COLORS, CustomTheme} from '../../theme';
import {normalizeHeight, normalizeWidth, pixelSizeY} from '../../utils/size';

interface backBtnType {
  fillColor?: string;
  viewStyle?: ViewStyle;
}

export default function BackButton(props: backBtnType): JSX.Element {
  /*
   ** Props
   */
  const {fillColor = COLORS.background, viewStyle = {}} = props;
  /*
   ** Hooks
   */
  const navigation = useNavigation();
  const {colors} = useTheme() as CustomTheme;

  return (
    <TouchableOpacity
      style={[styles.mainViewStyle, viewStyle]}
      onPress={() => navigation.goBack()}>
      <SVG.BackIcon fill={fillColor || colors.inverseColor} />
      {/* <AppIcon icon={'BackIcon'} color={colors.background} /> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainViewStyle: {
    alignItems: 'center',
    // backgroundColor: COLORS.palette.secondary300,
    borderRadius: 20,
    height: normalizeHeight(40),
    justifyContent: 'center',
    marginLeft: normalizeWidth(12),
    marginTop: pixelSizeY(21),
    width: normalizeWidth(40),
  },
});
