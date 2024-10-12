import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {authScreens, homeScreen} from '../data';
import {
  AuthStackParamList,
  HomeStackParamList,
  RootStackParamList,
} from './types.navigation';
import {useBackButtonHandler, navigationRef} from './navigationUtilities';
import BaseConfig from '../config';
import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {DARK_COLORS, DEFAULT_COLORS} from '../theme';
import {useAppStore} from '../store';
import {fetchUserDataLocal} from '../store/authSlice/authApiService';
/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = BaseConfig.exitRoutes;
/*
 ** Auth stack and navigator for rest of the screen
 */
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AuthStackScreens = (): JSX.Element => {
  return (
    <AuthStack.Navigator>
      {authScreens.map(item => {
        return (
          <AuthStack.Screen
            key={item.id}
            name={item.screenName as keyof AuthStackParamList}
            component={item.component}
            options={{headerShown: false}}
          />
        );
      })}
    </AuthStack.Navigator>
  );
};
/*
 ** Home stack and navigator for rest of the screen
 */
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const HomeStackScreens = (): JSX.Element => {
  return (
    <HomeStack.Navigator>
      {homeScreen.map(item => {
        return (
          <HomeStack.Screen
            key={item.id}
            name={item.screenName as keyof HomeStackParamList}
            component={item.component}
            options={{headerShown: false}}
          />
        );
      })}
    </HomeStack.Navigator>
  );
};
/*
 ** Root stack and navigator
 */
const RootStack = createNativeStackNavigator<RootStackParamList>();
const RootNavigator = (): JSX.Element => {
  /*
   **  Hooks
   */

  const userData = useAppStore(state => state.userData);
  console.log('🚀 ~ RootNavigator ~ userData:', userData);

  /*
   ** check is user signed in or not
   */
  // life cycles methods
  useEffect(() => {
    /* *
    your logic for checking if user logged in or not  you need to get the token from asnyc
    then your check if userData is their user is logged then but before showing to homeStack
    your need to check the is token is expired or not if expired then your need to fetch another token
    by using refresh token
    1 step: check if you got accessToken in async or not if no this mean user is not signed in
    2 step: if you find accessToken and userData this mean user is logged in but we still need to update our data
    3 step: we make a api call to get latest userData from server and save it on async as well as on state varaible
    4 step: we hide splash screen
     */
    // dispatch(fetchDataFromLocalStorage())
    //   .then(data => {
    //     console.debug('data is :', data);
    //     RNBootSplash.hide();
    //   })
    //   .catch(e => {
    //     RNBootSplash.hide();
    //     console.log('error is:', e);
    //   });
    // Fetching user data from local
    // const fetchUserData = async () => {
    //   try {
    //     const user = loadStorage(ASYNC_USER_DATA_KEY) as userDataType;
    //     const userToken = loadStorage(ASYNC_TOKEN_KEY) as tokenType;

    //     console.log('🚀 ~ fetchUserDataLocal: ~ user:', user);
    //     console.log('🚀 ~ fetchUserDataLocal: ~ userToken:', userToken);
    //   } catch (error: any) {
    //     console.log('🚀 ~ fetchUserDataLocal: ~ error:', error);
    //   }
    // };
    fetchUserDataLocal().then(date =>
      console.log('hidihng splash screen here', date),
    );
  }, []);

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={!userData ? 'HomeStackScreens' : 'AuthStackScreens'}
        component={!userData ? HomeStackScreens : AuthStackScreens}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

/*
 ** Main navigator
 */
export default function AppNavigator(): JSX.Element {
  /*
   **  Hooks
   */
  const theme = useColorScheme();
  /*
   ** Back handler for android
   */
  useBackButtonHandler(routeName => exitRoutes.includes(routeName));
  /*
   ** Constucting theme according to deafult mobile theme
   */
  const MyTheme = {
    dark: theme === 'dark' && true,
    colors: theme === 'dark' ? {...DARK_COLORS} : {...DEFAULT_COLORS},
  };

  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
}
