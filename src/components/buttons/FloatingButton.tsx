import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  type TouchableOpacityProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type FloatingButtonProps = TouchableOpacityProps & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const FloatingButton = ({children, style, ...props}: FloatingButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});

export default FloatingButton;
