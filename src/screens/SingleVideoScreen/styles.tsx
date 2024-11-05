import {StyleSheet} from 'react-native';
import {pixelSizeY} from '../../utils/size';
import {useTheme} from '@react-navigation/native';
import {CustomTheme} from '../../theme';

const useStyles = () => {
  const {colors} = useTheme() as CustomTheme;
  return StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: colors.background,
      paddingVertical: pixelSizeY(10),
      paddingBottom: pixelSizeY(20),
      marginBottom: pixelSizeY(30),
    },
  });
};

export default useStyles;
