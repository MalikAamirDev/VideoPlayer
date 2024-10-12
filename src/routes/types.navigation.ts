import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
/*
 ** Bottom tab screen list
 */
export type BottomTabNavigatorParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
};
/*
 **Root strack params list
 */
export type RootStackParamList = {
  HomeStackScreens: NavigatorScreenParams<HomeStackParamList>;
  AuthStackScreens: NavigatorScreenParams<AuthStackParamList>;
};
/*
 **  Auth screen parameters types
 */
export type AuthStackParamList = {
  onBoardingScreen: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPasswordScreen: undefined;
  ForgotChangePassScreen: {email: string};
  ContactScreen: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  ConfirmSignupScreen: {email: string; password: string};
};
export type HomeStackParamList = {
  BottomTab: NavigatorScreenParams<BottomTabNavigatorParamList>;
};

export type HomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList>,
  BottomTabNavigationProp<BottomTabNavigatorParamList>
>;

export interface tabBarIconType {
  color: string;
  size: number;
  item: {
    name: string;
    component: () => React.JSX.Element;
    tabBarIcon: any;
    tabBarLabel: string;
  };
}
