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