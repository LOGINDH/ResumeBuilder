import React from 'react';
import {TouchableOpacity, StyleSheet, TouchableOpacityProps} from 'react-native';

interface IconButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

const IconButton = ({children, style, ...props}: IconButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconButton;
