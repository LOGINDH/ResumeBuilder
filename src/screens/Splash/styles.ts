import {StyleSheet} from 'react-native';
import {Theme} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
  },

  logo: {
    width: 500,
    height: 500,
    marginBottom: Theme.spacing.xl,
  },

  title: {
    marginBottom: Theme.spacing.sm,
  },

  subtitle: {
    textAlign: 'center',
    color: Theme.colors.textSecondary,
  },
});