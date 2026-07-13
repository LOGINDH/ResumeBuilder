import API from './api';
import {getToken} from '../utils/storage';

const getAuthHeader = async () => {
  const token = await getToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const resumeService = {
  saveResume: async (resumeData: any) => {
    const config = await getAuthHeader();
    const response = await API.post('/resume/create', resumeData, config);

    return response.data;
  },

  getMyResumes: async () => {
    const config = await getAuthHeader();
    const response = await API.get('/resume', config);

    return response?.data?.resumes || [];
  },

  getResume: async (id: string) => {
    const config = await getAuthHeader();
    const response = await API.get(`/resume/${id}`, config);

    return response.data.resume;
  },

  updateResume: async (id: string, resumeData: any) => {
    const config = await getAuthHeader();
    const response = await API.put(`/resume/${id}`, resumeData, config);

    return response.data;
  },

  deleteResume: async (id: string) => {
    const config = await getAuthHeader();
    const response = await API.delete(`/resume/${id}`, config);

    return response.data;
  },
};
