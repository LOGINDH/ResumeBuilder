import {StyleSheet} from 'react-native';
import {Theme} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: Theme.spacing.lg,
  },

  title: {
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    textAlign: 'center',
    color: Theme.colors.textSecondary,
    marginBottom: 40,
  },

  input: {
    marginBottom: 18,
  },

  forgot: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },

  button: {
    marginTop: 10,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },

  signup: {
    color: Theme.colors.secondary,
    fontWeight: '700',
  },
});