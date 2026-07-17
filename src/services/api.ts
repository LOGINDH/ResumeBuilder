import axios from 'axios';
import { Alert, Platform } from 'react-native';
import { removeToken } from '../utils/storage';
import { navigationRef } from '../navigation/navigationRef';

const API = axios.create({
  baseURL: 'https://resumebuilder-t2yp.onrender.com/api',
  timeout: 60000, // 60 seconds to accommodate Render free-tier cold starts
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 1. Intercept connection timeouts (often caused by Render cold starts on free tier)
    if (error.code === 'ECONNABORTED' || error.message?.toLowerCase().includes('timeout')) {
      const timeoutMessage = 'Connection timed out. The backend server might be starting up (Render free tier cold starts can take up to 50 seconds on the first request). Please try again in a few seconds.';
      
      // Inject user-friendly message into the error structure so UI screens display it
      error.message = timeoutMessage;
      if (error.response) {
        error.response.data = { ...error.response.data, message: timeoutMessage };
      } else {
        error.response = { data: { message: timeoutMessage } } as any;
      }
    }
    // 2. Intercept network connection failures (device offline or server entirely unreachable)
    else if (error.message?.toLowerCase().includes('network error') || !error.response) {
      const networkMessage = 'Network error. Please check your internet connection or verify if the backend server is online.';
      
      error.message = networkMessage;
      error.response = { data: { message: networkMessage } } as any;
    }
    // 3. Intercept server-side gateway or service errors (502 Bad Gateway / 503 Service Unavailable)
    else if (error.response && (error.response.status === 502 || error.response.status === 503)) {
      const serverMessage = 'The server is temporarily unavailable (502 Bad Gateway). It may be restarting or updating. Please try again in a moment.';
      
      error.message = serverMessage;
      error.response.data = { ...error.response.data, message: serverMessage };
    }

    // 4. Intercept 401 Unauthorized errors (session expiration handling)
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