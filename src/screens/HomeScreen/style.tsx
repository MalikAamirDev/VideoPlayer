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
    },
    headerContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: pixelSizeY(10),
      marginBottom: pixelSizeY(10),
      marginHorizontal: pixelSizeY(20),
      marginTop: pixelSizeY(7),
    },
    folderSectionMain: {
      backgroundColor: colors.background,
      paddingHorizontal: pixelSizeY(20),
      flex: 1,
    },
    folderMain: {
      backgroundColor: colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'space-between',
      // paddingVertical: pixelSizeY(10),
      // paddingHorizontal: pixelSizeY(10),
    },
    loadingView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    folderImage: {
      width: normalizeWidth(75),
      height: normalizeHeight(75),
    },
    folderName: {
      fontSize: normalizeFont(17),
      fontWeight: '600',
      color: colors.titleColor,
    },
    folderLength: {
      fontSize: normalizeFont(13),
      color: colors.subTitleColor,
      marginTop: pixelSizeY(5),
    },
    folderNameView: {
      marginLeft: pixelSizeY(13),
    },
    header: {
      textAlign: 'center',
      fontSize: normalizeFont(24),
      fontWeight: 'bold',
      color: colors.titleColor,
    },
    searchIcon: {
      padding: 7,
    },
    folderSection: {
      marginBottom: pixelSizeY(24),
    },
    folderTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    videoItem: {
      marginRight: 10,
    },
    videoPlayer: {
      width: 150,
      height: 150,
      backgroundColor: '#000',
    },
  });
};

export default useStyles;
