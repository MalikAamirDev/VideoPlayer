import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS} from '../../theme';

export default function SaperatorLine(props: SaperatorLineType): JSX.Element {
  /*
   ** destructring props
   */
  const {veiwStyle2 = {}} = props;

  return <View style={[styles.viewStyle, veiwStyle2]} />;
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: COLORS.palette.secondary500,
    height: 20,
    marginHorizontal: 5,
    width: 1.5,
  },
});

interface SaperatorLineType {
  veiwStyle2: ViewStyle;
}
