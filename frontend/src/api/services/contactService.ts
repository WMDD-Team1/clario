import api from '@api/api';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export async function sendContactMessage(data: ContactPayload) {
  const res = await api.post('/contact', data);
  return res.data;
}
