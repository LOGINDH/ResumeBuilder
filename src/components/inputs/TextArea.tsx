import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';
import {Theme} from '../../theme';

interface TextAreaProps extends TextInputProps {}

const TextArea = (props: TextAreaProps) => {
  return (
    <TextInput
      placeholderTextColor={Theme.colors.textSecondary}
      style={styles.input}
      multiline
      textAlignVertical="top"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radius.lg,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    minHeight: 120,
    textAlignVertical: 'top',
    color: Theme.colors.text,
    backgroundColor: Theme.colors.surface,
    fontSize: Theme.typography.body,
    marginBottom: Theme.spacing.md,
  },
});

export default TextArea;
