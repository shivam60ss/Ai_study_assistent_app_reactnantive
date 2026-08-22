import axios from 'axios';
import { Platform } from 'react-native';

const DEFAULT_PORT = '8000';

const ENV_BASE =
  process.env.EXPO_PUBLIC_API_URL ||
  process.env.REACT_NATIVE_API_URL ||
  null;

const getBaseUrl = () => {
  if (ENV_BASE) {
    return ENV_BASE;
  }

  if (Platform.OS === 'android') {
    return `http://10.0.2.2:${DEFAULT_PORT}/api`; // Android emulator
  }

  if (Platform.OS === 'ios') {
    return `http://127.0.0.1:${DEFAULT_PORT}/api`; // iOS simulator
  }

  return `http://localhost:${DEFAULT_PORT}/api`; // web browser
};

const baseURL = getBaseUrl();

console.log('API baseURL:', baseURL);

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request Interceptor ────────────────────────────
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ───────────────────────────
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status}`, response.data);
    return response;
  },
  (error) => {
    console.error(`API Error: ${error.response?.status}`, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;