import React, {useState} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppScreen, AppText} from '../../../components/common';
import {
  Input,
  PasswordInput,
} from '../../../components/inputs';
import {PrimaryButton} from '../../../components/buttons';

import {AuthStackParamList} from '../../../navigation/types';

import {loginUser, forgotPassword, resetPassword} from '../../../services/auth';
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

  // Forgot password flow states
  const [forgotModalVisible, setForgotModalVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetStep, setResetStep] = useState(1); // 1: Email, 2: OTP + New Password
  const [submitting, setSubmitting] = useState(false);

  const handleForgotPasswordSubmit = async () => {
    if (!forgotEmail.trim()) {
      Alert.alert('Validation Error', 'Please enter your email address.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await forgotPassword(forgotEmail.trim());
      
      if (res.mockOtp) {
        Alert.alert(
          'Verification Code (Test Mode)',
          `Your verification code is: ${res.mockOtp}\n\n(Use this code to enter in the next step)`,
          [
            {
              text: 'Proceed',
              onPress: () => setResetStep(2)
            }
          ]
        );
      } else {
        Alert.alert('Verification Sent', res.message || 'Check your email for the OTP.');
        setResetStep(2);
      }
    } catch (error: any) {
      Alert.alert(
        'Request Failed',
        error?.response?.data?.message || 'Failed to submit reset request.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPasswordSubmit = async () => {
    if (!otp.trim() || !newPassword.trim()) {
      Alert.alert('Validation Error', 'Please fill in both the code and your new password.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await resetPassword({
        email: forgotEmail.trim(),
        otp: otp.trim(),
        newPassword: newPassword.trim(),
      });

      Alert.alert('Success', res.message || 'Password reset successfully.', [
        {
          text: 'Login',
          onPress: () => {
            setForgotModalVisible(false);
            setResetStep(1);
            setForgotEmail('');
            setOtp('');
            setNewPassword('');
          }
        }
      ]);
    } catch (error: any) {
      Alert.alert(
        'Reset Failed',
        error?.response?.data?.message || 'Failed to reset password. Please check the code.'
      );
    } finally {
      setSubmitting(false);
    }
  };

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

        <TouchableOpacity 
          style={styles.forgot}
          onPress={() => {
            setForgotEmail('');
            setOtp('');
            setNewPassword('');
            setResetStep(1);
            setForgotModalVisible(true);
          }}>
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

        {/* ================= FORGOT PASSWORD MODAL ================= */}
        <Modal
          visible={forgotModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setForgotModalVisible(false)}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: 20
          }}>
            <View style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 24,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              elevation: 20,
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.1,
              shadowRadius: 15,
            }}>
              
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#F3F4F6',
                paddingBottom: 10
              }}>
                <AppText variant="h2" weight="700" color="#111111">
                  Reset Password
                </AppText>
                <TouchableOpacity onPress={() => setForgotModalVisible(false)}>
                  <AppText style={{ fontSize: 18, color: '#9CA3AF', fontWeight: 'bold' }}>✕</AppText>
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {resetStep === 1 ? (
                  <>
                    <AppText variant="body" color="#4B5563" style={{ marginBottom: 16, lineHeight: 20 }}>
                      Enter your registered email address below. We will send you a 6-digit verification code to reset your password.
                    </AppText>

                    <AppText variant="body" weight="600" style={{ marginBottom: 6, color: '#374151' }}>
                      Email Address
                    </AppText>
                    <Input
                      placeholder="email@example.com"
                      value={forgotEmail}
                      onChangeText={setForgotEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />

                    <PrimaryButton
                      title={submitting ? 'SENDING CODE...' : 'SEND VERIFICATION CODE'}
                      onPress={handleForgotPasswordSubmit}
                      style={{ marginTop: 16 }}
                      disabled={submitting}
                    />
                  </>
                ) : (
                  <>
                    <AppText variant="body" color="#4B5563" style={{ marginBottom: 16, lineHeight: 20 }}>
                      Please enter the 6-digit code sent to your email along with your new password.
                    </AppText>

                    <AppText variant="body" weight="600" style={{ marginBottom: 6, color: '#374151' }}>
                      6-Digit Code
                    </AppText>
                    <Input
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChangeText={setOtp}
                      keyboardType="numeric"
                      maxLength={6}
                    />

                    <AppText variant="body" weight="600" style={{ marginTop: 12, marginBottom: 6, color: '#374151' }}>
                      New Password
                    </AppText>
                    <PasswordInput
                      placeholder="Enter new password"
                      value={newPassword}
                      onChangeText={setNewPassword}
                    />

                    <PrimaryButton
                      title={submitting ? 'RESETTING PASSWORD...' : 'CONFIRM PASSWORD RESET'}
                      onPress={handleResetPasswordSubmit}
                      style={{ marginTop: 20 }}
                      disabled={submitting}
                    />

                    <TouchableOpacity 
                      style={{ marginTop: 12, alignItems: 'center', padding: 8 }}
                      onPress={() => setResetStep(1)}>
                      <AppText color="#C6A969" weight="600">
                        Back to Email Submission
                      </AppText>
                    </TouchableOpacity>
                  </>
                )}
              </ScrollView>

            </View>
          </View>
        </Modal>

      </View>
    </AppScreen>
  );
};

export default Login;