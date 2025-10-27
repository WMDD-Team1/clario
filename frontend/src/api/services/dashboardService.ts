import { ListApi, Metadata } from '@api/types/listApi';
import {
  CurrentMonthResponse,
  InsightListResponse,
  MoneyFlowResponse,
  OverviewResponse,
  ReminderResponse,
  TopExpensesResponse,
} from '@api/types/dashboardApi';
import api from '@api/api';

export interface DashboardMetadata extends Metadata {
  hasNextPage: boolean;
}

export const fetchReminders = async (params?: {
  page?: number;
  limit?: number;
  days?: number;
}): Promise<ListApi<ReminderResponse[], DashboardMetadata>> => {
  let data: ListApi<ReminderResponse[], DashboardMetadata> = {
    data: [],
    meta: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
      hasNextPage: false,
    },
  };

  try {
    const res = await api.get<ListApi<ReminderResponse[], DashboardMetadata>>(
      '/dashboard/reminders',
      { params },
    );
    data = res.data;
  } catch (err) {
    console.error('Error fetching dashboard reminders:', err);
  }

  return data;
};

export const fetchOverview = async (): Promise<OverviewResponse | null> => {
  try {
    const res = await api.get<OverviewResponse>('/dashboard/overview');
    return res.data;
  } catch (err) {
    console.error('Error fetching overview:', err);
    return null;
  }
};

export const fetchInsights = async (): Promise<InsightListResponse> => {
  try {
    const res = await api.post<InsightListResponse>('/ai/transactions');
    return res.data;
  } catch (err) {
    console.error('Error fetching insights:', err);
    return { data: [], meta: { total: 0 } };
  }
};

export const fetchCurrentMonth = async (): Promise<CurrentMonthResponse | null> => {
  try {
    const res = await api.get<CurrentMonthResponse>('/dashboard/current');
    return res.data;
  } catch (err) {
    console.error('Error fetching current month stats:', err);
    return null;
  }
};
export const fetchMoneyFlow = async (): Promise<MoneyFlowResponse | null> => {
  try {
    const res = await api.get<MoneyFlowResponse>('/dashboard/money-flow');
    return res.data;
  } catch (err) {
    console.error('Error fetching money flow:', err);
    return null;
  }
};
export const fetchTopExpenses = async (): Promise<TopExpensesResponse | null> => {
  try {
    const res = await api.get<TopExpensesResponse>('/dashboard/top-expenses');
    return res.data;
  } catch (err) {
    console.error('Error fetching top expenses:', err);
    return null;
  }
};
