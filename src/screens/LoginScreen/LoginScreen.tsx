import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {AppButton, AppScreen, AppText, AuthHeader, BackButton, InputTextLabel} from '../../components';
import Toast from 'react-native-simple-toast';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {ZodError} from 'zod';
import {loginSchema} from '../../utils/SchemaValidation';
import styles from './style';
import {useAppStore} from '../../store';
import {signIn} from '../../store/authSlice/authApiService';

export default function LoginScreen(): JSX.Element {
  /*
   ** States
   */
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const userData = useAppStore(state => state.userData);

  console.log('🚀 ~ LoginScreen ~ userData:', userData);
  /*
   * Hooks
   */
  const navigation = useAppNavigation();
  /*
   * Functions
   */
  /*
   *  Btn press to make user Login
   */
  const appBtnPress = async () => {
    try {
      const params = {
        email: emailAddress?.trim(),
        password,
      };
      loginSchema.parse(params);
      setLoading(true);
      // singing user in app
      await signIn(params);
      setLoading(false);
      console.log('params:', params);
    } catch (error: unknown | ZodError) {
      setLoading(false);
      if (error instanceof ZodError) {
        Toast.show(error?.issues[0]?.message, Toast.LONG);
      }
      console.log('🚀 ~ appBtnPress ~ error:', error);
    }
  };
  return (
    <AppScreen>
      <BackButton />

      <AuthHeader text1={'welcomeBack'} text2={'signInLabel'} />

      <InputTextLabel textLable={'email'} onChangeText={setEmailAddress} value={emailAddress} />
      <InputTextLabel textLable={'password'} onChangeText={setPassword} value={password} isPassword={true} />

      <AppButton title={'login'} onPress={appBtnPress} loading={loading} />

      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <AppText transText={'forgotPasswordsmall'} presetStyle={'default'} />
      </TouchableOpacity>
    </AppScreen>
  );
}
