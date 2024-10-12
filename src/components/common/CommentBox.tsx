import {StyleSheet, View, TextInput, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS} from '../../theme';
import AppText from './AppText';
import {TxKeyPath} from '../../i18n/types';

interface commentBoxType {
  textLable: TxKeyPath;
  textInputStyle?: ViewStyle;
  textLabelStyle?: ViewStyle;
  viewStyle: ViewStyle;
  onChangeText: (text: string) => void;
  placeHolder: string;
  value: string | undefined;
}

export default function CommentBox(props: commentBoxType): JSX.Element {
  // destuctruing props
  const {
    textLable,
    textInputStyle = {},
    textLabelStyle = {},
    viewStyle = {},
    onChangeText,
    placeHolder = '',
    value,
  } = props;
  // Rerendering
  return (
    <View style={viewStyle}>
      <AppText transText={textLable} presetStyle={'textInputHeading'} style={textLabelStyle} />
      <TextInput
        style={[styles.textInput2, textInputStyle]}
        scrollEnabled={false}
        placeholderTextColor={COLORS.textDim}
        textAlignVertical={'top'}
        blurOnSubmit={true}
        multiline
        onSubmitEditing={() => {
          console.debug('finised.....');
        }}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput2: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
    borderRadius: 6,
    borderWidth: 0.5,
    color: COLORS.palette.black,
    height: 110,
    paddingHorizontal: 10,
    width: '80%',
  },
});
