import { UserApiResponse } from '@api/types/userApi';
import api from '@api/api';

export const updateUserProfile = async (payload: {
  name?: string;
  email?: string;
  picture?: string;
  address?: {
    street?: string;
    postalCode?: string;
    city?: string;
    country?: string;
  };
}) => {
  const res = await api.patch('/settings/profile', payload);
  return res.data;
};

export const updateUserPreferences = async (payload: {
  language?: 'en' | 'fr';
  theme?: 'light' | 'dark';
}) => {
  const res = await api.patch('/settings/preferences', payload);
  return res.data;
};

export const updateFinanceSettings = async (payload: {
  province?: 'British Columbia' | 'Quebec';
}) => {
  const res = await api.patch('/settings/finance', payload);
  return res.data;
};

export const getIncomeCategories = async () => {
  const res = await api.get('/settings/categories/incomes');
  return res.data;
};

export const updateIncomeCategories = async (categories: string[]) => {
  const res = await api.patch('/settings/categories/incomes', { categories });
  return res.data;
};
export const getExpenseCategories = async () => {
  const res = await api.get('/settings/categories/expenses');
  return res.data;
};

export const updateExpenseCategories = async (categories: string[]) => {
  const res = await api.patch('/settings/categories/expenses', { categories });
  return res.data;
};

export const exportUserTransactions = async (): Promise<Blob | null> => {
  const res = await api.get('/settings/export/transactions', {
    responseType: 'blob',
  });

  const contentType = res.headers['content-type'];
  if (contentType.includes('application/json')) {
    const text = await res.data.text();
    const json = JSON.parse(text);
    if (json.empty) {
      return null;
    }
  }

  return res.data;
};

export const updateUserPassword = async (payload: {
  currentPassword: string;
  newPassword: string;
}) => {
  const res = await api.post('/settings/password', payload);
  return res.data;
};
