import {StyleSheet, View, TouchableOpacity, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import DatePickerModal from '../modals/DatePickerModal';
import {SVG} from '../../assets';
import {COLORS, WIDTH} from '../../theme';
import AppText from './AppText';
import {TxKeyPath} from '../../i18n/types';

interface InputDatePickerType {
  textLable: TxKeyPath;
  textInputStyle?: ViewStyle;
  textLabelStyle?: ViewStyle;
  viewStyle?: ViewStyle;
  onPressDate: (data: Date) => void;
  calenderIcon?: boolean;
  value: Date;
}

export default function InputDatePicker(props: InputDatePickerType): JSX.Element {
  /*
   ** Props
   */
  const {
    textLable,
    textInputStyle = {},
    textLabelStyle = {},
    viewStyle = {},
    onPressDate,
    calenderIcon = false,
    value = new Date(),
  } = props;
  /*
   ** States
   */
  const [datePickerModal, setDatePickerModal] = useState(false);

  /*
   ** redering date for display / formatting date for to display
   */
  const renderDateToDisplay = (): JSX.Element => {
    if (value) {
      const tempDate = new Date(value);
      return <AppText presetStyle={'default'}>{tempDate.toLocaleDateString('en-US')}</AppText>;
    } else {
      return <AppText transText={'selectDate'} presetStyle={'default'} />;
    }
  };
  return (
    <TouchableOpacity style={[styles.mainContStyle, viewStyle]} onPress={() => setDatePickerModal(true)}>
      <AppText transText={textLable} presetStyle={'textInputHeading'} style={textLabelStyle} />
      <View style={[styles.inputStyle2, textInputStyle]}>
        {renderDateToDisplay()}
        {calenderIcon && <SVG.CalenderIcon />}
      </View>
      <DatePickerModal
        visible={datePickerModal}
        setVisible={setDatePickerModal}
        onSelectedDate={(date: Date) => onPressDate(date)}
        value={value}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inputStyle2: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: COLORS.border,
    borderRadius: 6,
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 45,
    marginLeft: 10,
    marginTop: 10,
    width: '100%',
  },
  mainContStyle: {
    alignSelf: 'center',
    marginTop: 15,
    width: WIDTH - 40,
  },
});
