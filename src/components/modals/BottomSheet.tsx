import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const BottomSheet = () => {
  return (
    <View style={styles.sheet}>
      <Text>Bottom Sheet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sheet: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export default BottomSheet;
