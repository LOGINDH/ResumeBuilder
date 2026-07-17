import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../common';
import {Theme} from '../../theme';
import {getMe} from '../../services/auth';

interface HomeHeaderProps {
  name?: string;
}

const HomeHeader = ({ name }: HomeHeaderProps) => {
  const [displayName, setDisplayName] = useState('LOGINDH');

  useEffect(() => {
    if (name) {
      setDisplayName(name);
    } else {
      getMe().then(response => {
        if (response?.user?.name) {
          setDisplayName(response.user.name);
        }
      }).catch(() => {});
    }
  }, [name]);

  return (
    <View style={styles.container}>
      <AppText variant="body" color={Theme.colors.textSecondary}>
        Good Morning
      </AppText>

      <AppText
        variant="h1"
        weight="700"
        style={styles.name}>
        {displayName}
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