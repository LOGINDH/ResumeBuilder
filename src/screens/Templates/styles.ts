import {StyleSheet} from 'react-native';
import {Theme} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Theme.spacing.lg,
  },

  title: {
    marginBottom: 6,
  },

  subtitle: {
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xl,
  },

  card: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.xl,
    marginBottom: Theme.spacing.lg,
    overflow: 'hidden',
    ...Theme.shadows.medium,
  },

  preview: {
    height: 220,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  info: {
    padding: Theme.spacing.lg,
  },

  selected: {
    borderWidth: 2,
    borderColor: Theme.colors.primary,
  },

  useButton: {
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },

  gridCard: {
    width: '48%',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    ...Theme.shadows.small,
  },

  gridPreview: {
    height: 160,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  gridInfo: {
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.surface,
  },

  selectedGridCard: {
    borderWidth: 2,
    borderColor: Theme.colors.secondary, // gold color
  },
});