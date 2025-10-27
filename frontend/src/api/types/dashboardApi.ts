export interface OverviewResponse {
  income: number;
  expense: number;
  taxes: number;
  recurringIncome: number;
  recurringExpense: number;
}

export interface ReminderResponse {
  projectId: string;
  milestoneId: string;
  deliverableId: string;
  deliverableName: string;
  milestoneName: string;
  clientName: string;
  dueDate: string;
}

export interface InsightItem {
  title: string;
  text: string;
  month: string;
}

export interface InsightListResponse {
  data: InsightItem[];
  meta: {
    total: number;
  };
}

export interface CurrentMonthResponse {
  income: number;
  expense: number;
}
export interface MoneyFlowItem {
  month: string;
  income: number;
  expense: number;
}
export interface MoneyFlowResponse {
  data: MoneyFlowItem[];
  meta: {
    total: number;
  };
}
export interface ExpenseItem {
  title: string;
  amount: number;
  category: string;
  date: string;
}

export interface TopExpensesResponse {
  data: ExpenseItem[];
  meta: {
    total: number;
  };
}
