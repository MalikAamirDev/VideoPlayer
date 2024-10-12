import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, WIDTH} from '../../theme';

interface appModalType {
  visible: boolean;
  setVisible: (data: boolean) => void;
  clickAnywhere: boolean;
}

export default function AppModal({visible = false, setVisible, clickAnywhere = false}: appModalType): JSX.Element {
  return (
    <Modal transparent={true} visible={visible} onRequestClose={() => setVisible(false)}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.centeredView}
        onPress={() => clickAnywhere && setVisible(false)}>
        <View style={styles.modalView} />
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    backgroundColor: COLORS.palette.black,
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: COLORS.background,
    width: WIDTH * 0.9,
  },
});
