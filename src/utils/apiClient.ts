import axios, { HttpStatusCode } from 'axios';
import { AUTH_CONFIG } from '@/utils/auth-config';
import { cookieStorage } from './cookies';

const BASE_URL = AUTH_CONFIG.API_BASE_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const { token } = cookieStorage.getAuthTokens();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      cookieStorage.setAuthTokens(
        response.data.token,
        response.data.refreshToken,
      );
    }
    return response;
  },
  (error) => {
    // Handle common error cases
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      // Clear tokens on unauthorized
      cookieStorage.clearAuthTokens();
    }
    return Promise.reject(error);
  },
);

export default apiClient;
