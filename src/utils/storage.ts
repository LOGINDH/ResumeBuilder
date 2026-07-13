import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'userToken';

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

const PROFILE_KEY = 'userProfile';
const DOWNLOAD_HISTORY_KEY = 'downloadHistory';

export const saveUserProfileLocal = async (profile: any) => {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const getUserProfileLocal = async () => {
  const data = await AsyncStorage.getItem(PROFILE_KEY);
  return data ? JSON.parse(data) : null;
};

export const removeUserProfileLocal = async () => {
  await AsyncStorage.removeItem(PROFILE_KEY);
};

export interface DownloadHistoryItem {
  id: string;
  title: string;
  templateId: number;
  templateName: string;
  downloadedAt: string;
}

export const getDownloadHistoryLocal = async (): Promise<DownloadHistoryItem[]> => {
  const data = await AsyncStorage.getItem(DOWNLOAD_HISTORY_KEY);
  return data ? JSON.parse(data) : [];
};

export const addDownloadHistoryLocal = async (historyItem: Omit<DownloadHistoryItem, 'downloadedAt'>) => {
  const history = await getDownloadHistoryLocal();
  // Avoid duplicate entries for the exact same second, but let them download multiple times
  const newItem: DownloadHistoryItem = {
    ...historyItem,
    downloadedAt: new Date().toISOString(),
  };
  const updated = [newItem, ...history];
  await AsyncStorage.setItem(DOWNLOAD_HISTORY_KEY, JSON.stringify(updated));
};

export const clearDownloadHistoryLocal = async () => {
  await AsyncStorage.removeItem(DOWNLOAD_HISTORY_KEY);
};