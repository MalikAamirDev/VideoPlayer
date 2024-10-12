import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AppButton, AppScreen, AppText, AuthHeader, BackButton, OTPFieldInput} from '../../components';
import {RouteProp, useRoute, useTheme} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {AuthStackParamList} from '../../routes/types.navigation';
import {styles} from './style';
import {ZodError} from 'zod';
import {confirmationCodeValidation} from '../../utils/SchemaValidation';
import {CustomTheme} from '../../theme';
import {confirmSignup, resendConfirmationCode} from '../../store/authSlice/authApiService';

export default function ConfirmSignupScreen(): JSX.Element {
  /*
   ** Hooks
   */
  const route = useRoute<RouteProp<AuthStackParamList, 'ConfirmSignupScreen'>>();
  /*
   ** Routing params
   */
  const {email, password} = route.params;
  /*
   ** States
   */
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [countDown, setCountDown] = useState<number>(59);
  const [resendCode, setResendCode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  /*
   ** Hooks
   */
  const {colors} = useTheme() as CustomTheme;
  /*
   ** Functions
   */

  /*
   ** when submit code is pressed
   */
  const submitCodePressed = () => {
    try {
      const params = {
        email,
        confirmationCode,
        password,
      };
      // api call
      console.log('params is', params);
      const data = confirmationCodeValidation.parse({confirmationCode});
      setLoading(true);
      confirmSignup(params.email, params.confirmationCode, params.password);
      setLoading(false);

      console.log('🚀 ~ submitCodePressed ~ data:', data);
    } catch (error) {
      setLoading(false);

      if (error instanceof ZodError) {
        Toast.show(error?.issues[0]?.message, Toast.LONG);
      }
      console.log('🚀 ~ submitCodePressed ~ error:', error);
    }
  };
  /*
   ** When resend code is pressed
   */
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
   **   Lifecycle methods
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

  return (
    <AppScreen>
      <BackButton />
      <AuthHeader text1={'confirmSignUp'} text2={'verificationSentCode'} />
      <OTPFieldInput textLable={'confirmationCode'} onChangeText={setConfirmationCode} />
      <AppButton title={'submit'} onPress={submitCodePressed} loading={loading} />
      <View style={styles.resendCodeViewstyle}>
        {resendCode ? (
          <AppText presetStyle={'formLabel'} onPress={onPressResendCode} transText={'didRecvCode'} />
        ) : (
          <AppText presetStyle={'formLabel'} textColor={colors.textDim}>{`Wait for 00:${countDown}`}</AppText>
        )}
      </View>
    </AppScreen>
  );
}
