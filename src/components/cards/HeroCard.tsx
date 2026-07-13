import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Theme} from '../../theme';
import {AppText} from '../common';

const HeroCard = () => {
  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>

      <View>
        <AppText
          variant="small"
          style={styles.welcome}>
          👋 Welcome Back
        </AppText>

        <AppText
          variant="h2"
          weight="700"
          style={styles.title}>
          Build Your Next Resume
        </AppText>

        <AppText
          variant="body"
          style={styles.subtitle}>
          Choose a premium ATS-friendly template below and create a beautiful resume in minutes.
        </AppText>
      </View>

    </LinearGradient>
  );
};

export default HeroCard;

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.xl,
    borderRadius: Theme.radius.xl,
    marginBottom: Theme.spacing.xl,
    minHeight: 170,
    justifyContent: 'center',
  },

  welcome: {
    color: '#C6A969',
    marginBottom: 10,
  },

  title: {
    color: '#FFFFFF',
    marginBottom: 14,
  },

  subtitle: {
    color: '#D1D5DB',
    lineHeight: 24,
  },
});