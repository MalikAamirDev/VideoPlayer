import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {COLORS, CustomTheme} from '../../theme';
import {useTheme} from '@react-navigation/native';
// App Imports

export default function Loading(props: loadingType) {
  /*
   ** Destructring props
   */
  const {fullScreen = false} = props;
  /*
   ** Hooks
   */
  const {colors} = useTheme() as CustomTheme;

  return (
    <View style={fullScreen ? styles.mainStyle : null}>
      <ActivityIndicator color={colors.loaderPrimary} size={'large'} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainStyle: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: 'center',
  },
});

interface loadingType {
  fullScreen: boolean;
}
