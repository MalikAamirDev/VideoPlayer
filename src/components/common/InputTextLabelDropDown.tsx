import {StyleSheet, View, TextInput, TouchableOpacity, FlatList, ViewStyle, KeyboardTypeOptions} from 'react-native';
import React, {useState} from 'react';
import {SVG} from '../../assets';
import {COLORS, HEIGHT} from '../../theme';
import AppText from './AppText';
import {TxKeyPath} from '../../i18n/types';

type dataItem = {
  id: number;
  title: string;
};
interface InputTextLabelDropDownType {
  textLable: TxKeyPath;
  textInputStyle?: ViewStyle;
  textLabelStyle?: ViewStyle;
  editable?: boolean;
  viewStyle?: ViewStyle;
  onChangeText: (text: string) => void;
  keyType?: KeyboardTypeOptions;
  placeHolder?: string;
  value?: string | undefined;
  disableAutoCapitalize?: boolean;
  dropDownData: dataItem[];
  dropDown: boolean;
}

export default function InputTextLabelDropDown(props: InputTextLabelDropDownType): JSX.Element {
  /*
   ** Props
   */
  const {
    textLable,
    textInputStyle = {},
    textLabelStyle = {},
    editable = true,
    viewStyle = {},
    onChangeText,
    keyType = 'default',
    placeHolder = '',
    value = '',
    dropDown = false,
    dropDownData = [],
    disableAutoCapitalize = false,
  } = props;
  /*
   ** State
   */
  const [itemData, setItemData] = useState(dropDownData);
  const [isDropDown, setIsDropDown] = useState(false);
  /*
   ** Hooks
   */
  /*
   ** Functions
   */
  /*
   ** Everything when user type fillter condition execute to filte data
   */
  const onChangeTextDropDown = (e: string): void => {
    onChangeText(e);
    setItemData(dropDownData.filter(item => item.title?.toLowerCase()?.includes(e?.toLowerCase())));
  };
  /*
   ** Rendering breederlist in drop down view
   */
  const renderBreederList = ({item}: {item: dataItem}): JSX.Element => {
    return (
      <TouchableOpacity
        style={styles.renderItemStyle}
        onPress={() => {
          onChangeText(item?.title);
          setIsDropDown(false);
        }}>
        <AppText presetStyle={'default'}>{item?.title}</AppText>
      </TouchableOpacity>
    );
  };
  /*
   ** Redering drop down view if data is there if not it will return list is empty
   */
  const renderDropDownView = (): JSX.Element => {
    if (!isDropDown) {
      return <></>;
    }
    if (dropDownData.length === 0) {
      return (
        <View style={styles.dropDownViewStyle}>
          <AppText transText={'listIsEmpty'} presetStyle={'textInputHeading'} style={textLabelStyle} />
        </View>
      );
    }
    if (isDropDown && dropDownData?.length > 0) {
      return (
        <View style={styles.dropDownViewStyle}>
          <FlatList
            data={itemData}
            keyExtractor={(item, index) => `index-${index}`}
            showsVerticalScrollIndicator={true}
            renderItem={renderBreederList}
          />
        </View>
      );
    }
    return <></>;
  };
  return (
    <View style={viewStyle}>
      <AppText transText={textLable} presetStyle={'textInputHeading'} style={textLabelStyle} />
      <View style={[styles.inputStyle2, textInputStyle]}>
        <TextInput
          style={styles.textInput2}
          editable={editable}
          keyboardType={keyType}
          onFocus={() => setIsDropDown(true)}
          placeholderTextColor={'rgba(137, 137, 137, 1)'}
          placeholder={placeHolder}
          value={value}
          onChangeText={text => {
            if (dropDownData) {
              onChangeTextDropDown(text);
            } else {
              onChangeText(text);
            }
          }}
          autoCapitalize={disableAutoCapitalize ? 'none' : 'sentences'}
          autoCorrect={false}
        />
        {/* rendering drop down icon */}

        <TouchableOpacity
          style={styles.rightButtonStyle}
          onPress={() => {
            setIsDropDown(!isDropDown);
          }}>
          {isDropDown ? <SVG.DropUpIcon /> : <SVG.DropDownIcon />}
        </TouchableOpacity>
      </View>
      {/* rendering drop down view */}
      {dropDown ? renderDropDownView() : null}
    </View>
  );
}

const styles = StyleSheet.create({
  dropDownViewStyle: {
    backgroundColor: COLORS.background,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderColor: COLORS.border,
    borderTopWidth: 0,
    borderWidth: 0.5,
    height: HEIGHT * 0.24,
    marginTop: -4,
    paddingBottom: 3,
    width: '100%',
    // position: 'absolute',
    // top: 70,
  },
  inputStyle2: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: COLORS.border,
    borderRadius: 6,
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 45,
    marginTop: 10,
    paddingLeft: 10,
    width: '100%',
  },
  renderItemStyle: {
    height: 30,
    marginVertical: 3,
    paddingLeft: 15,
    width: '100%',
  },

  rightButtonStyle: {
    alignItems: 'flex-end',
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    width: 50,
    // backgroundColor: 'red',
  },

  textInput2: {
    height: '100%',
    width: '95%',
  },
});
