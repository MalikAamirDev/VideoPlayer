import {StyleSheet} from 'react-native';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
  pixelSizeY,
} from '../../utils/size';
import {useTheme} from '@react-navigation/native';
import {CustomTheme} from '../../theme';

const useStyles = () => {
  const {colors} = useTheme() as CustomTheme;
  return StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: pixelSizeY(20),
      paddingVertical: pixelSizeY(10),
    },
    videoMainView: {
      backgroundColor: 'pink',
      borderRadius: pixelSizeY(10),
      marginBottom: pixelSizeY(10),
      flexDirection: 'row',
      alignItems: 'center',
      padding: pixelSizeY(5),
    },
    image: {
      height: normalizeHeight(80),
      width: normalizeWidth(100),
      borderRadius: pixelSizeY(10),
    },
    titleViewStyle: {
      width: '63%',
      marginRight: pixelSizeY(9),
      backgroundColor: 'coral',
      marginLeft: pixelSizeY(7),
    },
    titleStyle: {
      fontSize: normalizeFont(16),
      color: colors.titleColor,
    },
    dateStyle: {
      fontSize: normalizeFont(12),
      color: colors.subTitleColor,
      marginTop: pixelSizeY(7),
    },
    durationTextStyle: {
      fontSize: normalizeFont(12),
      color: colors.white,
      bottom: pixelSizeY(7),
      right: pixelSizeY(7),
      backgroundColor: colors.black,
      position: 'absolute',
      padding: pixelSizeY(2),
      borderRadius: pixelSizeY(10),
    },
  });
};

export default useStyles;
