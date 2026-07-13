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

  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.xl,
    marginBottom: Theme.spacing.xl,
    ...Theme.shadows.medium,
  },

  name: {
    textAlign: 'center',
    marginBottom: 6,
  },

  role: {
    textAlign: 'center',
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.lg,
  },

  section: {
    marginBottom: Theme.spacing.lg,
  },

  sectionTitle: {
    marginBottom: 8,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xl,
  },

  button: {
    flex: 1,
    marginHorizontal: 6,
  },
});