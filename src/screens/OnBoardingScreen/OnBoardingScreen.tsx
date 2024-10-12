import {View, SafeAreaView, Image, ImageBackground} from 'react-native';
import React from 'react';
import {IMAGES} from '../../assets';
import {AppButton, AppText, FocusAwareStatusBar} from '../../components';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {CustomTheme} from '../../theme';
import {useTheme} from '@react-navigation/native';
import {$mainContainer, $smallBtn2, $smallBtn2Text, styles} from './style';

export default function OnBoardingScreen(): JSX.Element {
  /*
   * Hooks
   */
  const {colors} = useTheme() as CustomTheme;
  const navigation = useAppNavigation();
  /*
   ** Dynamic header assigment
   */
  // useHeader(
  //   {
  //     titleMode: 'center',
  //     transTitle: 'Country',
  //     LeftActionComponent: <BackButton />,
  //   },
  //   [],
  // );
  /*
   * Functions
   */
  const onPressLogin = (): void => {
    navigation.navigate('LoginScreen');
  };
  const onPressSignUp = (): void => {
    navigation.navigate('SignupScreen');
  };

  return (
    <ImageBackground source={IMAGES.onBoarding} style={$mainContainer(colors)} resizeMode={'cover'}>
      <SafeAreaView />
      <FocusAwareStatusBar />

      {/* Logo */}
      <View style={styles.appLogoView}>
        <Image source={IMAGES.appLogo} style={styles.appLogoImageStyle} resizeMode={'contain'} />
        {/* <AppImage
          source={{
            uri: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
          }}
          maxWidth={400}
        /> */}
        <AppText transText={'appLabel'} presetStyle={'heading'} textColor={colors.background} />
      </View>

      {/* Buttons */}
      <View style={styles.btnContainer}>
        <AppButton title={'login'} onPress={onPressLogin} smallBtn={true} />
        <AppButton
          title={'signUp'}
          onPress={onPressSignUp}
          smallBtn={true}
          btnStyle={$smallBtn2(colors)}
          textStyle={$smallBtn2Text(colors)}
        />
      </View>
    </ImageBackground>
  );
}
