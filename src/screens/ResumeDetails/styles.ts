import {StyleSheet} from 'react-native';
import {Theme} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Theme.spacing.lg,
  },

  header: {
    marginBottom: Theme.spacing.lg,
  },

  actions: {
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.xxl,
  },

  gap: {
    height: Theme.spacing.md,
  },

  deleteButton: {
    backgroundColor: Theme.colors.error,
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
