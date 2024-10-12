import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {TabScreens} from '../data';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabNavigatorParamList, tabBarIconType} from './types.navigation';
import {COLORS, CustomTheme, Globaltypography} from '../theme';
import {useTheme} from '@react-navigation/native';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

// function for tab bar icon redering
const TabBarIconFunc = ({color, size, item}: tabBarIconType) => {
  return <item.tabBarIcon fill={color} width={size} heigth={size} />;
};

const BottomTab = (): JSX.Element => {
  /*
   ** Hooks
   */
  const insets = useSafeAreaInsets();
  const {colors} = useTheme() as CustomTheme;

  return (
    <Tab.Navigator
      initialRouteName={'HomeScreen'}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.palette.primary,
        tabBarInactiveTintColor: colors.palette.secondary100,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          styles.tabBarStyle,
          {height: insets.bottom + 55, backgroundColor: colors.background},
        ],

        // tabBarItemStyle: $tabBarItem,
      }}>
      {TabScreens.map((item, index) => (
        <Tab.Screen
          key={`index-${index}`}
          name={item.name as keyof BottomTabNavigatorParamList}
          component={item.component}
          options={{
            tabBarIcon: ({color, size}) => TabBarIconFunc({color, size, item}),
            tabBarLabel: item.tabBarLabel,
            tabBarLabelStyle: styles.label,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    ...Globaltypography.formLabel,
  },
  tabBarStyle: {
    shadowColor: COLORS.palette.black,
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
});

export default BottomTab;
