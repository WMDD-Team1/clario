import axios from 'axios';
import axiosRetry from 'axios-retry';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosRetry(api, {
  retries: 3,
  retryDelay: (retryCount) => 1000,
  retryCondition: (error) => {
    return (
      (error.response &&
        typeof error.response.status === 'number' &&
        error.response.status >= 500) ||
      error.code === 'ECONNABORTED'
    );
  },
});

export default api;
