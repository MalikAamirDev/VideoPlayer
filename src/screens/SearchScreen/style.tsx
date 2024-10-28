import {StyleSheet} from 'react-native';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
  pixelSizeX,
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
      paddingVertical: pixelSizeY(10),
      paddingBottom: pixelSizeY(20),
      marginBottom: pixelSizeY(30),
    },
    headerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: pixelSizeY(12),
    },
    inputViewStyle: {
      marginLeft: pixelSizeX(10),

      width: '80%',
    },
    inputStyle: {
      fontSize: normalizeFont(14),
      borderWidth: 0.5,
      borderRadius: 12,
    },

    videoMainView: {
      borderRadius: pixelSizeY(10),
      marginBottom: pixelSizeY(10),
      flexDirection: 'row',
      alignItems: 'center',
      padding: pixelSizeY(5),
      paddingHorizontal: pixelSizeY(12),
    },
    image: {
      height: normalizeHeight(75),
      width: normalizeWidth(100),
      borderRadius: pixelSizeY(10),
    },
    titleViewStyle: {
      width: '63%',
      marginRight: pixelSizeY(9),
      marginLeft: pixelSizeY(9),
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
    moreOption: {
      position: 'absolute',
      right: pixelSizeX(40),
      top: pixelSizeY(7),
      paddingLeft: pixelSizeX(10),
      backgroundColor: colors.background,
      padding: pixelSizeY(7),
      borderRadius: pixelSizeY(10),
      zIndex: 99,
      width: pixelSizeX(130),
      shadowColor: colors.inverseColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    moreOptionTextStyle: {
      fontSize: normalizeFont(17),
      color: colors.titleColor,
      paddingVertical: pixelSizeY(5),
    },
    moreOptionView: {
      paddingVertical: pixelSizeY(17),
      paddingHorizontal: pixelSizeX(7),
    },
    bannerView: {
      position: 'absolute',
      bottom: 12,
      zIndex: 12,
    },
  });
};

export default useStyles;
