import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DeleteModal = () => {
  return (
    <View style={styles.modal}>
      <Text>Delete Modal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
});

export default DeleteModal;
