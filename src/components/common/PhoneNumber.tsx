import {Text, View} from 'react-native';
import React from 'react';
import {COLORS, GlobalStyles} from '../../theme';

export default function PhoneNumber(props: PhoneNumberType) {
  // desrtucrting props
  const {code} = props;
  return (
    <View>
      <Text style={{color: COLORS.text, ...GlobalStyles.l3}}>{`+${code}`}</Text>
    </View>
  );
}

interface PhoneNumberType {
  code: string;
}
