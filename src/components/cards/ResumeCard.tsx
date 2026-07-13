import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {AppText} from '../common';
import {Theme} from '../../theme';

interface Props {
  title: string;
  updated: string;
  onPress?: () => void;
}

const ResumeCard = ({title, updated, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <AppText variant="title" weight="700">
          {title}
        </AppText>

        <AppText
          variant="small"
          color={Theme.colors.textSecondary}>
          {updated}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default ResumeCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.small,
  },
});