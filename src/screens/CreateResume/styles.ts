import {StyleSheet} from 'react-native';
import {Theme} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Theme.spacing.lg,
  },

  progressContainer: {
    marginBottom: Theme.spacing.xl,
  },

  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 12,
  },

  progress: {
    width: '20%',
    height: '100%',
    backgroundColor: Theme.colors.primary,
  },

  section: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
    ...Theme.shadows.medium,
  },

  sectionTitle: {
    marginBottom: Theme.spacing.lg,
  },

  templateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },

  templateOption: {
    width: '31%',
    minHeight: 76,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radius.md,
    padding: Theme.spacing.sm,
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },

  selectedTemplate: {
    borderColor: Theme.colors.primary,
    backgroundColor: '#EFE7D4',
  },

  buttonRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: Theme.spacing.lg,
  marginBottom: Theme.spacing.xxl,
  paddingHorizontal: Theme.spacing.sm,
},

  nextButton: {
    flex: 1,
    marginLeft: 10,
  },

  backButton: {
    flex: 1,
    marginRight: 10,
  },
});
