import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors, HEIGHT, WIDTH} from '../../theme';

const styles = StyleSheet.create({
  appLogoImageStyle: {
    height: HEIGHT * 0.1,
    width: WIDTH * 0.3,
  },
  appLogoView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 50,
    position: 'absolute',
    top: 100,
    width: '100%',
  },
  btnContainer: {
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    position: 'absolute',
    width: '100%',
  },
});

const $smallBtn2 = (colors: Colors): ViewStyle => {
  return {
    backgroundColor: colors.background,
  };
};
const $smallBtn2Text = (colors: Colors): TextStyle => {
  return {
    color: colors.buttonTextSeconday,
  };
};
const $mainContainer = (colors: Colors): ViewStyle => {
  return {
    backgroundColor: colors.background,
    flex: 1,
  };
};

export {styles, $smallBtn2, $smallBtn2Text, $mainContainer};
