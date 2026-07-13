import {StyleSheet} from 'react-native';
import {Theme} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Theme.spacing.lg,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xl,
  },

  sectionTitle: {
    marginBottom: Theme.spacing.md,
    marginTop: Theme.spacing.lg,
  },

  templateContainer: {
    paddingBottom: Theme.spacing.xl,
  },
});