import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const SecondaryButton = ({title = 'Cancel'}) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  text: {
    color: '#0f172a',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default SecondaryButton;
