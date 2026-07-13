import axios from 'axios';
import { Alert } from 'react-native';
import { removeToken } from '../utils/storage';
import { navigationRef } from '../navigation/navigationRef';

const API = axios.create({
  // Use http://localhost:5000/api which works perfectly for iOS simulators and Android (using adb reverse tcp:5000 tcp:5000)
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const message = error.response.data?.message || '';
      
      // Check if it is indeed a token verification failure
      const isAuthError =
        message.toLowerCase().includes('token') ||
        message.toLowerCase().includes('authorized') ||
        message.toLowerCase().includes('no token');

      if (isAuthError) {
        await removeToken();

        const url = error.config?.url || '';
        if (!url.includes('/auth/me')) {
          Alert.alert('Session Expired', 'Please login again.');
        }

        if (navigationRef.isReady()) {
          navigationRef.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          });
        }
      }
    }
    return Promise.reject(error);
  }
);

export default API;