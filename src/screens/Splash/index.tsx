import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppScreen, AppText} from '../../components/common';
import {RootStackParamList} from '../../navigation/types';
import {getToken, removeToken} from '../../utils/storage';
import {getMe} from '../../services/auth';

import styles from './styles';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Splash'
>;

const Splash = ({navigation}: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      getToken()
        .then(async token => {
          if (!token) {
            navigation.replace('Auth');
            return;
          }

          try {
            await getMe();
            navigation.replace('Main');
          } catch (error: any) {
            // Token is invalid/expired, or server is unreachable
            await removeToken();
            navigation.replace('Auth');
          }
        })
        .catch(() => {
          navigation.replace('Auth');
        });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <AppScreen>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <AppText
          variant="h1"
          weight="700"
          style={styles.title}>
          ResumeVault
        </AppText>

        <AppText variant="body" style={styles.subtitle}>
          Craft Your Future Professionally
        </AppText>
      </View>
    </AppScreen>
  );
};

export default Splash;
