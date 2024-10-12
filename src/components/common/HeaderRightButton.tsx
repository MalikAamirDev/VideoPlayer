import {ActivityIndicator, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS} from '../../theme';

export default function HeaderRightButton(props: headerRightButtonType): JSX.Element {
  /*
   ** destructuring props
   */
  const {children = <></>, viewStyle, onPress, loading = false} = props;

  return (
    <TouchableOpacity style={[styles.mainViewStyle, viewStyle]} onPress={onPress}>
      {loading ? <ActivityIndicator size={'small'} color={COLORS.palette.black} /> : <View>{children}</View>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainViewStyle: {
    position: 'absolute',
    right: 21,
    top: 30,
  },
});

interface headerRightButtonType {
  children: JSX.Element;
  viewStyle?: ViewStyle;
  onPress?: () => void;
  loading?: boolean;
}
