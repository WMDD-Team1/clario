import axios from 'axios';
import axiosRetry from "axios-retry";
import { Auth0Client } from "@auth0/auth0-spa-js";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

axiosRetry(api, {
  retries: 3,
  retryDelay: (retryCount) => 1000,
  retryCondition: (error) => {
    return (
      error.response
      && typeof error.response.status === "number"
      && error.response.status >= 500) 
      || error.code === "ECONNABORTED"
  },
});

export const attachAuthInterceptor = (auth0Client: Auth0Client) => {
    api.interceptors.request.use(async (config) => {
        const token = await auth0Client.getTokenSilently();
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    })
}

export default api;