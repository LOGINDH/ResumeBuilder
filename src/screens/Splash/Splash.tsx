import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

type SplashProps = {
  onStart: () => void;
};

const Splash = ({onStart}: SplashProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resume Builder</Text>
      <Text style={styles.subtitle}>Create, preview, and download your resume in minutes.</Text>
      <TouchableOpacity style={styles.button} onPress={onStart}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Splash;
