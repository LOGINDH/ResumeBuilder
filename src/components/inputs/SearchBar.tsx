import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';
import {Theme} from '../../theme';

interface SearchBarProps extends TextInputProps {}

const SearchBar = ({style, ...props}: SearchBarProps) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={Theme.colors.textSecondary}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radius.round,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    backgroundColor: Theme.colors.surface,
    color: Theme.colors.text,
    fontSize: Theme.typography.body,
    marginBottom: Theme.spacing.md,
  },
});

export default SearchBar;
