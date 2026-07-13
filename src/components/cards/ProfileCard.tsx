import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProfileCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Profile Card</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileCard;
