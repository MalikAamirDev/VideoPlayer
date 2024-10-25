import {StyleSheet} from 'react-native';
import {normalizeFont, pixelSizeX, pixelSizeY} from '../../utils/size';
import {useTheme} from '@react-navigation/native';
import {CustomTheme} from '../../theme';

const useStyles = () => {
  const {colors} = useTheme() as CustomTheme;
  return StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: pixelSizeY(22),
    },
    backContainerStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.black,
      marginBottom: pixelSizeY(25),
      paddingVertical: pixelSizeY(12),
      marginTop: pixelSizeY(12),
    },
    backBtnStyle: {
      paddingVertical: pixelSizeY(10),
      paddingHorizontal: pixelSizeX(10),
      marginLeft: pixelSizeX(22),
    },
    imgStyle: {
      width: 25,
      height: 25,
    },
    bodyImgStyle: {
      marginTop: 3,
      width: 25,
      height: 25,
    },
    backBtnTextStyle: {
      fontSize: normalizeFont(22),
      color: colors.white,
      fontWeight: '600',
      width: '72%',
      textAlign: 'center',
    },
    boxMainStyle: {
      flexDirection: 'row',
    },
    horizontalLineStyle: {
      backgroundColor: colors.subTitleColor,
      height: pixelSizeY(1),
      marginBottom: pixelSizeY(22),
    },
    textStyle: {
      fontSize: normalizeFont(22),
      color: colors.titleColor,
      fontWeight: '400',
      marginBottom: pixelSizeY(22),
      marginLeft: pixelSizeX(22),
    },
    adContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export default useStyles;
