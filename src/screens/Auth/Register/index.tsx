import React, {useState} from 'react';
import {
  View,
  Image,
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

import {registerUser} from '../../../services/auth';

import {AuthStackParamList} from '../../../navigation/types';

import styles from './styles';

type Props = NativeStackScreenProps<
  AuthStackParamList,
  'Register'
>;

const Register = ({navigation}: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

    if (!name || !email || !password) {
      Alert.alert(
        'Validation',
        'Please fill all fields',
      );
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser(
        name,
        email,
        password,
      );

      Alert.alert(
        'Success',
        data.message || 'Registration Successful',
      );

      navigation.navigate('Login');

    } catch (error: any) {

      Alert.alert(
        'Register Failed',
        error?.response?.data?.message ||
          'Something went wrong',
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
          Create Account
        </AppText>

        <AppText
          variant="body"
          style={styles.subtitle}>
          Join ResumeVault
        </AppText>

        <Input
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />

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

        <PrimaryButton
          title={
            loading
              ? 'CREATING ACCOUNT...'
              : 'REGISTER'
          }
          onPress={handleRegister}
        />

        <View style={styles.footer}>

          <AppText>
            Already have an account?
          </AppText>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Login')
            }>

            <AppText style={styles.signup}>
              {' '}Login
            </AppText>

          </TouchableOpacity>

        </View>

      </View>

    </AppScreen>
  );
};

export default Register;