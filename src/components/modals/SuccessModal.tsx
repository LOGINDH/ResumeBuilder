import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SuccessModal = () => {
  return (
    <View style={styles.modal}>
      <Text>Success Modal</Text>
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

export default SuccessModal;
