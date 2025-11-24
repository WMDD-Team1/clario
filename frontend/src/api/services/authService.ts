import { OnboardingForm, UserApiResponse } from '@api/types/userApi';
import api from '@api/api';

interface UserType {
  name: string;
  email: string;
  password: string;
}
export const signup = async (payload: UserType): Promise<UserApiResponse> => {
  const res = await api.post('/auth/signup', payload);
  return res.data;
};
export const login = async (email: string, password: string): Promise<UserApiResponse> => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const completeOnBoarding = async (data: OnboardingForm) => {
  const res = await api.post('/auth/onboarding', data);
  return res.data;
};

export const googleLogin = async (credential: string): Promise<UserApiResponse> => {
  const res = await api.post('/auth/google', { credential });
  return res.data;
};
