import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getText = async () => {
  const res = await api.get('/api/test');

  return res.data.text;
};
