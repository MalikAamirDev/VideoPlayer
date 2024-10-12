import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import AppButton from './AppButton';
import {en} from '../../labels';
import {COLORS} from '../../theme';

export type Props = {error: Error; resetError: () => void};
/*
 ** Cutsom error componenet
 */
const CustomError = (props: Props) => {
  // destructring props
  const {error, resetError} = props;
  console.log('🚀 ~ CustomError ~ error:', error);
  /*
   ** Function
   */
  /*
   ** Reseting to render the whole app
   */
  const resetingState = () => {
    resetError();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{en.oops}</Text>
        <Text style={styles.subtitle}>{en.errorBoundaryLable}</Text>
        {/* <Text style={styles.error}>{error.toString()}</Text> */}

        <AppButton title={'tryAgain'} onPress={resetingState} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: 16,
  },

  subtitle: {
    color: COLORS.palette.black,
    fontSize: 32,
    fontWeight: '800',
  },

  title: {
    color: COLORS.palette.black,
    fontSize: 48,
    fontWeight: '300',
    paddingBottom: 16,
  },
});

export default CustomError;
