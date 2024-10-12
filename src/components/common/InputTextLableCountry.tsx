import {StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ViewStyle} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SVG} from '../../assets';
import {countriesData} from '../../data';
import {COLORS, HEIGHT} from '../../theme';
import AppText from './AppText';
import {TxKeyPath} from '../../i18n/types';
/*
 ** types
 */
export type countriesDataItem = {
  countryName: string;
  countryDialCode: string;
  emoji?: string;
  code: string;
};

interface InputTextLabelCountryType {
  textLable: TxKeyPath;
  textInputStyle?: ViewStyle;
  textLabelStyle?: ViewStyle;
  viewStyle?: ViewStyle;
  onCountrySelect: (data: string) => void;
  placeHolder?: string;
  value?: string;
}

export default function InputTextLabelCountry(props: InputTextLabelCountryType): JSX.Element {
  // destructring props
  const {
    textLable,
    textInputStyle = {},
    textLabelStyle = {},
    viewStyle = {},
    onCountrySelect,
    placeHolder = '',
    value = '',
  } = props;
  /*
   ** states
   */
  const [itemData, setItemData] = useState<countriesDataItem[]>(countriesData);
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<countriesDataItem>();
  /*
   ** life cycle
   */
  useEffect(() => {
    /*
     **if provided value match then save on our state
     **checking if provided value is inlcuded in our countrires data list
     */
    const valueFound = countriesData?.find(item => {
      if (item.countryName?.toLowerCase() === value?.toLowerCase()) {
        return item;
      }
      return undefined;
    });
    if (valueFound) {
      setSelectedCountry(valueFound);
    }
  }, [value]);

  /*
   ** functions
   */

  // everytime when user type fillter condition execute to filte data
  const onChangeTextDropDown = (e: string): void => {
    setSelectedCountry(prevItem => {
      if (prevItem) {
        return {...prevItem, countryName: e};
      } else {
        return prevItem;
      }
    });
    setItemData(countriesData.filter(item => item.countryName?.toLowerCase()?.includes(e?.toLowerCase())));
  };

  // rendering breederlist in drop down view
  const renderBreederList = ({item}: {item: countriesDataItem}): JSX.Element => {
    return (
      <TouchableOpacity
        style={styles.renderItemStyle}
        onPress={() => {
          // onChangeText(item?.countryName);
          onCountrySelect(item?.countryName);
          setSelectedCountry(item);
          setIsDropDown(false);
        }}>
        <AppText presetStyle={'default'}>{item?.countryName}</AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={viewStyle}>
      <AppText transText={textLable} presetStyle={'textInputHeading'} style={textLabelStyle} />

      <View style={[styles.inputStyle2, textInputStyle]}>
        <TouchableOpacity
          style={styles.leftButtonStyle}
          onPress={() => {
            setIsDropDown(true);
          }}>
          {selectedCountry?.emoji && <Text style={styles.flagEmojiStyle}>{`${selectedCountry?.emoji}`}</Text>}
        </TouchableOpacity>

        <TextInput
          style={styles.textInput2}
          onFocus={() => setIsDropDown(true)}
          placeholderTextColor={'rgba(137, 137, 137, 1)'}
          placeholder={placeHolder}
          value={selectedCountry?.countryName}
          onChangeText={text => {
            onChangeTextDropDown(text);
          }}
        />
        {/* rendering drop down icon */}

        <TouchableOpacity
          style={styles.rightButtonStyle}
          onPress={() => {
            setIsDropDown(!isDropDown);
          }}>
          {isDropDown ? <SVG.DropUpIcon /> : <SVG.DropDownIcon />}
        </TouchableOpacity>

        {/* rendering drop down view */}
      </View>
      {isDropDown ? (
        <View style={styles.dropDownViewStyle}>
          <FlatList
            data={itemData}
            keyExtractor={(item, index) => `index-${index}`}
            showsVerticalScrollIndicator={true}
            renderItem={renderBreederList}
          />
        </View>
      ) : null}
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
  },
  flagEmojiStyle: {
    fontSize: 35,
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
  leftButtonStyle: {marginRight: 10},
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
