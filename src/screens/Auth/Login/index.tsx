import React, {useState} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppScreen, AppText} from '../../../components/common';
import {
  Input,
  PasswordInput,
} from '../../../components/inputs';
import {PrimaryButton} from '../../../components/buttons';

import {AuthStackParamList} from '../../../navigation/types';

import {loginUser} from '../../../services/auth';
import {saveToken} from '../../../utils/storage';

import styles from './styles';

type Props = NativeStackScreenProps<
  AuthStackParamList,
  'Login'
>;

const Login = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation', 'Please enter email and password.');
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(email, password);

      await saveToken(data.token);

      Alert.alert('Success', 'Login Successful');

      navigation.getParent()?.navigate('Main');

    } catch (error: any) {
      Alert.alert(
        'Login Failed',
        error?.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppScreen>
      <View style={styles.container}>

        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
        />

        <AppText
          variant="h1"
          weight="700"
          style={styles.title}>
          Welcome Back
        </AppText>

        <AppText
          variant="body"
          style={styles.subtitle}>
          Sign in to ResumeVault
        </AppText>

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <PasswordInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.forgot}>
          <AppText color="#C6A969">
            Forgot Password?
          </AppText>
        </TouchableOpacity>

        <PrimaryButton
          title={loading ? 'SIGNING IN...' : 'SIGN IN'}
          onPress={handleLogin}
        />

        <View style={styles.footer}>
          <AppText>
            Don't have an account?
          </AppText>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}>
            <AppText style={styles.signup}>
              {' '}Sign Up
            </AppText>
          </TouchableOpacity>
        </View>

      </View>
    </AppScreen>
  );
};

export default Login;