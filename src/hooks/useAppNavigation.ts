import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList, HomeStackParamList} from '../routes/types.navigation';

/*
 ** We are buildong our own custome navigation function by  merging both stack params list
 */
export function useAppNavigation<T extends ParamListBase = AuthStackParamList & HomeStackParamList>() {
  const navigation = useNavigation<NativeStackNavigationProp<T>>();

  return navigation;
}
