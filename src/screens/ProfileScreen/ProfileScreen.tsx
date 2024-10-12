import {Text, View} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import {AppButton} from '../../components';
import {useAppStore} from '../../store';
import {signOut} from '../../store/authSlice/authApiService';

const ProfileScreen = () => {
  /*
   ** Hooks
   */
  const userData = useAppStore(state => state.userData);
  const userTokens = useAppStore(state => state.tokens);
  /*
   ** States
   */
  const [loading, setLoading] = useState<boolean>(false);
  /*
   ** Functions
   */
  const userSignOut = async () => {
    try {
      setLoading(true);
      await signOut(userData?.PK as string, userTokens.accessToken);
      setLoading(false);
    } catch (error) {
      console.log('🚀 ~ signOut ~ error:', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainView}>
      <Text>ProfileScreen</Text>
      <AppButton title={'logout'} onPress={() => userSignOut()} loading={loading} />
    </View>
  );
};

export default ProfileScreen;
