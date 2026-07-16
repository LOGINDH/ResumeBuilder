import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
}

const PrimaryButton = ({
  title,
  loading = false,
  disabled,
  style,
  ...props
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[
        styles.button,
        style,
        (disabled || loading) && styles.disabled,
      ]}
      {...props}>
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    height: 56,
    backgroundColor: '#111111',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  disabled: {
    opacity: 0.6,
  },
});