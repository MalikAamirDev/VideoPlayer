import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import AppButton from '../common/AppButton';
import {COLORS} from '../../theme';
import AppText from '../common/AppText';
import {TxKeyPath} from '../../i18n/types';

interface alertChoiceModalType {
  visible: boolean;
  setVisible: (data: boolean) => void;
  clickAnywhere?: boolean;
  okBtnPressed: () => void;
  label: TxKeyPath;
  loading?: boolean;
}

export default function AlertChoiceModal({
  visible = false,
  setVisible,
  clickAnywhere = false,
  okBtnPressed,
  label,
  loading = false,
}: alertChoiceModalType): JSX.Element {
  /*
   ** Hooks
   */
  // Functions

  // when user press ok btn
  const onPressbtn1 = () => {
    setVisible(false);
  };

  // Rendering
  return (
    <Modal transparent={true} visible={visible} onRequestClose={() => setVisible(false)}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.centeredView}
        onPress={() => clickAnywhere && setVisible(false)}>
        <View style={styles.modalView}>
          <AppText transText={label} presetStyle={'textInputHeading'} />
          {/* Main buttons */}
          <View style={styles.btnContainer}>
            <AppButton title={'no'} onPress={onPressbtn1} smallBtn={true} />
            <AppButton
              title={'yes'}
              onPress={() => okBtnPressed()}
              btnStyle={styles.smallBtn2}
              textStyle={styles.smallBtn2Text}
              smallBtn={true}
              loading={loading}
              loadingColor={COLORS.loaderSecondary}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 13,
    width: '100%',
  },
  centeredView: {
    alignItems: 'center',
    backgroundColor: COLORS.palette.black,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 17,
  },

  modalView: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 6,
    justifyContent: 'center',
    padding: 16,
    width: '100%',
  },

  smallBtn2: {
    backgroundColor: COLORS.background,
  },
  smallBtn2Text: {
    color: COLORS.buttonTextSeconday,
  },
});
