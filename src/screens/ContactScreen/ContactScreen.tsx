import React, {useState} from 'react';
import {
  AppButton,
  AuthHeader,
  BackButton,
  InputLablePhoneNumber,
  InputTextLabelDropDown,
  InputTextLableCountry,
  AppScreen,
} from '../../components';
import {RouteProp, useRoute} from '@react-navigation/native';
import styles from './style';
import Toast from 'react-native-simple-toast';
import {countryStates} from '../../data';
import {AuthStackParamList} from '../../routes/types.navigation';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {signUp} from '../../store/authSlice/authApiService';

export default function ContactScreen() {
  /*
   ** Routing params
   */
  const route = useRoute<RouteProp<AuthStackParamList, 'ContactScreen'>>();
  const {lastName, email, password, firstName} = route.params;
  /*
   ** States
   */
  const [state, setState] = useState<string>('sindh');
  const [country, setCountry] = useState<string>('afghanistan');
  const [phoneNumber, setPhoneNumber] = useState<string>('3344616166');
  const [loading, setLoading] = useState<boolean>(false);
  /*
   ** Hooks
   */
  const navigation = useAppNavigation();
  /*
   ** Functions
   */
  const checkTextFieldValidation = (): boolean => {
    if (!phoneNumber || !state) {
      return false;
    }
    return true;
  };
  /*
   ** when signUp pressedfor
   */
  const SignUpPressed = async () => {
    if (!checkTextFieldValidation()) {
      Toast.show('Input fields required', Toast.LONG);
      return;
    }
    try {
      const params = {
        emailAddress: email?.toLowerCase(),
        password,
        firstName,
        lastName,
        phoneNumber: phoneNumber ? `+1${phoneNumber}` : undefined,
        state,
        city: country,
      };

      console.log('params is:', params);
      setLoading(true);
      await signUp(params);
      setLoading(false);

      // navigating to another screen
      navigation.navigate('ConfirmSignupScreen', {
        email,
        password,
      });
    } catch (error) {
      setLoading(false);
      console.log('🚀 ~ SignUpPressed ~ error:', error);
    }
  };

  return (
    <AppScreen>
      <BackButton />
      <AuthHeader text1={'contact'} text2={'contactLable'} />
      <InputLablePhoneNumber
        textLable={'phoneNumber'}
        viewStyle={styles.InputViewStyle}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
      />
      <InputTextLableCountry
        textLable={'Country'}
        viewStyle={styles.InputViewStyle}
        onCountrySelect={setCountry}
        value={country}
        placeHolder={'select-country'}
      />
      <InputTextLabelDropDown
        textLable={'state'}
        viewStyle={styles.InputViewStyle}
        onChangeText={setState}
        value={state}
        dropDown={true}
        dropDownData={countryStates}
      />

      {/* Main button */}
      <AppButton loading={loading} title={'signUp'} onPress={SignUpPressed} />
    </AppScreen>
  );
}
