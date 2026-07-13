import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import {Theme} from '../../theme';

interface InputProps extends TextInputProps {}

const Input = ({style, ...props}: InputProps) => {
  const isMultiline = props.multiline;
  return (
    <View
      style={[
        styles.container,
        isMultiline && styles.multilineContainer,
        style,
      ]}>
      <TextInput
        placeholderTextColor={Theme.colors.textSecondary}
        style={[
          styles.input,
          isMultiline && styles.multilineInput,
        ]}
        textAlignVertical={isMultiline ? 'top' : 'center'}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    height: Theme.sizes.inputHeight,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.colors.surface,
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },

  multilineContainer: {
    height: undefined,
    minHeight: 120,
    paddingVertical: Theme.spacing.md,
    justifyContent: 'flex-start',
  },

  input: {
    fontSize: Theme.typography.body,
    color: Theme.colors.text,
    paddingVertical: 0,
  },

  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingVertical: 0,
  },
});