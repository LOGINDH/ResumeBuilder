import React from 'react';
import {View, StyleSheet} from 'react-native';

const Skeleton = () => {
  return <View style={styles.skeleton} />;
};

const styles = StyleSheet.create({
  skeleton: {
    height: 16,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
  },
});

export default Skeleton;
