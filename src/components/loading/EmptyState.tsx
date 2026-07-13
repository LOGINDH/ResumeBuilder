import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Text>No data available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});

export default EmptyState;
