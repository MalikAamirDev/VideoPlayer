import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppHeader} from '../components';
import {HeaderProps} from '../components/common/AppHeader';

/**
 * A hook that can be used to easily set the Header of a react-navigation screen from within the screen's component
 */

export function useHeader(headerProps: HeaderProps, deps: React.DependencyList = []) {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <AppHeader {...headerProps} />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, ...deps, headerProps]);
}
