import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {AppButton, AppScreen, AppText, AuthHeader, BackButton, InputTextLabel, OTPFieldInput} from '../../components';
import {RouteProp, useRoute, useTheme} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import styles from './style';
import {AuthStackParamList} from '../../routes/types.navigation';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {changePasswordSchema} from '../../utils/SchemaValidation';
import {ZodError} from 'zod';
import {CustomTheme} from '../../theme';
import {forgotChangePassword, resendConfirmationCode} from '../../store/authSlice/authApiService';

export default function ForgotChangePassScreen(): JSX.Element {
  /*
   ** Hooks
   */
  const route = useRoute<RouteProp<AuthStackParamList, 'ForgotChangePassScreen'>>();
  const navigation = useAppNavigation();
  const {colors} = useTheme() as CustomTheme;
  /*
   ** Routing params
   */
  const {email} = route.params;
  console.log('emailAddress', route.params);
  /*
   ** States
   */
  const [password, setPassword] = useState<string>('Admin1234');
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('Admin1234');
  const [countDown, setCountDown] = useState<number>(59);
  const [resendCode, setResendCode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  /*
   ** Functions
   */
  // when reste btn is pressed
  const resetPassPressed = async () => {
    try {
      const params = {
        confirmationCode,
        email: email?.trim(),
        password,
        confirmPassword,
      };
      const data = changePasswordSchema.parse(params);
      console.log('🚀 ~ resetPassPressed ~ data:', data);
      setLoading(true);
      await forgotChangePassword(params.email, params.password, params.confirmationCode);
      setLoading(false);

      navigation.goBack();
      navigation.goBack();
    } catch (error) {
      console.log('🚀 ~ appBtnPress ~ error:', error);
      setLoading(true);
      if (error instanceof ZodError) {
        Toast.show(error?.issues[0]?.message, Toast.LONG);
      }
    }
  };

  // when resend code is pressed
  const onPressResendCode = async () => {
    setResendCode(false);
    try {
      setLoading(true);
      await resendConfirmationCode(email);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('🚀 ~ onPressResendCode ~ error:', error);
    }
  };
  /*
   ** Lifecycles
   */
  useEffect(() => {
    // if rensend code is false then only count start
    let interval: NodeJS.Timeout;
    if (resendCode === false) {
      interval = setInterval(() => {
        if (countDown < 1) {
          setResendCode(true);
          setCountDown(59);
          clearInterval(interval);
        } else {
          setCountDown(prevValue => prevValue - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [resendCode, countDown]);

  // Rendering
  return (
    <AppScreen>
      <BackButton />

      <AuthHeader text1={'forgotPasswordBold'} text2={'forgotChangePasswordLable'} viewStyle={styles.mainView} />

      <InputTextLabel textLable={'password'} onChangeText={setPassword} value={password} isPassword={true} />

      <InputTextLabel
        textLable={'reEnterPassword'}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        isPassword={true}
      />

      <OTPFieldInput textLable={'confirmationCode'} onChangeText={setConfirmationCode} />

      <AppButton title={'resetPassword'} onPress={resetPassPressed} loading={loading} />

      <View style={styles.resendCodeViewstyle}>
        {resendCode ? (
          <AppText presetStyle={'formLabel'} onPress={onPressResendCode} transText={'didRecvCode'} />
        ) : (
          <AppText
            presetStyle={'formLabel'}
            onPress={onPressResendCode}
            textColor={colors.textDim}>{`Wait for 00:${countDown}`}</AppText>
        )}
      </View>
    </AppScreen>
  );
}
