import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../common';
import {Theme} from '../../theme';
import {getUserProfileLocal} from '../../utils/storage';

const HomeHeader = () => {
  const [name, setName] = useState('LOGINDH');

  useEffect(() => {
    getUserProfileLocal().then(user => {
      if (user && user.name) {
        setName(user.name);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <AppText variant="body" color={Theme.colors.textSecondary}>
        Good Morning
      </AppText>

      <AppText
        variant="h1"
        weight="700"
        style={styles.name}>
        {name}
      </AppText>

      <AppText
        variant="small"
        color={Theme.colors.textSecondary}>
        Let's build your next professional resume.
      </AppText>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.xl,
  },

  name: {
    marginVertical: 6,
  },
});