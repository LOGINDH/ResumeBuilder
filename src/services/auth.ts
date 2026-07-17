import API from './api';
import { getToken } from '../utils/storage';

export const loginUser = async (
  email: string,
  password: string,
) => {
  const response = await API.post('/auth/login', {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const response = await API.post('/auth/register', {
    name,
    email,
    password,
  });

  return response.data;
};

export const getMe = async () => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token found');
  }

  const response = await API.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateMe = async (profileData: {
  name: string;
  avatar?: string;
  role?: string;
}) => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token found');
  }

  const response = await API.put('/auth/update', profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await API.post('/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (resetData: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  const response = await API.post('/auth/reset-password', resetData);
  return response.data;
};

export const addDownloadHistory = async (downloadData: {
  resumeId: string;
  title: string;
  templateId: number;
  templateName: string;
}) => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token found');
  }

  const response = await API.post('/auth/download-history', downloadData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const clearDownloadHistory = async () => {
  const token = await getToken();
  if (!token) {
    throw new Error('No token found');
  }

  const response = await API.delete('/auth/download-history', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};